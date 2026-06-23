import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Spinner from '../components/Spinner.jsx';
import { api } from '../services/api.js';

const PAGE_SIZE = 6;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, priceFilter]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;

      let matchesPrice = true;
      if (priceFilter === 'under50') matchesPrice = product.price < 50;
      if (priceFilter === '50to200') matchesPrice = product.price >= 50 && product.price <= 200;
      if (priceFilter === 'above200') matchesPrice = product.price > 200;

      return matchesSearch && matchesStatus && matchesPrice;
    });
  }, [products, search, statusFilter, priceFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await api.deleteProduct(selectedProduct.id);
      setProducts((current) => current.filter((product) => product.id !== selectedProduct.id));
      setSuccessMessage('Product deleted successfully.');
      setSelectedProduct(null);
    } catch (apiError) {
      setError(apiError.message);
    }
  };

  if (loading) return <Spinner text="Loading products..." />;

  return (
    <div className="page-content">
      <div className="page-title row-title">
        <div>
          <h1>Products</h1>
          <p>Search, filter, edit, delete, and paginate products.</p>
        </div>
        <Link className="primary-link" to="/add-product">Add Product</Link>
      </div>

      {error && <div className="alert error">{error}</div>}
      {successMessage && <div className="alert success">{successMessage}</div>}

      <section className="toolbar">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
          <option value="all">All Prices</option>
          <option value="under50">Under $50</option>
          <option value="50to200">$50 - $200</option>
          <option value="above200">Above $200</option>
        </select>
      </section>

      {paginatedProducts.length === 0 ? (
        <EmptyState title="No products found" message="Try another search keyword or filter." />
      ) : (
        <>
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-body">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-meta">
                    <strong>${product.price}</strong>
                    <span className={`badge ${product.status}`}>{product.status}</span>
                  </div>
                  <div className="card-actions">
                    <Link className="secondary-link" to={`/edit-product/${product.id}`}>Edit</Link>
                    <button className="danger-outline-btn" type="button" onClick={() => setSelectedProduct(product)}>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination">
            <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)}>
              Next
            </button>
          </div>
        </>
      )}

      <ConfirmModal
        open={Boolean(selectedProduct)}
        title="Delete Product"
        message={`Are you sure you want to delete ${selectedProduct?.name}?`}
        onClose={() => setSelectedProduct(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

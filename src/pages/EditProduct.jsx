import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm.jsx';
import Spinner from '../components/Spinner.jsx';
import { api } from '../services/api.js';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await api.getProduct(id);
        setProduct(data);
      } catch (apiError) {
        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const handleUpdateProduct = async (updatedProduct) => {
    await api.updateProduct(id, { ...product, ...updatedProduct });
    navigate('/products');
  };

  if (loading) return <Spinner text="Loading product..." />;
  if (error) return <div className="alert error">{error}</div>;

  return (
    <div className="page-content narrow-page">
      <div className="page-title">
        <h1>Edit Product</h1>
        <p>Update product information and image.</p>
      </div>

      <ProductForm initialData={product} submitLabel="Update Product" onSubmit={handleUpdateProduct} />
    </div>
  );
}

import ProductForm from '../components/ProductForm.jsx';
import { api } from '../services/api.js';

export default function AddProduct() {
  const handleAddProduct = async (product) => {
    await api.addProduct(product);
  };

  return (
    <div className="page-content narrow-page">
      <div className="page-title">
        <h1>Add Product</h1>
        <p>Create a new product with validation and image upload.</p>
      </div>

      <ProductForm submitLabel="Add Product" onSubmit={handleAddProduct} />
    </div>
  );
}

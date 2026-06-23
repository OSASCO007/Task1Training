import { useEffect, useState } from 'react';

const emptyForm = {
  name: '',
  price: '',
  description: '',
  status: 'available',
  image: ''
};

export default function ProductForm({ initialData, submitLabel, onSubmit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      const currentData = {
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        status: initialData.status || 'available',
        image: initialData.image || ''
      };
      setFormData(currentData);
      setPreview(currentData.image);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required.';
    }

    if (formData.price === '') {
      newErrors.price = 'Price is required.';
    } else if (Number.isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    }

    if (!formData.image) {
      newErrors.image = 'Product image is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const readImageFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((current) => ({ ...current, image: 'Please upload an image file only.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((current) => ({ ...current, image: reader.result }));
      setPreview(reader.result);
      setErrors((current) => ({ ...current, image: '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    readImageFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    readImageFile(event.dataTransfer.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    if (!validate()) {
      setMessage({ type: 'error', text: 'Please fix the form errors.' });
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        ...formData,
        price: Number(formData.price)
      });
      setMessage({ type: 'success', text: 'Product saved successfully.' });

      if (!initialData) {
        setFormData(emptyForm);
        setPreview('');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {message && <div className={`alert ${message.type}`}>{message.text}</div>}

      <div className="form-grid">
        <label>
          Product Name
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" />
          {errors.name && <small>{errors.name}</small>}
        </label>

        <label>
          Price
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" inputMode="decimal" />
          {errors.price && <small>{errors.price}</small>}
        </label>

        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>

        <label className="full-width">
          Description
          <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Enter product description" />
          {errors.description && <small>{errors.description}</small>}
        </label>
      </div>

      <div
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input id="product-image" type="file" accept="image/*" onChange={handleFileChange} />
        <label htmlFor="product-image">
          <span>📤</span>
          Drag & drop product image or click to upload
        </label>
      </div>
      {errors.image && <small className="image-error">{errors.image}</small>}

      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Product preview" />
        </div>
      )}

      <button className="primary-btn" type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

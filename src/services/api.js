const API_URL = 'http://localhost:4000';

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error('Request failed. Please check the Mock API server.');
    }

    return response.status === 204 ? null : response.json();
  } catch (error) {
    throw new Error(error.message || 'Something went wrong.');
  }
}

export const api = {
  getProducts: () => request('/products'),
  getProduct: (id) => request(`/products/${id}`),
  addProduct: (product) =>
    request('/products', {
      method: 'POST',
      body: JSON.stringify(product)
    }),
  updateProduct: (id, product) =>
    request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product)
    }),
  deleteProduct: (id) =>
    request(`/products/${id}`, {
      method: 'DELETE'
    }),
  getUsers: () => request('/users'),
  updateUserRole: (id, role) =>
    request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ role })
    }),
  getOrders: () => request('/orders')
};

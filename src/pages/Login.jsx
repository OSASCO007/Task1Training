import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

export default function Login() {
  const { authUser, login } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: 'admin@example.com', password: 'admin123' });
  const [error, setError] = useState('');

  if (authUser) return <Navigate to="/" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(formData);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/');
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-icon">🛒</div>
        <h1>E-commerce Admin Panel</h1>
        <p>Login to manage products, users, orders, and profits.</p>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={formData.password}
              onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </label>

          <button className="primary-btn" type="submit">Login</button>
        </form>

        <div className="demo-box">
          <strong>Demo Account</strong>
          <span>admin@example.com / admin123</span>
        </div>
      </section>
    </main>
  );
}

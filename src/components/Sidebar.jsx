import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/products', label: 'Products', icon: '📦' },
  { to: '/add-product', label: 'Add Product', icon: '➕' },
  { to: '/users', label: 'Users', icon: '👤' }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">🛒</span>
        <div>
          <h1>Store Admin</h1>
          <p>E-commerce Panel</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

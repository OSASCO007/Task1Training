import { useAppContext } from '../context/AppContext.jsx';

export default function Navbar() {
  const { authUser, darkMode, setDarkMode, logout } = useAppContext();

  return (
    <header className="navbar">
      <div>
        <h2>Admin Panel</h2>
        <p>Welcome back, {authUser?.name}</p>
      </div>

      <div className="navbar-actions">
        <button className="icon-btn" type="button" onClick={() => setDarkMode((value) => !value)}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button className="secondary-btn" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

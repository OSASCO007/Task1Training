import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link className="primary-link" to="/">Back to Dashboard</Link>
    </main>
  );
}

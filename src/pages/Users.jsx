import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import Spinner from '../components/Spinner.jsx';
import { api } from '../services/api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await api.getUsers();
        setUsers(data);
      } catch (apiError) {
        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await api.updateUserRole(userId, role);
      setUsers((current) => current.map((user) => (user.id === userId ? { ...user, role } : user)));
      setSuccessMessage('User role updated successfully.');
    } catch (apiError) {
      setError(apiError.message);
    }
  };

  if (loading) return <Spinner text="Loading users..." />;

  return (
    <div className="page-content">
      <div className="page-title">
        <h1>Users</h1>
        <p>Manage users and change their role between Admin and User.</p>
      </div>

      {error && <div className="alert error">{error}</div>}
      {successMessage && <div className="alert success">{successMessage}</div>}

      {users.length === 0 ? (
        <EmptyState title="No users found" message="Users will appear here when the Mock API has data." />
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                  <td>
                    <select value={user.role} onChange={(event) => handleRoleChange(user.id, event.target.value)}>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

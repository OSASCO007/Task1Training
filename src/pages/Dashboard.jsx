import { useEffect, useMemo, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import EmptyState from '../components/EmptyState.jsx';
import Spinner from '../components/Spinner.jsx';
import StatCard from '../components/StatCard.jsx';
import { api } from '../services/api.js';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [productsData, usersData, ordersData] = await Promise.all([
          api.getProducts(),
          api.getUsers(),
          api.getOrders()
        ]);
        setProducts(productsData);
        setUsers(usersData);
        setOrders(ordersData);
      } catch (apiError) {
        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const profits = useMemo(() => orders.reduce((sum, order) => sum + Number(order.total), 0), [orders]);

  const salesByMonth = useMemo(() => {
    const totals = Array.from({ length: 6 }, () => 0);
    orders.forEach((order) => {
      const month = new Date(order.date).getMonth();
      if (month >= 0 && month < 6) totals[month] += Number(order.total);
    });
    return totals;
  }, [orders]);

  const orderStatusData = useMemo(() => {
    const statusCounts = orders.reduce((result, order) => {
      result[order.status] = (result[order.status] || 0) + 1;
      return result;
    }, {});

    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: 'Orders',
          data: Object.values(statusCounts)
        }
      ]
    };
  }, [orders]);

  const salesChartData = {
    labels: monthNames.slice(0, 6),
    datasets: [
      {
        label: 'Monthly Profits',
        data: salesByMonth,
        borderWidth: 1
      }
    ]
  };

  if (loading) return <Spinner text="Loading dashboard..." />;
  if (error) return <div className="alert error">{error}</div>;

  return (
    <div className="page-content">
      <div className="page-title">
        <h1>Dashboard</h1>
        <p>Statistics, profits, and charts for the e-commerce store.</p>
      </div>

      <div className="stats-grid">
        <StatCard title="Orders" value={orders.length} icon="🧾" />
        <StatCard title="Users" value={users.length} icon="👥" />
        <StatCard title="Profits" value={`$${profits.toLocaleString()}`} icon="💰" />
        <StatCard title="Products" value={products.length} icon="📦" />
      </div>

      {orders.length === 0 ? (
        <EmptyState title="No orders yet" message="Orders will appear here when the Mock API has data." />
      ) : (
        <div className="charts-grid">
          <article className="chart-card">
            <h3>Monthly Profits</h3>
            <Bar data={salesChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </article>
          <article className="chart-card">
            <h3>Orders Status</h3>
            <Doughnut data={orderStatusData} options={{ responsive: true, maintainAspectRatio: false }} />
          </article>
        </div>
      )}
    </div>
  );
}

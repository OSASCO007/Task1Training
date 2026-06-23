export default function StatCard({ title, value, icon }) {
  return (
    <article className="stat-card">
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
      <span>{icon}</span>
    </article>
  );
}

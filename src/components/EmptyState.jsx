export default function EmptyState({ title = 'No data found', message = 'Try changing search or filters.' }) {
  return (
    <div className="empty-state">
      <span>📭</span>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

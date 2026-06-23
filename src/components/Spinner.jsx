export default function Spinner({ text = 'Loading...' }) {
  return (
    <div className="loading-box">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

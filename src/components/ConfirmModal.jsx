export default function ConfirmModal({ open, title, message, onConfirm, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="secondary-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="danger-btn" type="button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({
  title = "Confirm Delete",
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <h2 id="confirm-modal-title">{title}</h2>

        <p>{message}</p>

        <div className="confirm-modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
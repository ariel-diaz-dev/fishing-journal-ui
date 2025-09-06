import React from "react";
import "./index.css";

const ConfirmationModal = ({ 
  title, 
  description, 
  onConfirm, 
  onCancel, 
  isOpen, 
  variant = "primary",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel"
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onCancel) {
      onCancel();
    }
  };

  return (
    <div className={`confirmation-modal-overlay ${isOpen ? 'fade-in' : ''}`} onClick={handleBackdropClick}>
      <div className={`confirmation-modal ${isOpen ? 'slide-in' : ''}`}>
        <div className="confirmation-modal-header">
          <h3 className="confirmation-modal-title">{title}</h3>
        </div>
        
        <div className="confirmation-modal-body">
          <p className="confirmation-modal-description">{description}</p>
        </div>
        
        <div className="confirmation-modal-footer">
          {onCancel && (
            <button 
              type="button" 
              className="confirmation-modal-cancel-button"
              onClick={onCancel}
            >
              {cancelButtonText}
            </button>
          )}
          <button 
            type="button" 
            className={`confirmation-modal-confirm-button ${variant === 'danger' ? 'danger' : 'primary'}`}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
import React, { useEffect, useState } from "react";
import "./index.css";

const Toast = ({ id, text, variant = "info", onDismiss }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    setTimeout(() => {
      onDismiss(id);
    }, 300); // Wait for animation to complete
  };

  const getXIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
    );
  };

  const getIcon = () => {
    switch (variant) {
      case "success":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
          </svg>
        );
      case "fail":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <circle cx="12" cy="12" r="9" />
            <path d="M15 9l-6 6" />
            <path d="M9 9l6 6" />
          </svg>
        );
      case "info":
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8" />
            <circle cx="12" cy="16" r="1" />
          </svg>
        );
    }
  };

  return (
    <div className={`toast toast-${variant} ${show ? 'toast-show' : ''}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-text">
        {text}
      </div>
      <button 
        className="toast-dismiss" 
        onClick={handleDismiss}
        aria-label="Dismiss toast"
      >
        {getXIcon()}
      </button>
    </div>
  );
};

export default Toast;
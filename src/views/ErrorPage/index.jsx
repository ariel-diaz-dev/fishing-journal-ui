import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>⚠️</h1>
        <h2>Something Went Wrong</h2>
        <p>We encountered an error while processing your request.</p>
        {error && (
          <div className="error-details">
            <p>{error.message}</p>
          </div>
        )}
        <button 
          onClick={() => navigate('/dashboard')} 
          className="return-button"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
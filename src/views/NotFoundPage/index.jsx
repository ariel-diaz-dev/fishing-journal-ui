import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>⛵</h1>
        <h2>Page Not Found</h2>
        <p>Oops! Looks like you've wandered into uncharted waters.</p>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="return-button"
        >
          Take me back to land
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signInWithGoogle } from '../../firebase/auth';
import googleIcon from '../../images/google-icon.svg';
import './index.css';

const LandingPage = () => {
  // const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // const result = await signInWithGoogle();
      // if (result.user) {
      //   navigate('/dashboard');
      // }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Fishing Journal</h1>
        <p className="landing-subtitle">
          Your personal fishing companion for tracking fishing trips, gear, and insights!
        </p>
        
        <div className="features-section">
          <div className="feature-item">
            <i className="feature-icon">🛶</i>
            <h3>Trip Planning</h3>
            <p>Plan fishing trips with detailed weather and tide information</p>
          </div>
          <div className="feature-item">
            <i className="feature-icon">🎣</i>
            <h3>Tackle Management</h3>
            <p>Keep track of all your fishing gear in one place</p>
          </div>
          <div className="feature-item">
            <i className="feature-icon">📊</i>
            <h3>Fishing Insights</h3>
            <p>Get data-driven insights about your fishing patterns</p>
          </div>
        </div>

        <button onClick={handleGoogleSignIn} className="google-signin-button">
          <img 
            src={googleIcon}
            alt="Google" 
            className="google-icon"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
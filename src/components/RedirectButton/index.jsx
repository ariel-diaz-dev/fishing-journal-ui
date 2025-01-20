import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";

const RedirectButton = ({ to, children, className, external = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (external) {
      window.location.href = to;
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`redirect-button ${className}`}
    >
      {children}
    </button>
  );
};

RedirectButton.propTypes = {
  to: PropTypes.string.isRequired, // Target route or URL
  children: PropTypes.node.isRequired, // Button label or content
  className: PropTypes.string, // Optional custom styling classes
  external: PropTypes.bool, // Set to true for external links
};

RedirectButton.defaultProps = {
  className: "",
  external: false,
};

export default RedirectButton;

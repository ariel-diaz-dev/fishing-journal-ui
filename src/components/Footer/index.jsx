import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="app-footer bg-slate-700">
      <div className="footer-bottom text-gray-400">
        <p>© {new Date().getFullYear()} Fishing Journal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

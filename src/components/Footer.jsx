// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content mt-auto shadow-inner">
      <aside>
        <p className="font-semibold">
          Skippy Kip Playlist Hub <br/>Providing the best music battles since 2024.
        </p>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved.
        </p>
        <p className="text-sm opacity-70">
          Crafted with ❤️ by Brian Kiprono and enhanced by Gemini AI.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
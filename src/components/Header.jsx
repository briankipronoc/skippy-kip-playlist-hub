// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="navbar bg-base-200 shadow-xl px-4 md:px-8 py-4">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl text-primary font-bold tracking-wide">
          🎧 Skippy Kip
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><a className="text-base-content hover:text-primary transition-colors duration-200">Playlists</a></li>
          <li><a className="text-base-content hover:text-primary transition-colors duration-200">Battle</a></li>
          <li><a className="text-base-content hover:text-primary transition-colors duration-200">About</a></li>
          {/* Add a user profile/login button later */}
          <li>
            {/* Dark Mode Toggle (optional, but good to have) */}
            <label className="swap swap-rotate btn btn-ghost btn-circle">
              {/* This checkbox controls the dark mode class */}
              <input type="checkbox" className="theme-controller" onChange={() => document.documentElement.classList.toggle('dark')} defaultChecked={true} /> {/* defaultChecked based on initial dark class in index.html */}

              {/* sun icon */}
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM18.36,6l.71-.71a1,1,0,0,0-1.41-1.41L17,5.64A1,1,0,0,0,18.36,6Zm-12,8a1,1,0,0,0-1.41,1.41l.71.71A1,1,0,0,0,6.36,19l-.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM18.36,6l.71-.71a1,1,0,0,0-1.41-1.41L17,5.64A1,1,0,0,0,18.36,6Zm-12,8a1,1,0,0,0-1.41,1.41l.71.71A1,1,0,0,0,6.36,19l-.71-.71A1,1,0,0,0,5.64,17ZM12,19a1,1,0,0,0,1,1v1a1,1,0,0,0-2,0V20A1,1,0,0,0,12,19ZM7.05,6.29A1,1,0,0,0,6.34,6L5.64,5.29A1,1,0,0,0,4.22,6.71L4.93,7.41A1,1,0,0,0,7.05,6.29ZM12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm8.36-1.64A1,1,0,0,0,19.64,7.05L19,6.34A1,1,0,0,0,17.59,7.76l.71.71A1,1,0,0,0,20.36,8.36Z"/></svg>

              {/* moon icon */}
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,1,1-11.83-11.83,1,1,0,0,0-.14-1.05A1,1,0,0,0,9,1,10,10,0,1,0,23,10,1,1,0,0,0,21.64,13Z"/></svg>
            </label>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
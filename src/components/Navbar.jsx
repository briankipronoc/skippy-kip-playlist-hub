import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("spotifytheme");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "spotifytheme" ? "light" : "spotifytheme"
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-base-100/60 backdrop-blur-lg shadow-md">
      <div className="max-w-5xl mx-auto navbar px-4">
        <div className="flex-1">
          <Link to="/" className="text-lg font-bold text-primary">
            🎧 Skippy Kip
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="link link-hover text-base-content">
            Home
          </Link>
          <Link to="/vote" className="link link-hover text-base-content">
            Vote
          </Link>
          <Link to="/results" className="link link-hover text-base-content">
            Results
          </Link>
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={toggleTheme} />
            <svg
              className="swap-on fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17.64A9 9 0 0012 21a9 9 0 000-18 9 9 0 000 18zm0 0L4.22 19.06l1.42-1.42zm12.02 0l1.42 1.42-1.42-1.42zM12 3v2m0 14v2m7.78-9H19m-14 0H5.64m11.36-4.24L19.06 4.22 17.64 5.64zM4.22 4.22L5.64 5.64z" />
            </svg>
            <svg
              className="swap-off fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13.65a9 9 0 01-11.29 11.29 9 9 0 0111.29-11.29z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
}
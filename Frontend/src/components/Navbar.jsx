import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navStyle, setNavStyle] = useState("navbar-show");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100 && window.scrollY < 500) {
        setNavStyle("navbar-hide");
      } else if (window.scrollY >= 500) {
        setNavStyle("navbar-scrolled");
      } else {
        setNavStyle("navbar-show");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${navStyle} ${
        navStyle === "navbar-scrolled" ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-white">SoundLedger</div>
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex space-x-6 md:space-y-0 space-y-2 md:space-x-6 text-white md:bg-transparent bg-gray-100 md:static absolute top-full left-0 w-full md:w-auto px-4 py-2 md:p-0`}
        >
          <li>
            <a href="./" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/register" className="hover:underline">
              Register
            </a>
          </li>
          <li>
            <a href="/verify" className="hover:underline">
              Verify License
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

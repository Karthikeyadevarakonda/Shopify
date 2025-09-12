import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../contexts/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiLogIn, FiUserPlus, FiX } from "react-icons/fi";

const Navbar = () => {
  const { colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic colors based on scroll
  const linkColor = scrolled
    ? "text-white/80 hover:text-lime-400"
    : colors.textSecondary;
  const logoColor = scrolled ? "text-white" : colors.text;
  const shadowClass = scrolled ? "shadow-xl" : "shadow-md";

  const hamburgerColor = "bg-lime-400";

  const navbarBg = scrolled
    ? "bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-md"
    : colors.primary;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 transition-all duration-500 z-50 ${navbarBg} ${shadowClass}`}
      >
        <Link
          to="/"
          className={`flex items-center gap-2 text-2xl font-bold transition-colors duration-300 ${logoColor}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 109.5 124.5"
            className="w-10 h-auto"
          >
            <path
              d="M95.9 23.9c-.1-.6-.6-1-1.1-1-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.7-.7-2.2-.5-2.7-.3 0 0-1.4.4-3.7 1.1-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5C54.7.9 52.1-.1 49 0c-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.8 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5-.3 2.5-9.5 73-9.5 73l76.4 13.2 33.1-8.2c-.1-.1-13.6-91.4-13.7-92zm-28.7-7.1c-1.8.5-3.8 1.2-5.9 1.8 0-3-.4-7.3-1.8-10.9 4.5.9 6.7 6 7.7 9.1zm-10 3.1c-4 1.2-8.4 2.6-12.8 3.9 1.2-4.7 3.6-9.4 6.4-12.5 1.1-1.1 2.6-2.4 4.3-3.2 1.8 3.5 2.2 8.4 2.1 11.8zM49.1 4c1.4 0 2.6.3 3.6.9-1.6.9-3.2 2.1-4.7 3.7-3.8 4.1-6.7 10.5-7.9 16.6-3.6 1.1-7.2 2.2-10.5 3.2C31.7 18.8 39.8 4.3 49.1 4z"
              fill="#95bf47"
            />
            <path
              d="M94.8 22.9c-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.3-.3-.6-.4-1-.5V124l33.1-8.2S96 24.5 95.9 23.8c-.1-.5-.6-.9-1.1-.9z"
              fill="#5e8e3e"
            />
            <path
              d="m58 39.9-3.8 14.4s-4.3-2-9.4-1.6c-7.5.5-7.5 5.2-7.5 6.4.4 6.4 17.3 7.8 18.3 22.9.7 11.9-6.3 20-16.4 20.6-12.2.8-18.9-6.4-18.9-6.4l2.6-11s6.7 5.1 12.1 4.7c3.5-.2 4.8-3.1 4.7-5.1-.5-8.4-14.3-7.9-15.2-21.7-.7-11.6 6.9-23.4 23.7-24.4 6.5-.5 9.8 1.2 9.8 1.2z"
              fill="#fff"
            />
          </svg>
          <span>Shopify</span>
        </Link>

        <div className="hidden md:flex gap-6">
          <Link
            to="/"
            className={`hover:underline transition-colors duration-300 ${linkColor}`}
          >
            Home
          </Link>
          <Link
            to="/login"
            className={`hover:underline transition-colors duration-300 ${linkColor}`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`hover:underline transition-colors duration-300 ${linkColor}`}
          >
            Register
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`h-0.5 w-6 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 my-1 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className={`fixed top-0 right-0 h-full w-72 shadow-2xl flex flex-col ${colors.primary} ${colors.text} z-50`}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setMenuOpen(false)}>
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6 p-6 text-lg">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-lime-400"
                >
                  <FiHome /> Home
                </Link>

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-lime-400"
                >
                  <FiLogIn /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-lime-400"
                >
                  <FiUserPlus /> Register
                </Link>
              </div>

              <div className="mt-auto border-t border-white/20 p-6">
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

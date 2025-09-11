import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../contexts/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiInfo,
  FiGrid,
  FiLogIn,
  FiUserPlus,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const { colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`flex items-center justify-between px-6 py-4 shadow-md ${colors.primary} ${colors.text}`}
      >
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Shopify
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className={`hover:underline ${colors.textSecondary}`}>
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:underline ${colors.textSecondary}`}
          >
            About
          </Link>
          <Link
            to="/dashboard"
            className={`hover:underline ${colors.textSecondary}`}
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className={`hover:underline ${colors.textSecondary}`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`hover:underline ${colors.textSecondary}`}
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
              className={`h-0.5 w-6 bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current my-1 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Drawer + Page Push */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className={`fixed top-0 right-0 h-full w-72 shadow-2xl flex flex-col ${colors.primary} ${colors.text} z-50`}
            >
              {/* Header with close */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setMenuOpen(false)}>
                  <FiX size={24} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-6 p-6 text-lg">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-lime-400"
                >
                  <FiHome /> Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-lime-400"
                >
                  <FiInfo /> About
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-lime-400"
                >
                  <FiGrid /> Dashboard
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

              {/* Bottom Theme Toggle */}
              <div className="mt-auto border-t border-white/20 p-6">
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

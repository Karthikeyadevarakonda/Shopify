import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../contexts/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiLogIn, FiUserPlus, FiX } from "react-icons/fi";
import Logo from "../assets/Logo.svg";

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
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 sm:py-3 transition-all duration-500 z-50 ${navbarBg} ${shadowClass}`}
      >
        <Link
          to="/"
          className={`flex items-center gap-2 text-2xl font-bold transition-colors duration-300 ${logoColor}`}
        >
          <img
            src={Logo}
            alt="Shopify Logo"
            className="h-9 w-9 sm:h-11 sm:w-11"
          />
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
            to="/dashboard"
            className={`hover:underline transition-colors duration-300 ${linkColor}`}
          >
            Dashboard
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
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-lime-400"
                >
                  <FiHome /> Dashboard
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

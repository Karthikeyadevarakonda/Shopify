import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../contexts/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiBarChart2, FiHome, FiLogIn, FiUserPlus, FiX } from "react-icons/fi";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const { colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Check authentication on mount
    const tenantData = localStorage.getItem("tenantData");
    setIsAuthenticated(!!tenantData);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 transition-all duration-500 z-50 ${navbarBg} ${shadowClass}`}
      >
        <Link
          to="/"
          className={`flex items-center gap-1 sm:gap-2 text-lg sm:text-2xl font-bold transition-colors duration-300 ${logoColor}`}
        >
          <img
            src={Logo}
            alt="Shopify Logo"
            className="h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11"
          />
          <span className="hidden xs:inline sm:inline">Shopify</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 xl:gap-6">
          <Link
            to="/"
            className={`hover:underline transition-colors duration-300 ${linkColor}`}
          >
            Home
          </Link>

          {!isAuthenticated && (
            <>
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
            </>
          )}

          {isAuthenticated && (
            <Link
              to="/mainLayout"
              className={`hover:underline transition-colors duration-300 ${linkColor}`}
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-7 h-7 sm:w-8 sm:h-8 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`h-0.5 w-5 sm:w-6 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 sm:w-6 my-1 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 sm:w-6 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

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
              className={`fixed top-0 right-0 h-full w-64 sm:w-72 shadow-2xl flex flex-col ${colors.primary} ${colors.text} z-50`}
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                <span className="text-lg sm:text-xl font-bold">Menu</span>
                <button onClick={() => setMenuOpen(false)}>
                  <FiX size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 text-base sm:text-lg">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 sm:gap-3 hover:text-lime-400"
                >
                  <FiHome size={18} /> Home
                </Link>

                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 sm:gap-3 hover:text-lime-400"
                    >
                      <FiLogIn size={18} /> Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 sm:gap-3 hover:text-lime-400"
                    >
                      <FiUserPlus size={18} /> Register
                    </Link>
                  </>
                )}

                {isAuthenticated && (
                  <Link
                    to="/mainLayout"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 sm:gap-3 hover:text-lime-400"
                  >
                    <FiBarChart2 size={18} /> Dashboard
                  </Link>
                )}
              </div>

              <div className="mt-auto border-t border-white/20 p-4 sm:p-6">
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

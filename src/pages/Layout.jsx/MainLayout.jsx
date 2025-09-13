import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Users, UserCheck, LogOut } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Dashboard from "./Dashboard";
import Tenants from "./Tenants";
import ProtectedRoute from "../../security/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";
import ThemeToggle from "../../contexts/ThemeToggle";

const MainLayout = () => {
  const { isDarkMode, colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    top: 0,
  });

  useEffect(() => {
    const tenantData = JSON.parse(localStorage.getItem("tenantData"));
    if (!tenantData) {
      toast.error("Please login.");
      navigate("/login", { replace: true });
    } else {
      setRole(tenantData.role);
      // Redirect default page based on role
      if (
        tenantData.role === "isAdmin" &&
        location.pathname === "/mainLayout"
      ) {
        navigate("/mainLayout/tenants", { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    const activeLink = document.querySelector(
      'nav a[href="' + location.pathname + '"]'
    );
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const navRect = activeLink.parentElement.getBoundingClientRect();
      setUnderlineStyle({
        left: rect.left - navRect.left,
        width: rect.width,
        top: rect.bottom - navRect.top - 2, // 2px from bottom
      });
    }
  }, [location.pathname, role]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  const menuItems = [];
  if (role === "isTenant")
    menuItems.push({
      path: "/mainLayout",
      label: "Dashboard",
      icon: <UserCheck size={18} />,
    });
  if (role === "isAdmin")
    menuItems.push({
      path: "/mainLayout/tenants",
      label: "Tenants",
      icon: <Users size={18} />,
    });

  const panelName =
    role === "isTenant" ? "UserPanel" : role === "isAdmin" ? "AdminPanel" : "";
  const panelIconColor = isDarkMode ? "white" : "black";
  const panelIcon =
    role === "isTenant" ? (
      <UserCheck size={20} color={panelIconColor} />
    ) : role === "isAdmin" ? (
      <Users size={20} color={panelIconColor} />
    ) : null;

  return (
    <div className={`min-h-screen flex ${colors.primary} transition-colors`}>
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside
        className={`w-64 fixed h-full flex flex-col justify-between shadow-md transition-colors duration-500 ${
          isDarkMode ? colors.card + " border-r border-gray-700" : "bg-white"
        }`}
      >
        {/* Theme Toggle + Panel Name */}
        {/* Panel Header with Theme Toggle */}
        <div
          className={`px-4 py-3 flex items-center justify-between border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          {/* Panel icon + name */}
          <div className="flex items-center gap-2">
            {panelIcon}
            <h2
              className={`text-lg font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {panelName}
            </h2>
          </div>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>

        {/* Menu Links */}
        <nav className="flex-1 px-4 py-6 relative">
          {/* Sliding underline */}
          <div />

          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors duration-500 ease-in-out
                  ${
                    isActive
                      ? "bg-lime-400 text-black dark:bg-lime-500 dark:text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          className={`p-4 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        <Routes>
          {role === "isTenant" && (
            <Route
              index
              element={
                <ProtectedRoute allowedRoles={["isTenant"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          )}

          {role === "isAdmin" && (
            <Route
              path="tenants"
              element={
                <ProtectedRoute allowedRoles={["isAdmin"]}>
                  <Tenants />
                </ProtectedRoute>
              }
            />
          )}

          {/* Fallback route */}
          <Route
            path="*"
            element={
              <ProtectedRoute allowedRoles={["isTenant", "isAdmin"]}>
                {role === "isTenant" ? <Dashboard /> : <Tenants />}
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;

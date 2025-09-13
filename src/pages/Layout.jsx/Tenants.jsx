import { useEffect, useState } from "react";
import { Store, Eye, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "http://localhost:8080/api/tenants";

const Tenants = () => {
  const { isDarkMode, colors } = useTheme();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(null);

  const tenantData = JSON.parse(localStorage.getItem("tenantData"));
  const headers = tenantData
    ? {
        "Content-Type": "application/json",
        Authorization: `${tenantData.tokenType} ${tenantData.accessToken}`,
      }
    : { "Content-Type": "application/json" };

  // Fetch tenants
  const fetchTenants = async () => {
    if (!tenantData) {
      toast.error("No auth token found. Please login again.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(API_BASE, { headers });
      if (!res.ok) throw new Error("Failed to fetch tenants");
      const data = await res.json();
      setTenants(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch tenants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  if (loading) return <div className="p-6">Loading tenants...</div>;

  const truncateUrl = (url) => {
    try {
      const u = new URL(url);
      return u.hostname;
    } catch {
      return url.length > 30 ? url.slice(0, 30) + "..." : url;
    }
  };

  return (
    <section
      className={`min-h-screen px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-500 ${colors.primary}`}
    >
      <Toaster position="top-right" />

      <h1
        className={`text-2xl font-bold mb-8 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Stores
      </h1>

      {/* Tenant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className={`sm:rounded-2xl border p-6 flex flex-col justify-between transition-colors duration-500 ${
              isDarkMode
                ? colors.card + " border-gray-700"
                : "bg-white border-gray-200 shadow-md"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-lime-100 dark:bg-lime-300">
                <Store className="text-lime-300 dark:text-black" size={22} />
              </div>
              <h2
                className={`font-semibold text-lg ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {tenant.shopName}
              </h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span
                  className={`${
                    isDarkMode ? colors.textMuted : "text-gray-500"
                  }`}
                >
                  Status
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-400 text-black">
                  Active
                </span>
              </div>

              <div>
                <span
                  className={`block ${
                    isDarkMode ? colors.textMuted : "text-gray-500"
                  }`}
                >
                  Tenant ID
                </span>
                <span
                  className={`${
                    isDarkMode ? "text-white" : "text-black"
                  } break-words`}
                >
                  {tenant.tenantId}
                </span>
              </div>

              <div>
                <span
                  className={`block ${
                    isDarkMode ? colors.textMuted : "text-gray-500"
                  }`}
                >
                  Shopify URL
                </span>
                <span
                  className={`${
                    isDarkMode ? "text-white" : "text-black"
                  } break-words`}
                >
                  {truncateUrl(tenant.shopifyBaseUrl)}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowViewModal(tenant)}
                className={`w-full py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors duration-300 border ${
                  isDarkMode
                    ? "text-white border-gray-600 hover:bg-gray-700"
                    : "text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                <Eye size={16} /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`w-full max-w-md rounded-2xl p-6 transition-colors duration-500 ${
              isDarkMode
                ? colors.card + " border border-gray-700"
                : "bg-white border border-gray-200 shadow-lg"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-lg font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Tenant Details
              </h2>
              <button onClick={() => setShowViewModal(null)}>
                <X className={isDarkMode ? "text-white" : "text-black"} />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {showViewModal.shopName}
              </p>
              <p className={isDarkMode ? colors.textMuted : "text-gray-600"}>
                Tenant ID: {showViewModal.tenantId}
              </p>
              <p className={isDarkMode ? colors.textMuted : "text-gray-600"}>
                Shopify URL: {showViewModal.shopifyBaseUrl}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Tenants;

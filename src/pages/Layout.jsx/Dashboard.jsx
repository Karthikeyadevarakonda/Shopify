import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "../../contexts/ThemeContext"; // assuming you have a ThemeContext

// Utility to format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

// Get default last 30 days
const getDefaultDates = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 30);
  return { from: formatDate(from), to: formatDate(to) };
};

const Dashboard = () => {
  const { isDarkMode, colors } = useTheme();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const defaultDates = getDefaultDates();
  const [fromDate, setFromDate] = useState(defaultDates.from);
  const [toDate, setToDate] = useState(defaultDates.to);

  const tenantData = JSON.parse(localStorage.getItem("tenantData"));

  const fetchDashboard = async () => {
    if (!tenantData) {
      toast.error("No tenant data found. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const query = `?from=${fromDate}&to=${toDate}`;
      const response = await fetch(
        `http://localhost:8080/api/tenant/${tenantData.tenantId}/dashboard${query}`,
        {
          headers: {
            Authorization: `${tenantData.tokenType} ${tenantData.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch dashboard data");

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleSyncAndRefresh = async () => {
    if (!tenantData) return;

    setSyncing(true);
    try {
      const response = await fetch("http://localhost:8080/api/sync", {
        method: "POST",
        headers: {
          Authorization: `${tenantData.tokenType} ${tenantData.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: tenantData.email }),
      });

      if (!response.ok) throw new Error("Sync failed");

      toast.success("Data synced successfully!");
      await fetchDashboard();
    } catch (error) {
      console.error(error);
      toast.error("Failed to sync data");
    } finally {
      setSyncing(false);
    }
  };

  const handleClearFilter = () => {
    setFromDate(defaultDates.from);
    setToDate(defaultDates.to);
  };

  useEffect(() => {
    fetchDashboard();
  }, [fromDate, toDate]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!data) return <div className="text-center py-10">No data available</div>;

  const revenueTrend = Object.entries(data.revenueTrend || {}).map(
    ([date, value]) => ({ date, revenue: value })
  );
  const ordersByDay = Object.entries(data.ordersByDay || {}).map(
    ([date, value]) => ({ date, orders: value })
  );

  const inputBaseClasses = `border rounded-lg px-3 py-2 shadow-sm focus:ring-2 outline-none transition w-full sm:w-auto text-sm`;

  const inputClasses = isDarkMode
    ? `${inputBaseClasses} border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-lime-400`
    : `${inputBaseClasses} border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-lime-400`;

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      } p-4 space-y-6 min-h-screen transition-colors duration-500`}
    >
      <Toaster position="top-right" />

      {/* Filters & Sync */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 flex-wrap">
        <div className="flex gap-2 flex-wrap w-full sm:w-auto items-end">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className={inputClasses}
            />
          </div>
          <button
            onClick={fetchDashboard}
            className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 px-3 rounded shadow transition text-sm whitespace-nowrap self-end"
          >
            Apply
          </button>
          <button
            onClick={handleClearFilter}
            className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-3 rounded shadow transition text-sm whitespace-nowrap self-end"
          >
            Clear
          </button>
        </div>

        <button
          onClick={handleSyncAndRefresh}
          disabled={syncing}
          className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded shadow transition whitespace-nowrap"
        >
          {syncing ? "Syncing..." : "Sync & Refresh"}
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`rounded-xl shadow p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <p className="text-sm text-gray-400">Total Revenue</p>
          <h2 className="text-2xl font-bold">
            ${data.totalRevenue.toFixed(2)}
          </h2>
          <p className="text-green-500 text-sm">
            ↑ {data.totalRevenueChangePercent}%
          </p>
        </div>
        <div
          className={`rounded-xl shadow p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <p className="text-sm text-gray-400">Total Orders</p>
          <h2 className="text-2xl font-bold">{data.totalOrders}</h2>
          <p className="text-green-500 text-sm">
            ↑ {data.totalOrdersChangePercent}%
          </p>
        </div>
        <div
          className={`rounded-xl shadow p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <p className="text-sm text-gray-400">Total Customers</p>
          <h2 className="text-2xl font-bold">{data.totalCustomers}</h2>
          <p className="text-green-500 text-sm">
            ↑ {data.totalCustomersChangePercent}%
          </p>
        </div>
        <div
          className={`rounded-xl shadow p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <p className="text-sm text-gray-400">Products</p>
          <h2 className="text-2xl font-bold">{data.totalProducts}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`rounded-xl shadow p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#555" : "#ccc"}
              />
              <XAxis dataKey="date" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4ade80" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div
          className={`rounded-xl shadow p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Orders by Day</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ordersByDay}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#555" : "#ccc"}
              />
              <XAxis dataKey="date" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#60a5fa" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`rounded-xl shadow p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Top Customers</h3>
          <ul className="space-y-3">
            {data.topCustomers?.map((c) => (
              <li key={c.customerId} className="flex justify-between">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-gray-400">{c.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${c.totalSpent.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">
                    {c.ordersCount} orders
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`rounded-xl shadow p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <ul className="space-y-3">
            {data.topProducts?.map((p) => (
              <li
                key={p.productId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.imageSrc}
                    alt={p.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-gray-400">
                      ${p.unitPrice} |{" "}
                      {p.stock >= 0 ? `${p.stock} in stock` : "∞"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{p.quantitySold} sold</p>
                  <p className="text-sm text-gray-400">
                    ${p.revenue.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

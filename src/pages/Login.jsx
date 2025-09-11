import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Login = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <section
      className={`min-h-screen flex items-start sm:items-center justify-center px-0 sm:px-6 lg:px-8 pt-24 transition-colors duration-500 ${colors.primary}`}
    >
      <div className="relative   w-full sm:max-w-sm">
        <div
          className={`sm:rounded-3xl sm:border p-4 sm:p-8  transition-colors duration-500
            ${
              isDarkMode
                ? "bg-transparent sm:" + colors.card + " border-slate-700"
                : "bg-transparent sm:bg-white shadow-none sm:shadow-2xl sm:border-gray-200"
            }`}
        >
          <h2
            className={`text-2xl font-bold mb-4 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Login
          </h2>
          <p
            className={`text-center mb-6 transition-colors duration-500 ${
              isDarkMode ? colors.textMuted : "text-gray-500"
            }`}
          >
            Enter your credentials to continue
          </p>

          <form className="flex flex-col gap-4">
            {["Username", "Password"].map((placeholder, i) => (
              <input
                key={i}
                type={placeholder === "Password" ? "password" : "text"}
                placeholder={placeholder}
                className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-lime-400 outline-none transition-colors duration-300
                  ${
                    isDarkMode
                      ? colors.input + " border-gray-600 placeholder-gray-400"
                      : "bg-transparent sm:bg-white border-gray-300 text-black placeholder-gray-500"
                  }`}
              />
            ))}

            <div
              className={`flex justify-end mb-4 items-center gap-1 text-sm transition-colors duration-300
            ${
              isDarkMode
                ? "text-lime-300 hover:text-lime-400"
                : "text-lime-500 hover:text-lime-600"
            }`}
            >
              <Link to="/forgot-password" className="flex items-center gap-1">
                <span>Forgot password?</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-md font-semibold shadow-md transition-colors duration-300
              ${
                isDarkMode
                  ? colors.button
                  : "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-black"
              }`}
            >
              Login
            </button>
          </form>

          <p
            className={`mt-6 text-center text-sm transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              className={`font-semibold underline transition-colors duration-300 ${
                isDarkMode ? "hover:text-lime-400" : "hover:text-lime-600"
              }`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

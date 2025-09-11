import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Register = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <section
      className={`min-h-screen flex items-start sm:items-center justify-center px-0 sm:px-6 lg:px-8 pt-20 sm:pt-24 transition-colors duration-500 ${colors.primary}`}
    >
      <div className="relative w-full sm:max-w-sm">
        <div
          className={`sm:rounded-3xl p-4 sm:p-10 sm:border transition-colors duration-500
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
            Create Account
          </h2>
          <p
            className={`text-center mb-6 transition-colors duration-500 ${
              isDarkMode ? colors.textMuted : "text-gray-500"
            }`}
          >
            Sign up with your personal details
          </p>

          <form className="flex flex-col gap-4">
            {["Username", "Email", "Password"].map((placeholder, i) => (
              <input
                key={i}
                type={
                  placeholder === "Password"
                    ? "password"
                    : placeholder === "Email"
                    ? "email"
                    : "text"
                }
                placeholder={placeholder}
                className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-lime-400 outline-none transition-colors duration-300
                  ${
                    isDarkMode
                      ? colors.input + " border-gray-600 placeholder-gray-400"
                      : "bg-transparent sm:bg-white border-gray-300 text-black placeholder-gray-500"
                  }`}
              />
            ))}

            <button
              type="submit"
              className={`w-full py-2 rounded-md font-semibold shadow-md transition-colors duration-300
                ${
                  isDarkMode
                    ? colors.button
                    : "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-black"
                }`}
            >
              Register
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <Link
              to="/login"
              className={`flex items-center gap-1 text-sm font-semibold border px-3 py-1 rounded-full transition-colors duration-300
                ${
                  isDarkMode
                    ? "text-lime-300 border-lime-300 hover:text-lime-400 hover:border-lime-400"
                    : "text-lime-500 border-lime-500 hover:text-lime-600 hover:border-lime-600"
                }`}
            >
              Already have an account?
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
        </div>
      </div>
    </section>
  );
};

export default Register;

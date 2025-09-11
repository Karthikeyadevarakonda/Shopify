import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

const Login = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 py-10 sm:py-16 ${colors.primary} relative overflow-hidden transition-all duration-500`}
    >
      {/* 🔮 Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] bg-gradient-to-bl from-lime-400/30 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-lime-600/20 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* 📦 Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.01 }}
        className="relative z-10 flex w-full max-w-5xl flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/20 bg-white/5"
      >
        {/* 🎨 Left Panel */}
        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 text-white relative"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #0B0500 40%, #B0DB43 100%)"
              : "linear-gradient(135deg, #3b82f6 40%, #60a5fa 100%)",
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-extrabold mb-4 drop-shadow-lg text-center"
          >
            Welcome Back!
          </motion.h2>
          <p className="mb-8 opacity-90 text-center">
            To stay connected with us please login
            <br /> with your personal info
          </p>
          <Link
            to="/register"
            className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>

        {/* 📝 Right Panel (Login Form) */}
        <div
          className={`flex flex-col justify-center w-full md:w-1/2 p-6 sm:p-10 md:p-12 ${colors.card} ${colors.text}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
            Welcome
          </h2>
          <p className={`text-center mb-8 ${colors.textMuted}`}>
            Login to your account to continue
          </p>

          {/* Form */}
          <form className="flex flex-col gap-6">
            {["Username", "Password"].map((placeholder, i) => (
              <motion.input
                key={i}
                type={placeholder === "Password" ? "password" : "text"}
                placeholder={placeholder}
                whileFocus={{ scale: 1.02, borderColor: "#84cc16" }}
                className="w-full px-5 py-3 rounded-full border border-slate-300 shadow-sm focus:ring-2 focus:ring-lime-400 outline-none bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
              />
            ))}

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-medium underline hover:text-lime-500"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundPosition: "200% center" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 bg-[length:200%_200%] text-black shadow-md hover:shadow-xl transition-all"
            >
              Login
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold underline hover:text-lime-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;

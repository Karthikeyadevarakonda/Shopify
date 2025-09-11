import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const HomePage = () => {
  const { colors, theme } = useTheme();

  const titleGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-teal-400 via-slate-300 via-lime-400/90 to-green-400/90"
      : "bg-gradient-to-r from-teal-400  via-lime-500 to-green-600";

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-between relative overflow-hidden px-0 ${colors.primary}`}
    >
      {/* 🌈 Animated Gradient Background Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-r from-lime-400/30 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 270, 180, 90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* ⚡ Main Content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-8 max-w-7xl w-full py-12 lg:py-20 mx-auto">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left lg:ml-12 px-4 sm:px-0">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${titleGradient} bg-clip-text text-transparent`}
          >
            Xeno FDE Project Store
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed ${colors.text}`}
          >
            <span className="hidden sm:inline">
              Empowering enterprise retailers with seamless{" "}
              <span className="font-semibold text-lime-400">
                Shopify Data Ingestion
              </span>{" "}
              & actionable{" "}
              <span className="font-semibold text-blue-400">
                customer insights
              </span>
              . Your journey into next-gen e-commerce intelligence starts here.
            </span>
            <span className="inline sm:hidden">
              Empowering retailers with{" "}
              <span className="font-semibold text-lime-400">Shopify Data</span>{" "}
              &{" "}
              <span className="font-semibold text-blue-400">
                customer insights
              </span>
              .
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundPosition: "200% center" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded sm:rounded-full font-semibold bg-gradient-to-r from-lime-400 via-green-400 to-lime-500 bg-[length:200%_200%] text-black shadow-md hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded sm:rounded-full font-semibold border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black transition w-full sm:w-auto"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side SVG */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex-1 flex justify-center mt-6 lg:mt-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 182 186"
            className="w-[190px] sm:w-[220px] md:w-[260px] lg:w-[300px] h-auto"
            fill="none"
          >
            {" "}
            <g clipPath="url(#clip0_3039_24342)">
              {" "}
              <path
                d="M67.4009 176.307L9.61955 118.526C-3.20961 105.697 -3.20961 84.6433 9.61955 71.7138L67.4009 13.9325C80.2301 1.10332 101.284 1.10332 114.213 13.9325L171.995 71.7138C184.824 84.543 184.824 105.597 171.995 118.526L114.213 176.307C101.284 189.237 80.3304 189.237 67.4009 176.307Z"
                fill="#D9F99D"
              />{" "}
              <path
                d="M97.1534 135.613C96.5243 135.54 95.886 135.468 95.2568 135.404C95.3207 136.398 96.3328 147.804 108.104 149.518L108.378 147.658C98.667 146.245 97.3266 137.528 97.1534 135.613Z"
                fill="#38BDF8"
              />{" "}
              <path
                d="M87.862 168.092L86.8772 166.642C91.2083 163.706 93.2599 159.366 92.9863 153.731C92.7766 149.436 91.2265 145.962 91.2083 145.926L92.804 145.197C92.8678 145.352 99.4602 160.223 87.862 168.092Z"
                fill="white"
              />{" "}
              <path
                d="M101.676 168.092C103.166 168.092 104.375 166.884 104.375 165.393C104.375 163.903 103.166 162.694 101.676 162.694C100.185 162.694 98.9768 163.903 98.9768 165.393C98.9768 166.884 100.185 168.092 101.676 168.092Z"
                fill="white"
              />{" "}
              <path
                d="M81.3699 154.916C82.8604 154.916 84.0688 153.708 84.0688 152.217C84.0688 150.727 82.8604 149.518 81.3699 149.518C79.8793 149.518 78.6709 150.727 78.6709 152.217C78.6709 153.708 79.8793 154.916 81.3699 154.916Z"
                fill="#84CC16"
              />{" "}
              <path
                d="M79.724 113.756C81.5821 113.258 82.6349 111.163 82.0756 109.076C81.5163 106.99 79.5566 105.702 77.6986 106.2C75.8405 106.698 74.7876 108.793 75.347 110.88C75.9063 112.967 77.8659 114.254 79.724 113.756Z"
                fill="#94A3B8"
              />{" "}
              <path
                d="M104.362 107.156C106.221 106.658 107.273 104.562 106.714 102.476C106.155 100.389 104.195 99.1011 102.337 99.5991C100.479 100.097 99.4261 102.193 99.9854 104.279C100.545 106.366 102.504 107.654 104.362 107.156Z"
                fill="#94A3B8"
              />{" "}
              <path
                d="M49.5295 63.0152L88.8011 50.6693C98.1654 47.7241 108.15 52.9306 111.095 62.2948L125.073 106.736L51.8819 129.75L37.9039 85.3089C34.9587 75.9446 40.1652 65.9603 49.5295 63.0152Z"
                fill="#22C55E"
              />{" "}
              <path
                d="M64.4193 58.3376L100.235 47.0767C110.557 43.8307 121.553 49.566 124.799 59.8876L138.23 102.597L65.0394 125.611L51.6084 82.9017C48.3624 72.58 54.0976 61.5836 64.4193 58.3376Z"
                fill="#16A34A"
              />{" "}
              <path
                d="M89.5282 110.008C91.3863 109.51 92.4391 107.415 91.8798 105.328C91.3205 103.241 89.3608 101.954 87.5028 102.452C85.6447 102.95 84.5918 105.045 85.1512 107.132C85.7105 109.218 87.6702 110.506 89.5282 110.008Z"
                fill="#1E3A8A"
              />{" "}
              <path
                d="M114.164 103.399C116.022 102.901 117.075 100.805 116.516 98.7186C115.957 96.6319 113.997 95.344 112.139 95.8421C110.281 96.3401 109.228 98.4354 109.787 100.522C110.346 102.609 112.306 103.897 114.164 103.399Z"
                fill="#1E3A8A"
              />{" "}
              <path
                d="M53.1403 14.6528C53.7968 14.1057 74.5222 0 74.5222 0L78.8715 21.6555L90.8071 14.3975L82.227 67.6471L75.1513 37.3204L60.2159 45.1254L53.1403 14.6528Z"
                fill="white"
              />{" "}
              <path
                d="M103.472 4.32196L121.088 10.0755L95.6489 38.9342L103.472 4.32196Z"
                fill="white"
              />{" "}
            </g>{" "}
            <defs>
              {" "}
              <clipPath id="clip0_3039_24342">
                {" "}
                <rect width="181.605" height="186" fill="white" />{" "}
              </clipPath>{" "}
            </defs>{" "}
          </svg>
        </motion.div>
      </div>

      {/* Footer Section */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className={`w-full bg-gray-900 dark:bg-gray-800 ${colors.primary} text-white py-10 px-6 sm:px-12 mt-auto`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* Logo / Brand */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-400">
              Xeno FDE Store
            </h2>
            <p className={`mt-2 text-sm opacity-80 text-white"}`}>
              Empowering retailers with Shopify Data & actionable customer
              insights.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col sm:flex-row justify-between mt-6 md:mt-0">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <ul className="space-y-1 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media / Newsletter */}
          <div className="flex-1 flex flex-col items-start md:items-end mt-6 md:mt-0">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="hover:text-lime-400 transition">
                Twitter
              </a>
              <a href="#" className="hover:text-lime-400 transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-lime-400 transition">
                Instagram
              </a>
            </div>
            <p className="text-sm opacity-80">Subscribe for updates:</p>
            <form className="mt-2 flex w-full max-w-xs sm:max-w-sm">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-l-md border border-gray-600 focus:outline-none w-full"
              />
              <button className="px-4 py-2 rounded-r-md bg-lime-400 text-black font-semibold hover:bg-lime-500 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm opacity-70">
          <p className={`${colors.text}`}>
            &copy; {new Date().getFullYear()} Xeno FDE Store. Built with ❤️ for
            the{" "}
            <span className="font-semibold text-lime-400">
              Xeno FDE Internship 2025
            </span>
            .
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;

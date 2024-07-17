/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      content: {
        email: "url('/email-icon.svg')",
        phone: "url('/phone-icon.svg')",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    keyframes: {
      gradation: {
        "0%": {
          backgroundPosition: "0% 50%",
        },
        "50%": {
          backgroundPosition: "100% 50%",
        },
        "100%": {
          backgroundPosition: "0% 50%",
        },
      },
    },
    animation: {
      gradation: "gradation 5s ease infinite",
    },
  },
  plugins: [],
};

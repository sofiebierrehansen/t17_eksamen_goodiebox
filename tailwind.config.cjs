/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
       "eggshell-100": "#FFFFF8",
       "eggshell-200": "#FFFEEC",
       "stone-100": "#E1E1E1",
       "stone-200": "#A5A5A5",
       "stone-300": "#4B4B4B",
       "stone-400": "#141414",
       "lime-100": "#F8FED8",
       "lime-200": "#EAFC88",
       "lime-300": "#D2F707",
       "lavender-100": "#E3E0FF",
       "lavender-200": "#BDB4FF",
       "lavender-300": "#7462FF",
       "peachy-100": "#FFE8D7",
       "peachy-200": "#FFB985",
       "peachy-300": "#FF8F3B",
       "bubblegum-100": "#F6DCFB",
       "bubblegum-200": "#EDB5F7",
       "bubblegum-300": "#D54CEC",
    },

    fontFamily: {
      bely: "'bely-display', sans-serif",
      poppins: "'poppins', sans-serif",
    },

    fontSize: { 
      // Mobil tekst størrelse
      "m-xs": "0.8rem",
      "m-sm": "1rem",
      "m-md": "1.25rem",
      "m-lg": "1.563rem",
      "m-xl": "1.953rem",
      "m-2xl": "2.441rem",
      "m-3xl": "2.75rem",

      // Tablet tekst størrelse
      "t-xs": "0.875rem",
      "t-sm": "1rem",
      "t-md": "1.333rem",
      "t-lg": "1.777rem",
      "t-xl": "2.369rem",
      "t-2xl": "3.157rem",
      "t-3xl": "4.209rem",

      // Desktop tekst størrelse
      "d-xs": "0.875rem",
      "d-sm": "1rem",
      "d-md": "1.5rem",
      "d-lg": "2.25rem",
      "d-xl": "3.375rem",
      "d-2xl": "5.063rem",
      "d-3xl": "7.594rem",
    },

    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require("@tailwindcss/forms")],
};

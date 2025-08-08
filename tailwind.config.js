/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./App.js", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        fontFamily: {
          'inter': ['Inter', 'Inter_400Regular', 'Inter_500Medium', 'Inter_600SemiBold'],
          'inter-display': ['Inter Display', 'Inter_400Regular', 'Inter_500Medium', 'Inter_600SemiBold'],
          'inter-tight': ['Inter Tight', 'Inter_400Regular', 'Inter_500Medium', 'Inter_600SemiBold'],
        },
      },
    },
    plugins: [],
  }
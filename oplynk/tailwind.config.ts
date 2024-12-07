import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'primary-500': '#5E45FF',
  			'primary-600': '#4A20FF',
        'body-bg': "#efefef",
        'dodger-blue': "#209CFF",
        'aqua-green': "#68E0CF",
  		},
      backgroundImage: {
        'hero-bg': "url('/assets/images/herobg.png')",
      },
  		fontFamily: {
  			poppins: ["var(--font-poppins)"]
  		},
      boxShadow: {
        'royal-blue': '0 4px 6px rgba(94, 69, 255, 0.5)',
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
  	}
  },
  plugins: [],
} satisfies Config;

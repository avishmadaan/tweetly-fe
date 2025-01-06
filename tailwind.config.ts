import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt( {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			customBlack:"#000101",
			customWhite:"#EEF3F5",
			customHover:"#191819",
			customBlue:"#1C9AF0",
			customSearch:"#212326"
  		},
		
  	
  	}
  },

} ) satisfies Config;

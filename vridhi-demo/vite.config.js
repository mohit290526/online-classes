import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: change "REPO_NAME" below to your exact GitHub repo name
// (the part after github.com/username/ in your repo's URL).
// GitHub Pages serves the site from /REPO_NAME/, so this must match
// exactly or the page will load blank with 404s in the console.
export default defineConfig({
  plugins: [react()],
  base: "/Vridhiacademy/",
});

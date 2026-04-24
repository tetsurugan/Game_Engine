import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://tetsurugan.github.io/Game_Engine/
// Local dev: omit VITE_BASE_PATH (defaults to "/").
const baseRaw = process.env.VITE_BASE_PATH ?? "/";
const base = baseRaw.endsWith("/") ? baseRaw : `${baseRaw}/`;

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
});

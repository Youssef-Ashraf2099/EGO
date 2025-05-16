import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

// Load .env from the project root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.VITE_PORT) || 5173,
  },
});

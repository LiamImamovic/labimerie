import react from "@vitejs/plugin-react";
import fs from "fs";
import { defineConfig } from "vite";

// Load environment variables from .env file if it exists
const envFile = "./.env";
let env: Record<string, string> = {};
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, "utf8");
  env = envContent.split("\n").reduce<Record<string, string>>((acc, line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) acc[match[1]] = match[2];
    return acc;
  }, {});
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  define: {
    "process.env.EMAIL_USER": JSON.stringify(env["EMAIL_USER"] || ""),
    "process.env.EMAIL_PASS": JSON.stringify(env["EMAIL_PASS"] || ""),
  },
});

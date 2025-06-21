import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

import fs from "fs";

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    {
      name: "log-request-path",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            decodeURI(req.url!); // 문제되는 부분 미리 디코딩 시도
          } catch (e) {
            console.error("URI malformed 요청 감지:", req.url);
          }
          next();
        });
      },
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

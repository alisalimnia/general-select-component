import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@core": resolve(__dirname, "./src/core"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@layouts": resolve(__dirname, "./src/Layouts"),
      "@enums": resolve(__dirname, "./src/enums"),
      "@routes": resolve(__dirname, "./src/routes"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@redux": resolve(__dirname, "./src/redux"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@context": resolve(__dirname, "./src/context"),
      "@services": resolve(__dirname, "./src/services"),
      "@components": resolve(__dirname, "./src/components"),
      "@configs": resolve(__dirname, "./src/configs"),
      "@constants": resolve(__dirname, "./src/constants"),
    },
  },
});

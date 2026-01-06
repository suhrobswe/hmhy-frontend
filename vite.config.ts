import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // 🔹 qo‘shish kerak
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // 🔹 @ alias
        },
    },
});

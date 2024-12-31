import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// for removing types error: npm install --save-dev @types/node

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
        },
    },
});

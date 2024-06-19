import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        eslint(
            {
                cache: false,
                include: ["./src/**/*.ts", "./src/**/*.tsx"],
            }
        )],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            components: `${path.resolve(__dirname, "./src/components/")}`,
            public: `${path.resolve(__dirname, "./public/")}`,
            pages: path.resolve(__dirname, "./src/pages"),
            api: path.resolve(__dirname, "./src/api"),
            assets: path.resolve(__dirname, "./src/assets"),
            layout: path.resolve(__dirname, "./src/layout"),
            features: path.resolve(__dirname, "./src/features"),
            types: `${path.resolve(__dirname, "./src/@types")}`,
            utils: path.resolve(__dirname, "./src/utils"),
        },
    },
    server: {
        port: 3000,
        open: true
    },
    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 1000
    }
});

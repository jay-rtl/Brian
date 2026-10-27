import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
export default defineConfig(({ mode }) => ({ base: loadEnv(mode, process.cwd()).VITE_BASE_PATH || '/', plugins: [react(), tailwind()], build: { chunkSizeWarningLimit: 650 }, server: { host: '127.0.0.1' } }));

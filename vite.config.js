import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: path.join(__dirname, '/client'),
	plugins: [react()],
});
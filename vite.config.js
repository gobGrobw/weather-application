import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		define: {
			'process.env.UNSPLASH_SECRET_KEY': JSON.stringify(
				env.UNSPLASH_SECRET_KEY
			),
			'process.env.WEATHER_API_KEY': JSON.stringify(env.WEATHER_API_KEY),
		},
		plugins: [react()],
	};
});


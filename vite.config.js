import { defineConfig } from 'vite';
import { ripple } from '@ripple-ts/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		ripple(),
		tailwindcss(),
		VitePWA({
			strategies: 'injectManifest',
			srcDir: 'src/services', // Folder where sw.ts lives
			filename: 'sw.ts', // Your Service Worker entry file
			injectRegister: 'auto', // Let the plugin handle registration
			devOptions: {
				enabled: true,
				type: 'module', // Essential for importing shared.ts in SW
			},
		}),
	],
	server: { port: 3000 },
});

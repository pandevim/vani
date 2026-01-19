import { provideThumbnail } from './shared';

const sw = self as unknown as ServiceWorkerGlobalScope;

class SWProviderAdapter {
	sendMessage = (message: any) => {
		sw.clients.matchAll().then((clients) => {
			clients.forEach((client) => client.postMessage(message));
		});
	};
	onMessage = (callback: (data: any) => void) => {
		const handler = (event: MessageEvent) => callback(event.data);
		sw.addEventListener('message', handler);
		return () => sw.removeEventListener('message', handler);
	};
}

sw.addEventListener('install', () => {
	sw.skipWaiting();
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(sw.clients.claim());
});

provideThumbnail(new SWProviderAdapter());

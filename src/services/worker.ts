import { injectThumbnail } from './shared';
import { registerSW } from 'virtual:pwa-register';

class MainInjectorAdapter {
	sendMessage = async (message: any) => {
		if (!window.isSecureContext || !navigator.serviceWorker) return;

		if (!navigator.serviceWorker.controller) {
			await new Promise<void>((resolve) => {
				navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), {
					once: true,
				});
			});
		}

		navigator.serviceWorker.controller?.postMessage(message);
	};

	onMessage = (callback: (msg: any) => void) => {
		if (!window.isSecureContext || !navigator.serviceWorker) {
			return () => {};
		}
		const handler = (event: MessageEvent) => callback(event.data);
		navigator.serviceWorker.addEventListener('message', handler);
		return () => navigator.serviceWorker.removeEventListener('message', handler);
	};
}

export const thumbnailProxy = injectThumbnail(new MainInjectorAdapter());

export async function initServiceWorker() {
	if (!('serviceWorker' in navigator)) return;

	const registrations = await navigator.serviceWorker.getRegistrations();
	if (registrations.length > 0) {
		return; // Already initialized
	}

	registerSW({
		onRegisteredSW(swUrl, r) {
			console.log(`Service Worker at: ${swUrl}`);
		},
		onRegisterError(error) {
			console.error('SW registration error', error);
		},
	});
}

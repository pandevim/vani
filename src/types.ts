export interface MediaData {
	id: string;
	title: string;
	artist: string;
	duration: number; // duration in seconds
	redirectUrl: string;
	audioUrl: string;

	currentTime?: number;
	status?: 'playing' | 'paused' | 'stopped' | 'loading' | 'uninitialized';
	progressWidth?: string;
}

export interface AppStore {
	mediaList: MediaData[];
	isLoaded: boolean;
	currentMediaId: MediaData['id'] | null;
	themeColor: [number, number, number];
}

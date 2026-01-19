export interface MediaData {
	id: string;
	title: string;
	artist: string;
	duration: number; // duration in seconds
	redirectUrl: string;
	audioUrl: string;

	currentTime?: number;
	status?: 'playing' | 'paused' | 'loading' | 'uninitialized';
	progressWidth?: string;
}

export interface AppStore {
	mediaList: MediaData[];
	isLoaded: boolean;
	currentMediaId: string | null;
	themeColor: [number, number, number];
	isPlayerScreenOpen: boolean;
}

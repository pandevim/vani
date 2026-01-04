import { Tracked } from 'ripple';

export interface MediaData {
	id: string;
	title: string;
	artist: string;
	duration: number; // duration in seconds
	redirectUrl: string;
	audioUrl: string;

	currentTime?: number;
	status?: 'playing' | 'paused' | 'stopped' | 'loading';
}

export interface AppStore {
	mediaList: MediaData[];
	isLoaded: boolean;
	currentMedia: MediaData | null;
	themeColor: [number, number, number][] | null;
}

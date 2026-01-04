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
	mediaList: Tracked<MediaData[]>;
	isLoaded: Tracked<boolean>;
	currentMedia: Tracked<MediaData | null>;
	themeColor: Tracked<[number, number, number][] | null>;
}

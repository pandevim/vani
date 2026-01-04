import { Tracked } from 'ripple';

export interface Track {
	id: string;
	title: string;
	artist: string;
	duration: number; // duration in seconds
	redirectUrl: string;
	audioUrl: string;

	currentTime?: number;
}

export interface AppStore {
	list: Tracked<Track[]>;
	isLoaded: Tracked<boolean>;
	currentTrack: Tracked<Track | null>;
}

import { Tracked } from 'ripple';

export interface Track {
	id: string;
	title: string;
	artist: string;
	duration: string;
	timeLeft?: string;
	redirectUrl: string;
	audioUrl: string;
}

export interface AppStore {
	list: Tracked<Track[]>;
	isLoaded: Tracked<boolean>;
	currentTrack: Tracked<Track | null>;
}

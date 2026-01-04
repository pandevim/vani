import { Tracked } from 'ripple';

export interface Track {
	id: string;
	title: string;
	artist: string;
	duration: string;
	redirectUrl: string;
	audioUrl: string;
	timeLength?: string;
}

export interface AppStore {
	list: Tracked<Track[]>;
	isLoaded: Tracked<boolean>;
	currentTrack: Tracked<Track | null>;
}

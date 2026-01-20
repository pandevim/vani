export const getElapsedTime = (currentTime: number): string => {
	if (currentTime < 0) return '0:00';

	const hours = Math.floor(currentTime / 3600);
	const minutes = Math.floor((currentTime % 3600) / 60);
	const seconds = Math.floor(currentTime % 60);

	const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

	if (hours > 0) {
		// If there are hours, format as H:MM:SS (ensuring minutes are padded)
		const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
		return `${hours}:${minutesDisplay}:${secondsDisplay}`;
	}

	// Standard format M:SS
	return `${minutes}:${secondsDisplay}`;
};

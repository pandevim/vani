export const getTimeLeft = (duration: number, currentTime: number): string => {
	if (!duration || duration <= 0) return '0:00';

	const timeLeft = Math.max(0, duration - currentTime);

	const hours = Math.floor(timeLeft / 3600);
	const minutes = Math.floor((timeLeft % 3600) / 60);
	const seconds = Math.floor(timeLeft % 60);

	// Always pad seconds to two digits (e.g., :05 instead of :5)
	const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

	if (hours > 0) {
		// Pad minutes to two digits if there is an hour component
		const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
		return `${hours}:${minutesDisplay}:${secondsDisplay}`;
	}

	// Standard MM:SS format
	return `${minutes}:${secondsDisplay}`;
};

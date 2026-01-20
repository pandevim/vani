export const getTimeLeftText = (duration: number, currentTime: number): string => {
	if (!duration || duration <= 0) return 'Loading...';

	const timeLeft = Math.max(0, duration - currentTime);

	if (timeLeft < 60 && timeLeft > 0) {
		return `${Math.floor(timeLeft)}s left`;
	}

	if (timeLeft === 0) return 'Finished';

	const hours = Math.floor(timeLeft / 3600);
	const minutes = Math.floor((timeLeft % 3600) / 60);

	const hourDisplay = hours > 0 ? `${hours}h ` : '';

	const minuteDisplay = `${minutes}m`;
	const suffixDisplay = currentTime > 0 ? ' left' : '';

	return `${hourDisplay}${minuteDisplay}${suffixDisplay}`;
};

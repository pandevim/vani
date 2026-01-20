export const getProgressWidth = (duration: number, currentTime: number): string => {
	if (!duration || duration <= 0) return '0%';

	const progress = (currentTime / duration) * 100;
	return `${Math.min(progress, 100)}%`;
};

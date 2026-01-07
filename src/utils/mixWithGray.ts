export const mixWithGray = (rgb: [number, number, number], amount = 0.35) =>
	rgb.map((c) => Math.round(c * (1 - amount) + 128 * amount));

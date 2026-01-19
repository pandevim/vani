import { defineProxy } from 'comctx';
// import * as mm from 'music-metadata-browser';

async function extractCoverArt(blob: Blob): Promise<string | null> {
	try {
		// 1. Parse the blob using the library's native async method
		const metadata = await mm.parseBlob(blob);

		// 2. Access the picture from the common tags
		// The picture field is an array (files can have multiple images), we usually want the first one.
		const picture = metadata.common.picture?.[0];

		if (!picture) {
			return null;
		}

		// 3. Convert Buffer to Base64
		// music-metadata returns data as a Buffer, so we can use .toString('base64')
		const base64Data = `data:${picture.format};base64,${picture.data.toString('base64')}`;

		return base64Data;
	} catch (error) {
		console.error('Thumbnail extraction failed', error);
		return null;
	}
}

export const [provideThumbnail, injectThumbnail] = defineProxy(
	() => ({
		async getThumbnailFromAudioUrl(audioUrl: string) {
			try {
				const response = await fetch(
					`https://cors-bypass-alpha.vercel.app/api/proxy?url=${encodeURIComponent(
						audioUrl
					)}`,
					{
						headers: {
							Range: 'bytes=0-524288',
						},
					}
				);
				if (!response.ok) {
					throw new Error(`Failed to fetch audio: ${response.statusText}`);
				}
				const blob = await response.blob();

				return await extractCoverArt(blob);
			} catch (err) {
				console.error('Thumbnail extraction failed:', err);
				return null;
			}
		},
	}),
	{ namespace: 'audio-thumbnail-extractor' }
);

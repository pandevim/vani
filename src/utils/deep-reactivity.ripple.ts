import { TrackedArray, TrackedObject } from 'ripple';

/**
 * THE ALGEBRA (Visitor)
 * Defines how to transform a node into a Ripple reactive primitive.
 */
const toRipplePrimitive = (node: any) => {
	// 1. Wrap Arrays in TrackedArray
	if (Array.isArray(node)) {
		return new TrackedArray(...node);
	}

	// 2. Wrap Plain Objects in TrackedObject
	// We strictly check for plain objects to avoid breaking Dates, RegExps, etc.
	if (node && typeof node === 'object' && node.constructor === Object) {
		return new TrackedObject(node);
	}

	// 3. Leaves (primitives, null, Dates, etc.) remain as-is
	return node;
};

/**
 * THE CATAMORPHISM (Walker)
 * Performs a bottom-up structural fold.
 */
const cata = (node: any, visitor: (node: any) => any): any => {
	// A. Handle Arrays: Recurse on children FIRST
	if (Array.isArray(node)) {
		const processedChildren = node.map((child) => cata(child, visitor));
		return visitor(processedChildren);
	}

	// B. Handle Plain Objects: Recurse on values FIRST
	if (node && typeof node === 'object' && node.constructor === Object) {
		const processedEntries = Object.entries(node).map(([key, value]) => {
			return [key, cata(value, visitor)];
		});

		// Reconstruct the object with reactive children
		const processedObject = Object.fromEntries(processedEntries);
		return visitor(processedObject);
	}

	// C. Leaf node
	return visitor(node);
};

/**
 * EXPORT
 * Converts a plain JS object/array tree into a fully deep-reactive Ripple structure.
 */
export const deepReactivity = <T>(data: T): T => {
	return cata(data, toRipplePrimitive);
};

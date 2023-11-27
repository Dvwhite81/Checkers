const buildElement = (info, attributes, styles) => {
	const element = document.createElement('div');
	for (const key in info) {
		element[key] = info[key];
	}
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	for (const key in styles) {
		element.style[key] = styles[key];
	}
	return element;
};

const isEven = (x, y) => {
	return (x + y) % 2 === 0;
};

const coordsIn = (coords, array) => {
	return JSON.stringify(array).includes(JSON.stringify(coords));
};

const blackCoords = [
	[0, 1],
	[0, 3],
	[0, 5],
	[0, 7],
	[1, 0],
	[1, 2],
	[1, 4],
	[1, 6],
	[2, 1],
	[2, 3],
	[2, 5],
	[2, 7]
];

const whiteCoords = [
	[5, 0],
	[5, 2],
	[5, 4],
	[5, 6],
	[6, 1],
	[6, 3],
	[6, 5],
	[6, 7],
	[7, 0],
	[7, 2],
	[7, 4],
	[7, 6]
];

const pieceCoords = [...blackCoords, ...whiteCoords];

export { blackCoords, buildElement, coordsIn, isEven, pieceCoords, whiteCoords };

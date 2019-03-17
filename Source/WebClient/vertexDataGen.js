"use strict";

function generateQuads(size) {
	const quads = size * size;
	const vertices = new Float32Array(quads * 4 * 2);
	const indices = new Uint16Array(quads * 6);

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const i = x + y * size;

			// vertices per quad
			const vi = i * 8;
			vertices[vi + 0] = x * resolution;
			vertices[vi + 1] = y * resolution;

			vertices[vi + 2] = x * resolution + resolution;
			vertices[vi + 3] = y * resolution;

			vertices[vi + 4] = x * resolution;
			vertices[vi + 5] = y * resolution + resolution;

			vertices[vi + 6] = x * resolution + resolution;
			vertices[vi + 7] = y * resolution + resolution;

			// indices per quad
			const ii = i * 6;
			const vii = i * 4;
			indices[ii + 0] = vii;
			indices[ii + 1] = vii + 1;
			indices[ii + 2] = vii + 2;

			indices[ii + 3] = vii + 1;
			indices[ii + 4] = vii + 3;
			indices[ii + 5] = vii + 2;
		}
	}

	return { vertices, indices };
}

function generateTexCoords(tiles, size) {
	const quads = size * size;
	const texCoords = new Float32Array(quads * 4 * 2);

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const i = x + y * size;
			const tile = tiles[i];

			//const tileName = tileToNameMap[tile];
			//let uv = nameToCoordMap[tileName];

			let uv = indexToCoordMap[tile];

			if (!uv) {
				console.warn(`Invalid tile "${tile}" at ${x},${y}`);
				uv = cornersFromRect(0, 0, 0, 0);
			}

			const ti = i * 8;
			texCoords[ti + 0] = uv.TL[0];
			texCoords[ti + 1] = uv.TL[1];

			texCoords[ti + 2] = uv.BR[0];
			texCoords[ti + 3] = uv.TL[1];

			texCoords[ti + 4] = uv.TL[0];
			texCoords[ti + 5] = uv.BR[1];

			texCoords[ti + 6] = uv.BR[0];
			texCoords[ti + 7] = uv.BR[1];
		}
	}

	return texCoords;
}

//const tileToNameMap = {
//	0: "lithium",
//	1: "gold",
//	2: "titanium"
//};
//
//const nameToCoordMap = {
//	lithium: cornersFromRect(0, 0, 64, 64),
//	titanium: cornersFromRect(66, 0, 64, 64),
//	gold: cornersFromRect(132, 0, 64, 64)
//};


function cornersFromRect(x, y, w, h) {
	const texelW = 1.0 / 896.0;
	const texelH = 1.0 / 1792.0;

	x += 1;
	y += 1;
	w -= 2;
	h -= 2;

	x *= texelW;
	y *= texelH;
	w *= texelW;
	h *= texelH;

	return {
		TL: [x, y],
		BR: [x + w, y + h]
	};
}
const indexToCoordMap = {
	0: cornersFromRect(1, 1, 64, 64),
	1: cornersFromRect(65, 1, 64, 64),
	2: cornersFromRect(128, 0, 64, 64),
	3: cornersFromRect(192, 0, 64, 64),
	4: cornersFromRect(256, 0, 64, 64),
	5: cornersFromRect(320, 0, 64, 64),
	6: cornersFromRect(384, 0, 64, 64),
	7: cornersFromRect(448, 0, 64, 64),
	8: cornersFromRect(512, 0, 64, 64),
	9: cornersFromRect(576, 0, 64, 64),
	10: cornersFromRect(640, 0, 64, 64),
	11: cornersFromRect(704, 0, 64, 64),
	12: cornersFromRect(768, 0, 64, 64),
	13: cornersFromRect(832, 0, 64, 64),
	14: cornersFromRect(896, 0, 64, 64),
	15: cornersFromRect(0, 64, 64, 64),
	16: cornersFromRect(64, 64, 64, 64),
	17: cornersFromRect(128, 64, 64, 64),
	18: cornersFromRect(192, 64, 64, 64),
	19: cornersFromRect(256, 64, 64, 64),
	20: cornersFromRect(320, 64, 64, 64),
	21: cornersFromRect(384, 64, 64, 64),
	22: cornersFromRect(448, 64, 64, 64),
	23: cornersFromRect(512, 64, 64, 64),
	24: cornersFromRect(576, 64, 64, 64),
	25: cornersFromRect(640, 64, 64, 64),
	26: cornersFromRect(704, 64, 64, 64),
	27: cornersFromRect(768, 64, 64, 64),
	28: cornersFromRect(832, 64, 64, 64),
	29: cornersFromRect(896, 64, 64, 64),
	30: cornersFromRect(0, 128, 64, 64),
	31: cornersFromRect(64, 128, 64, 64),
	32: cornersFromRect(128, 128, 64, 64),
	33: cornersFromRect(192, 128, 64, 64),
	34: cornersFromRect(256, 128, 64, 64),
	35: cornersFromRect(320, 128, 64, 64),
	36: cornersFromRect(384, 128, 64, 64),
	37: cornersFromRect(448, 128, 64, 64),
	38: cornersFromRect(512, 128, 64, 64),
	39: cornersFromRect(576, 128, 64, 64),
	40: cornersFromRect(640, 128, 64, 64),
	41: cornersFromRect(704, 128, 64, 64),
	42: cornersFromRect(768, 128, 64, 64),
	43: cornersFromRect(832, 128, 64, 64),
	44: cornersFromRect(896, 128, 64, 64),
	45: cornersFromRect(0, 192, 64, 64),
	46: cornersFromRect(64, 192, 64, 64),
	47: cornersFromRect(128, 192, 64, 64),
	48: cornersFromRect(192, 192, 64, 64),
	49: cornersFromRect(256, 192, 64, 64),
	50: cornersFromRect(320, 192, 64, 64),
	51: cornersFromRect(384, 192, 64, 64),
	52: cornersFromRect(448, 192, 64, 64),
	53: cornersFromRect(512, 192, 64, 64),
	54: cornersFromRect(576, 192, 64, 64),
	55: cornersFromRect(640, 192, 64, 64),
	56: cornersFromRect(704, 192, 64, 64),
	57: cornersFromRect(768, 192, 64, 64),
	58: cornersFromRect(832, 192, 64, 64),
	59: cornersFromRect(896, 192, 64, 64),
	60: cornersFromRect(0, 256, 64, 64),
	61: cornersFromRect(64, 256, 64, 64),
	62: cornersFromRect(128, 256, 64, 64),
	63: cornersFromRect(192, 256, 64, 64),
	64: cornersFromRect(256, 256, 64, 64),
	65: cornersFromRect(320, 256, 64, 64),
	66: cornersFromRect(384, 256, 64, 64),
	67: cornersFromRect(448, 256, 64, 64),
	68: cornersFromRect(512, 256, 64, 64),
	69: cornersFromRect(576, 256, 64, 64),
	70: cornersFromRect(640, 256, 64, 64),
	71: cornersFromRect(704, 256, 64, 64),
	72: cornersFromRect(768, 256, 64, 64),
	73: cornersFromRect(832, 256, 64, 64),
	74: cornersFromRect(896, 256, 64, 64),
	75: cornersFromRect(0, 320, 64, 64),
	76: cornersFromRect(64, 320, 64, 64),
	77: cornersFromRect(128, 320, 64, 64),
	78: cornersFromRect(192, 320, 64, 64),
	79: cornersFromRect(256, 320, 64, 64),
	80: cornersFromRect(320, 320, 64, 64),
	81: cornersFromRect(384, 320, 64, 64),
	82: cornersFromRect(448, 320, 64, 64),
	83: cornersFromRect(512, 320, 64, 64),
	84: cornersFromRect(576, 320, 64, 64),
	85: cornersFromRect(640, 320, 64, 64),
	86: cornersFromRect(704, 320, 64, 64),
	87: cornersFromRect(768, 320, 64, 64),
	88: cornersFromRect(832, 320, 64, 64),
	89: cornersFromRect(896, 320, 64, 64),
	90: cornersFromRect(0, 384, 64, 64),
	91: cornersFromRect(64, 384, 64, 64),
	92: cornersFromRect(128, 384, 64, 64),
	93: cornersFromRect(192, 384, 64, 64),
	94: cornersFromRect(256, 384, 64, 64),
	95: cornersFromRect(320, 384, 64, 64),
	96: cornersFromRect(384, 384, 64, 64),
	97: cornersFromRect(448, 384, 64, 64),
	98: cornersFromRect(512, 384, 64, 64),
	99: cornersFromRect(576, 384, 64, 64),
	100: cornersFromRect(640, 384, 64, 64),
	101: cornersFromRect(704, 384, 64, 64),
	102: cornersFromRect(768, 384, 64, 64),
	103: cornersFromRect(832, 384, 64, 64),
	104: cornersFromRect(896, 384, 64, 64),
	105: cornersFromRect(0, 448, 64, 64),
	106: cornersFromRect(64, 448, 64, 64),
	107: cornersFromRect(128, 448, 64, 64),
	108: cornersFromRect(192, 448, 64, 64),
	109: cornersFromRect(256, 448, 64, 64),
	110: cornersFromRect(320, 448, 64, 64),
	111: cornersFromRect(384, 448, 64, 64),
	112: cornersFromRect(448, 448, 64, 64),
	113: cornersFromRect(512, 448, 64, 64),
	114: cornersFromRect(576, 448, 64, 64),
	115: cornersFromRect(640, 448, 64, 64),
	116: cornersFromRect(704, 448, 64, 64),
	117: cornersFromRect(768, 448, 64, 64),
	118: cornersFromRect(832, 448, 64, 64),
	119: cornersFromRect(896, 448, 64, 64),
	120: cornersFromRect(0, 512, 64, 64),
	121: cornersFromRect(64, 512, 64, 64),
	122: cornersFromRect(128, 512, 64, 64),
	123: cornersFromRect(192, 512, 64, 64),
	124: cornersFromRect(256, 512, 64, 64),
	125: cornersFromRect(320, 512, 64, 64),
	126: cornersFromRect(384, 512, 64, 64),
	127: cornersFromRect(448, 512, 64, 64),
	128: cornersFromRect(512, 512, 64, 64),
	129: cornersFromRect(576, 512, 64, 64),
	130: cornersFromRect(640, 512, 64, 64),
	131: cornersFromRect(704, 512, 64, 64),
	132: cornersFromRect(768, 512, 64, 64),
	133: cornersFromRect(832, 512, 64, 64),
	134: cornersFromRect(896, 512, 64, 64),
	135: cornersFromRect(0, 576, 64, 64),
	136: cornersFromRect(64, 576, 64, 64),
	137: cornersFromRect(128, 576, 64, 64),
	138: cornersFromRect(192, 576, 64, 64),
	139: cornersFromRect(256, 576, 64, 64),
	140: cornersFromRect(320, 576, 64, 64),
	141: cornersFromRect(384, 576, 64, 64),
	142: cornersFromRect(448, 576, 64, 64),
	143: cornersFromRect(512, 576, 64, 64),
	144: cornersFromRect(576, 576, 64, 64),
	145: cornersFromRect(640, 576, 64, 64),
	146: cornersFromRect(704, 576, 64, 64),
	147: cornersFromRect(768, 576, 64, 64),
	148: cornersFromRect(832, 576, 64, 64),
	149: cornersFromRect(896, 576, 64, 64),
	150: cornersFromRect(0, 640, 64, 64),
	151: cornersFromRect(64, 640, 64, 64),
	152: cornersFromRect(128, 640, 64, 64),
	153: cornersFromRect(192, 640, 64, 64),
	154: cornersFromRect(256, 640, 64, 64),
	155: cornersFromRect(320, 640, 64, 64),
	156: cornersFromRect(384, 640, 64, 64),
	157: cornersFromRect(448, 640, 64, 64),
	158: cornersFromRect(512, 640, 64, 64),
	159: cornersFromRect(576, 640, 64, 64),
	160: cornersFromRect(640, 640, 64, 64),
	161: cornersFromRect(704, 640, 64, 64),
	162: cornersFromRect(768, 640, 64, 64),
	163: cornersFromRect(832, 640, 64, 64),
	164: cornersFromRect(896, 640, 64, 64),
	165: cornersFromRect(0, 704, 64, 64),
	166: cornersFromRect(64, 704, 64, 64),
	167: cornersFromRect(128, 704, 64, 64),
	168: cornersFromRect(192, 704, 64, 64),
	169: cornersFromRect(256, 704, 64, 64),
	170: cornersFromRect(320, 704, 64, 64),
	171: cornersFromRect(384, 704, 64, 64),
	172: cornersFromRect(448, 704, 64, 64),
	173: cornersFromRect(512, 704, 64, 64),
	174: cornersFromRect(576, 704, 64, 64),
	175: cornersFromRect(640, 704, 64, 64),
	176: cornersFromRect(704, 704, 64, 64),
	177: cornersFromRect(768, 704, 64, 64),
	178: cornersFromRect(832, 704, 64, 64),
	179: cornersFromRect(896, 704, 64, 64),
	180: cornersFromRect(0, 768, 64, 64),
	181: cornersFromRect(64, 768, 64, 64),
	182: cornersFromRect(128, 768, 64, 64),
	183: cornersFromRect(192, 768, 64, 64),
	184: cornersFromRect(256, 768, 64, 64),
	185: cornersFromRect(320, 768, 64, 64),
	186: cornersFromRect(384, 768, 64, 64),
	187: cornersFromRect(448, 768, 64, 64),
	188: cornersFromRect(512, 768, 64, 64),
	189: cornersFromRect(576, 768, 64, 64),
	190: cornersFromRect(640, 768, 64, 64),
	191: cornersFromRect(704, 768, 64, 64),
	192: cornersFromRect(768, 768, 64, 64),
	193: cornersFromRect(832, 768, 64, 64),
	194: cornersFromRect(896, 768, 64, 64),
	195: cornersFromRect(0, 832, 64, 64),
	196: cornersFromRect(64, 832, 64, 64),
	197: cornersFromRect(128, 832, 64, 64),
	198: cornersFromRect(192, 832, 64, 64),
	199: cornersFromRect(256, 832, 64, 64),
	200: cornersFromRect(320, 832, 64, 64),
	201: cornersFromRect(384, 832, 64, 64),
	202: cornersFromRect(448, 832, 64, 64),
	203: cornersFromRect(512, 832, 64, 64),
	204: cornersFromRect(576, 832, 64, 64),
	205: cornersFromRect(640, 832, 64, 64),
	206: cornersFromRect(704, 832, 64, 64),
	207: cornersFromRect(768, 832, 64, 64),
	208: cornersFromRect(832, 832, 64, 64),
	209: cornersFromRect(896, 832, 64, 64),
	210: cornersFromRect(0, 896, 64, 64),
	211: cornersFromRect(64, 896, 64, 64),
	212: cornersFromRect(128, 896, 64, 64),
	213: cornersFromRect(192, 896, 64, 64),
	214: cornersFromRect(256, 896, 64, 64),
	215: cornersFromRect(320, 896, 64, 64),
	216: cornersFromRect(384, 896, 64, 64),
	217: cornersFromRect(448, 896, 64, 64),
	218: cornersFromRect(512, 896, 64, 64),
	219: cornersFromRect(576, 896, 64, 64),
	220: cornersFromRect(640, 896, 64, 64),
	221: cornersFromRect(704, 896, 64, 64),
	222: cornersFromRect(768, 896, 64, 64),
	223: cornersFromRect(832, 896, 64, 64),
	224: cornersFromRect(896, 896, 64, 64),
	225: cornersFromRect(0, 960, 64, 64),
	226: cornersFromRect(64, 960, 64, 64),
	227: cornersFromRect(128, 960, 64, 64),
	228: cornersFromRect(192, 960, 64, 64),
	229: cornersFromRect(256, 960, 64, 64),
	230: cornersFromRect(320, 960, 64, 64),
	231: cornersFromRect(384, 960, 64, 64),
	232: cornersFromRect(448, 960, 64, 64),
	233: cornersFromRect(512, 960, 64, 64),
	234: cornersFromRect(576, 960, 64, 64),
	235: cornersFromRect(640, 960, 64, 64),
	236: cornersFromRect(704, 960, 64, 64),
	237: cornersFromRect(768, 960, 64, 64),
	238: cornersFromRect(832, 960, 64, 64),
	239: cornersFromRect(896, 960, 64, 64),
	240: cornersFromRect(0, 1024, 64, 64),
	241: cornersFromRect(64, 1024, 64, 64),
	242: cornersFromRect(128, 1024, 64, 64),
	243: cornersFromRect(192, 1024, 64, 64),
	244: cornersFromRect(256, 1024, 64, 64),
	245: cornersFromRect(320, 1024, 64, 64),
	246: cornersFromRect(384, 1024, 64, 64),
	247: cornersFromRect(448, 1024, 64, 64),
	248: cornersFromRect(512, 1024, 64, 64),
	249: cornersFromRect(576, 1024, 64, 64),
	250: cornersFromRect(640, 1024, 64, 64),
	251: cornersFromRect(704, 1024, 64, 64),
	252: cornersFromRect(768, 1024, 64, 64),
	253: cornersFromRect(832, 1024, 64, 64),
	254: cornersFromRect(896, 1024, 64, 64),
	255: cornersFromRect(0, 1088, 64, 64),
	256: cornersFromRect(64, 1088, 64, 64),
	257: cornersFromRect(128, 1088, 64, 64),
	258: cornersFromRect(192, 1088, 64, 64),
	259: cornersFromRect(256, 1088, 64, 64),
	260: cornersFromRect(320, 1088, 64, 64),
	261: cornersFromRect(384, 1088, 64, 64),
	262: cornersFromRect(448, 1088, 64, 64),
	263: cornersFromRect(512, 1088, 64, 64),
	264: cornersFromRect(576, 1088, 64, 64),
	265: cornersFromRect(640, 1088, 64, 64),
	266: cornersFromRect(704, 1088, 64, 64),
	267: cornersFromRect(768, 1088, 64, 64),
	268: cornersFromRect(832, 1088, 64, 64),
	269: cornersFromRect(896, 1088, 64, 64),
	270: cornersFromRect(0, 1152, 64, 64),
	271: cornersFromRect(64, 1152, 64, 64),
	272: cornersFromRect(128, 1152, 64, 64),
	273: cornersFromRect(192, 1152, 64, 64),
	274: cornersFromRect(256, 1152, 64, 64),
	275: cornersFromRect(320, 1152, 64, 64),
	276: cornersFromRect(384, 1152, 64, 64),
	277: cornersFromRect(448, 1152, 64, 64),
	278: cornersFromRect(512, 1152, 64, 64),
	279: cornersFromRect(576, 1152, 64, 64),
	280: cornersFromRect(640, 1152, 64, 64),
	281: cornersFromRect(704, 1152, 64, 64),
	282: cornersFromRect(768, 1152, 64, 64),
	283: cornersFromRect(832, 1152, 64, 64),
	284: cornersFromRect(896, 1152, 64, 64),
	285: cornersFromRect(0, 1216, 64, 64),
	286: cornersFromRect(64, 1216, 64, 64),
	287: cornersFromRect(128, 1216, 64, 64),
	288: cornersFromRect(192, 1216, 64, 64),
	289: cornersFromRect(256, 1216, 64, 64),
	290: cornersFromRect(320, 1216, 64, 64),
	291: cornersFromRect(384, 1216, 64, 64),
	292: cornersFromRect(448, 1216, 64, 64),
	293: cornersFromRect(512, 1216, 64, 64),
	294: cornersFromRect(576, 1216, 64, 64),
	295: cornersFromRect(640, 1216, 64, 64),
	296: cornersFromRect(704, 1216, 64, 64),
	297: cornersFromRect(768, 1216, 64, 64),
	298: cornersFromRect(832, 1216, 64, 64),
	299: cornersFromRect(896, 1216, 64, 64),
	300: cornersFromRect(0, 1280, 64, 64),
	301: cornersFromRect(64, 1280, 64, 64),
	302: cornersFromRect(128, 1280, 64, 64),
	303: cornersFromRect(192, 1280, 64, 64),
	304: cornersFromRect(256, 1280, 64, 64),
	305: cornersFromRect(320, 1280, 64, 64),
	306: cornersFromRect(384, 1280, 64, 64),
	307: cornersFromRect(448, 1280, 64, 64),
	308: cornersFromRect(512, 1280, 64, 64),
	309: cornersFromRect(576, 1280, 64, 64),
	310: cornersFromRect(640, 1280, 64, 64),
	311: cornersFromRect(704, 1280, 64, 64),
	312: cornersFromRect(768, 1280, 64, 64),
	313: cornersFromRect(832, 1280, 64, 64),
	314: cornersFromRect(896, 1280, 64, 64),
	315: cornersFromRect(0, 1344, 64, 64),
	316: cornersFromRect(64, 1344, 64, 64),
	317: cornersFromRect(128, 1344, 64, 64),
	318: cornersFromRect(192, 1344, 64, 64),
	319: cornersFromRect(256, 1344, 64, 64),
	320: cornersFromRect(320, 1344, 64, 64),
	321: cornersFromRect(384, 1344, 64, 64),
	322: cornersFromRect(448, 1344, 64, 64),
	323: cornersFromRect(512, 1344, 64, 64),
	324: cornersFromRect(576, 1344, 64, 64),
	325: cornersFromRect(640, 1344, 64, 64),
	326: cornersFromRect(704, 1344, 64, 64),
	327: cornersFromRect(768, 1344, 64, 64),
	328: cornersFromRect(832, 1344, 64, 64),
	329: cornersFromRect(896, 1344, 64, 64),
	330: cornersFromRect(0, 1408, 64, 64),
	331: cornersFromRect(64, 1408, 64, 64),
	332: cornersFromRect(128, 1408, 64, 64),
	333: cornersFromRect(192, 1408, 64, 64),
	334: cornersFromRect(256, 1408, 64, 64),
	335: cornersFromRect(320, 1408, 64, 64),
	336: cornersFromRect(384, 1408, 64, 64),
	337: cornersFromRect(448, 1408, 64, 64),
	338: cornersFromRect(512, 1408, 64, 64),
	339: cornersFromRect(576, 1408, 64, 64),
	340: cornersFromRect(640, 1408, 64, 64),
	341: cornersFromRect(704, 1408, 64, 64),
	342: cornersFromRect(768, 1408, 64, 64),
	343: cornersFromRect(832, 1408, 64, 64),
	344: cornersFromRect(896, 1408, 64, 64),
	345: cornersFromRect(0, 1472, 64, 64),
	346: cornersFromRect(64, 1472, 64, 64),
	347: cornersFromRect(128, 1472, 64, 64),
	348: cornersFromRect(192, 1472, 64, 64),
	349: cornersFromRect(256, 1472, 64, 64),
	350: cornersFromRect(320, 1472, 64, 64),
	351: cornersFromRect(384, 1472, 64, 64),
	352: cornersFromRect(448, 1472, 64, 64),
	353: cornersFromRect(512, 1472, 64, 64),
	354: cornersFromRect(576, 1472, 64, 64),
	355: cornersFromRect(640, 1472, 64, 64),
	356: cornersFromRect(704, 1472, 64, 64),
	357: cornersFromRect(768, 1472, 64, 64),
	358: cornersFromRect(832, 1472, 64, 64),
	359: cornersFromRect(896, 1472, 64, 64),
	360: cornersFromRect(0, 1536, 64, 64),
	361: cornersFromRect(64, 1536, 64, 64),
	362: cornersFromRect(128, 1536, 64, 64),
	363: cornersFromRect(192, 1536, 64, 64),
	364: cornersFromRect(256, 1536, 64, 64),
	365: cornersFromRect(320, 1536, 64, 64),
	366: cornersFromRect(384, 1536, 64, 64),
	367: cornersFromRect(448, 1536, 64, 64),
	368: cornersFromRect(512, 1536, 64, 64),
	369: cornersFromRect(576, 1536, 64, 64),
	370: cornersFromRect(640, 1536, 64, 64),
	371: cornersFromRect(704, 1536, 64, 64),
	372: cornersFromRect(768, 1536, 64, 64),
	373: cornersFromRect(832, 1536, 64, 64),
	374: cornersFromRect(896, 1536, 64, 64),
	375: cornersFromRect(0, 1600, 64, 64),
	376: cornersFromRect(64, 1600, 64, 64),
	377: cornersFromRect(128, 1600, 64, 64),
	378: cornersFromRect(192, 1600, 64, 64),
	379: cornersFromRect(256, 1600, 64, 64),
	380: cornersFromRect(320, 1600, 64, 64),
	381: cornersFromRect(384, 1600, 64, 64),
	382: cornersFromRect(448, 1600, 64, 64),
	383: cornersFromRect(512, 1600, 64, 64),
	384: cornersFromRect(576, 1600, 64, 64),
	385: cornersFromRect(640, 1600, 64, 64),
	386: cornersFromRect(704, 1600, 64, 64),
	387: cornersFromRect(768, 1600, 64, 64),
	388: cornersFromRect(832, 1600, 64, 64),
	389: cornersFromRect(896, 1600, 64, 64),
	390: cornersFromRect(0, 1664, 64, 64),
	391: cornersFromRect(64, 1664, 64, 64),
	392: cornersFromRect(128, 1664, 64, 64),
	393: cornersFromRect(192, 1664, 64, 64),
	394: cornersFromRect(256, 1664, 64, 64),
	395: cornersFromRect(320, 1664, 64, 64),
	396: cornersFromRect(384, 1664, 64, 64),
	397: cornersFromRect(448, 1664, 64, 64),
	398: cornersFromRect(512, 1664, 64, 64),
	399: cornersFromRect(576, 1664, 64, 64),
	400: cornersFromRect(640, 1664, 64, 64),
	401: cornersFromRect(704, 1664, 64, 64),
	402: cornersFromRect(768, 1664, 64, 64),
	403: cornersFromRect(832, 1664, 64, 64),
	404: cornersFromRect(896, 1664, 64, 64),
	405: cornersFromRect(0, 1728, 64, 64),
	406: cornersFromRect(64, 1728, 64, 64),
	407: cornersFromRect(128, 1728, 64, 64),
	408: cornersFromRect(192, 1728, 64, 64),
	409: cornersFromRect(256, 1728, 64, 64),
	410: cornersFromRect(320, 1728, 64, 64),
	411: cornersFromRect(384, 1728, 64, 64),
	412: cornersFromRect(448, 1728, 64, 64),
	413: cornersFromRect(512, 1728, 64, 64),
	414: cornersFromRect(576, 1728, 64, 64),
	415: cornersFromRect(640, 1728, 64, 64),
	416: cornersFromRect(704, 1728, 64, 64),
	417: cornersFromRect(768, 1728, 64, 64),
	418: cornersFromRect(832, 1728, 64, 64),
	419: cornersFromRect(896, 1728, 64, 64),
	420: cornersFromRect(0, 1792, 64, 64),
	421: cornersFromRect(64, 1792, 64, 64),
	422: cornersFromRect(128, 1792, 64, 64),
	423: cornersFromRect(192, 1792, 64, 64),
	424: cornersFromRect(256, 1792, 64, 64),
	425: cornersFromRect(320, 1792, 64, 64),
	426: cornersFromRect(384, 1792, 64, 64),
	427: cornersFromRect(448, 1792, 64, 64),
	428: cornersFromRect(512, 1792, 64, 64),
	429: cornersFromRect(576, 1792, 64, 64),
	430: cornersFromRect(640, 1792, 64, 64),
	431: cornersFromRect(704, 1792, 64, 64),
	432: cornersFromRect(768, 1792, 64, 64),
	433: cornersFromRect(832, 1792, 64, 64),
	434: cornersFromRect(896, 1792, 64, 64)
}
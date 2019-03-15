import { getRandomColor, genId } from './utilities/general.js'

export class Vec {
	constructor(x, y) {
		this.id = genId()
		this.x = x
		this.y = y
		this.color = getRandomColor()
	}
}

export class Op {}

export class VectorGraphData {
	constructor(pos, vecs) {
		this.pos = pos
		this.vecs = vecs
	}
}

export class Pos {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

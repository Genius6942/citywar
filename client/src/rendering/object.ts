export default class TileObject {
	type: string
	x: number
	y: number
	data: {}
	constructor({x = 0, y = 0, type = 'city', data = {}} = {}) {
		this.x = x
		this.y = y
		this.type = type
		this.data = data
	}
}
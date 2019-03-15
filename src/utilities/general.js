import $ from 'jquery'
import { Pos } from '../data_types.js'

export function isPointWithinRect(point, rect) {
	return (
		point.x > rect.x &&
		point.x < rect.x + rect.width &&
		point.y > rect.y &&
		point.y < rect.y + rect.height
	)
}

export function getRectMidpoint({ x, y, width, height }) {
	return {
		x: x + width / 2,
		y: y + height / 2,
	}
}

export const getOffsetPos = (ev, fromGlobalOffset = false) => {
	if (fromGlobalOffset) {
		return new Pos(ev.clientX, ev.clientY)
	} else {
		const rect = ev.target.getBoundingClientRect()
		return new Pos(ev.clientX - rect.x, ev.clientY - rect.y)
	}
}

export function getRandomColor() {
	var letters = '0123456789ABCDEF'
	var color = '#'
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

export const getTextDimensions = (text, fontStr) => {
	const svg = $('<svg></svg>').css({
  	visibility: 'hidden',
		position: 'absolute'
	})
	const textEl = $(`<text>${text}</div>`).css({
		font: fontStr,
	})
	svg.append(textEl)
	$('body').prepend(svg)
	const size = textEl[0].getBoundingClientRect()
	svg.remove()
	return size
}

export const genId = () => Math.random().toString().replace('.', '')

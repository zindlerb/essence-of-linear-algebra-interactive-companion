import $ from 'jquery'
import _ from 'lodash'

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

export const clamp = (number, lower, upper) => {
	if (number > upper) {
    return upper
	} else if (number < lower) {
		return lower
	} else {
  	return number
	}
}

export const genId = () => Math.random().toString().replace('.', '')

export const vectorAdd = (vecA, vecB) => {
	return vecA.map((row, rowInd) => {
		return row.map((item, colInd) => {
			return item + vecB[rowInd][colInd]
		})
	})
}

export const vectorScale = (vec, scalar) => {
  return vec.map((row) => {
		return row.map((item) => {
			return item * scalar
		})
	})
}

export const ifTrue = (conditional, trueFunc) => {
	if (conditional) {
		return trueFunc()
	}
}

export const interpolateColors = (colorA, colorB, numberOfSteps) => {
	const RED = 0
	const GREEN = 1
	const BLUE = 2

	const rStepSize = (colorB[RED] - colorA[RED]) / numberOfSteps
	const gStepSize = (colorB[GREEN] - colorA[GREEN]) / numberOfSteps
	const bStepSize = (colorB[BLUE] - colorA[BLUE]) / numberOfSteps

	const rgbSteps = []
	_.times(numberOfSteps, (stepCount) => {
		rgbSteps.push([
			colorA[RED] + (rStepSize * stepCount),
			colorA[GREEN] + (gStepSize * stepCount),
			colorA[BLUE] + (bStepSize * stepCount),
		])
	})

	return rgbSteps
}

export const svgToVectorPoint = (x, y, gridSize, gridSpacing) => {
	const svgToVectorTranslation = -(gridSize/2)
	const svgToVectorScaling = 1 / (gridSize / gridSpacing)

	return [
		[(x + svgToVectorTranslation) * svgToVectorScaling],
		[-((y + svgToVectorTranslation) * svgToVectorScaling)]
	]
}

export const vectorToSvgPoint = (vector, gridSize, gridSpacing) => {
	const [[x], [y]] = vector
	const vectorToSvgTranslation = ((gridSize / gridSpacing) / 2)

	return {
  	x: (x + vectorToSvgTranslation) * gridSpacing,
		y: (-y + vectorToSvgTranslation) * gridSpacing
	}
}

export const pointVectorMatrixMultiply = ([[x], [y]], [[a, b], [c, d]]) => {
	return [
		[(a * x) + (b * y)],
		[(c * x) + (d * y)]
	]
}

export const vectorsToMatrix = ([[a], [b]], [[c], [d]]) => [[a, c], [b, d]]

export const invert2By2Matrix = ([[a, b], [c, d]]) => {
	return vectorScale([[d, -b], [-c, a]], 1/(a*d - b*c))
}

export const determinant2By2Matrix = ([[a, b], [c, d]]) => ((a*d) - (b*c))
export const getVectorSlope = ([[dx], [dy]]) => {
	// returns undefined for vertical line
	if (dx === 0) return undefined
	return (dy/dx)
}

export const matrixVectorMultiplication = () => {

}

export const composeMatrices = () => {

}

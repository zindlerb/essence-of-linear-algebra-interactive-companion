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

// x = 100
// y = 100
// gridSize = 100
// gridSpacing = 10

// desired result
// { x: 5, y: -5 }
export const svgToVectorPoint = (x, y, gridSize, gridSpacing) => {
	const svgToVectorTranslation = -(gridSize/2)
	const svgToVectorScaling = 1 / (gridSize / gridSpacing)

	return {
  	x: (x + svgToVectorTranslation) * svgToVectorScaling,
		y: -((y + svgToVectorTranslation) * svgToVectorScaling)
	}
}

window.svgToVectorPoint = svgToVectorPoint

export const vectorToSvgPoint = (x, y, gridSize, gridSpacing) => {
	const vectorToSvgTranslation = (gridSize/2)
	const vectorToSvgScaling = (gridSize / gridSpacing)

	return {
  	x: (x * vectorToSvgScaling) + vectorToSvgTranslation,
		y: ((-y * vectorToSvgScaling) + vectorToSvgTranslation)
	}
}

window.vectorToSvgPoint = vectorToSvgPoint

import React, { Component } from 'react'
import { interpolateColors } from 'Utilities/general'

class SpanGrid extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	hoveredSpanDot: null,
			colors: interpolateColors([216, 155, 234], [146, 191, 216], (this.props.size / this.props.gridSpacing) + 1)
		}
	}

	getColor(vectorX) {
		const { gridSpacing, size } = this.props
		const { colors } = this.state

		const [r, g, b] = colors[vectorX + ((size/gridSpacing) / 2)] // Adjust for origin in center
		return `rgb(${r}, ${g}, ${b})`
	}

	// Finish translating x to vector x
	// after renderSpanDot and getColor are converted go to their calling funcs and convert.
	// test hover then.

	renderSpanDot(vectorX, vectorY) {
		const { gridSpacing, onEnterSpanDot, onLeaveSpanDot } = this.props
		const { hoveredSpanDot } = this.state

		return (
			<circle
				opacity={(hoveredSpanDot && (hoveredSpanDot.x !== x || hoveredSpanDot.y !== y)) ? 0.2 : 1}
				key={`${x}_${y}`}
				cx={x * gridSpacing}
				cy={y * gridSpacing}
				r="4"
				fill={this.getColor(vectorX)}
				onMouseEnter={() => {
					this.setState({ hoveredSpanDot: { x, y } })
					onEnterSpanDot(x, y)
				}}
				onMouseLeave={() => {
					this.setState({ hoveredSpanDot: null })
					onLeaveSpanDot(x, y)
				}}
			/>
		)
	}

	render() {
		const { size, gridSpacing, spanVectors, onEnterSpanDot, onLeaveSpanDot } = this.props
		const coordinateCount = size / gridSpacing
		const [spanVectorA, spanVectorB] = spanVectors
		const slopeA = spanVectorA[1][0] / spanVectorA[0][0]
		const slopeB = spanVectorB[1][0] / spanVectorB[0][0]

		if (_.isEqual(spanVectorA, spanVectorB)) {
			const [[x], [y]] = spanVectorA
			return this.renderSpanDot(x, y)
		} else if (slopeA === slopeB) {
			const spanDots = []
			let y
			for (let x = -(coordinateCount/2); x < (coordinateCount/2); x++) {
				y = -(slopeA * x) // Flip y axis due to how svg renders
				if (y < (coordinateCount / 2) && y > -(coordinateCount / 2)) {
					spanDots.push(this.renderSpanDot(x - (coordinateCount/2), y - (coordinateCount/2))) // shift around origin for rendering
				}
			}
			return <g>{spanDots}</g>
		} else {
			const spanDots = []
			_.times(coordinateCount + 1, (x) => {
        _.times(coordinateCount + 1, (y) => {
					spanDots.push(this.renderSpanDot(x, y))
				})
			})

			return <g>{spanDots}</g>
		}
	}
}

export default SpanGrid

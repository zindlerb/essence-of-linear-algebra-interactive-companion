import React, { Component } from 'react'
import { interpolateColors, vectorToSvgPoint, svgToVectorPoint, getVectorSlope } from 'Utilities/general'

class SpanGrid extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	hoveredSpanVector: null,
			colors: interpolateColors([216, 155, 234], [146, 191, 216], (this.props.size / this.props.gridSpacing) + 1)
		}
	}

	getColor(vector) {
		const { gridSpacing, size } = this.props
		const { colors } = this.state

		const [r, g, b] = colors[vector[0][0] + ((size/gridSpacing) / 2)] // Adjust for origin in center
		return `rgb(${r}, ${g}, ${b})`
	}

	renderSpanDot(vector) {
		const { size, gridSpacing, onEnterSpanDot, onLeaveSpanDot } = this.props
		const { hoveredSpanVector } = this.state

		const svgPos = vectorToSvgPoint(vector, size, gridSpacing)
		return (
			<circle
				opacity={(hoveredSpanVector && !_.isEqual(hoveredSpanVector, vector)) ? 0.2 : 1}
				key={vector.toString()}
				cx={svgPos.x}
				cy={svgPos.y}
				r="6"
				fill={this.getColor(vector)}
				onMouseEnter={() => {
					this.setState({ hoveredSpanVector: vector })
					onEnterSpanDot(vector)
				}}
				onMouseLeave={() => {
					this.setState({ hoveredSpanVector: null })
					onLeaveSpanDot(vector)
				}}
			/>
		)
	}

	renderFullPlaneSpan(coordinateCount) {
		const spanDots = []
		for (let x = -(coordinateCount/2); x <= (coordinateCount/2); x++) {
			for (let y = -(coordinateCount/2); y <= (coordinateCount/2); y++) {
				spanDots.push(this.renderSpanDot([[x], [y]]))
			}
		}

		return spanDots
	}

	render() {
		const { size, gridSpacing, spanVectors, onEnterSpanDot, onLeaveSpanDot } = this.props
		const coordinateCount = size / gridSpacing
		const [spanVectorA, spanVectorB] = spanVectors
		const slopeA = getVectorSlope(spanVectorA)
		const slopeB = getVectorSlope(spanVectorB)
		const spanDots = []

		if (_.isEqual(spanVectorA, [[0], [0]]) && _.isEqual(spanVectorB, [[0], [0]])) {
			spanDots.push(this.renderSpanDot(spanVectorA))
		} else if (_.isUndefined(slopeA) || _.isUndefined(slopeB)) {
			if (_.isUndefined(slopeA) && _.isUndefined(slopeB)) {
				for (let y = -(coordinateCount/2); y <= (coordinateCount/2); y++) {
					spanDots.push(this.renderSpanDot([[0], [y]]))
				}
			} else {
				spanDots.push(this.renderFullPlaneSpan(coordinateCount))
			}
		} else if (slopeA === slopeB) {
			let y
			for (let x = -(coordinateCount/2); x <= (coordinateCount/2); x++) {
				y = (slopeA * x) // Flip y axis due to how svg renders
				if (y <= (coordinateCount / 2) && y >= -(coordinateCount / 2)) {
					spanDots.push(this.renderSpanDot([[x], [y]]))
				}
			}
		} else {
      spanDots.push(this.renderFullPlaneSpan(coordinateCount))
		}

		return <g>{spanDots}</g>
	}
}

export default SpanGrid

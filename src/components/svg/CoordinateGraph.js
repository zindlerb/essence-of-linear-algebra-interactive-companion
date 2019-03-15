import _ from 'lodash'
import React, { Component } from 'react'
import { genId } from '../../utilities/general'
import stateManager from './utilities/state_manager.js'

const GRAY = '#e0e0e0'
const DARK_GRAY = '#6d6d6d'

class CoordinateGraph extends Component {
	render() {
		let { graphData, size, gridSpacing } = this.props
		size = size || 100
		const { pos, vecs } = graphData
		const coordinatePlaneOrigin = { x: size / 2, y: size / 2 }
		// should be able to do all this coordinate plane stuff with transforms
		gridSpacing = gridSpacing || 5

		let currentX = 0
		let currentY = 0

		let gridLines = []

		_.times(Math.floor(size / gridSpacing) + 1, ind => {
			let color = ind === Math.floor(size / gridSpacing) / 2 ? DARK_GRAY : GRAY
			gridLines.push(<line x1={currentX} y1={0} x2={currentX} y2={size} stroke={color} />)
			gridLines.push(<line x1={0} y1={currentY} x2={size} y2={currentY} stroke={color} />)
			currentX += gridSpacing
			currentY += gridSpacing
		})

		return (
			<g transform={`translate(${pos.x}, ${pos.y})`}>
				{gridLines}
				{vecs.map(({ x, y, color }, ind) => {
					const id = genId()
					return (
						<g>
							<defs>
								<marker
									id={id}
									markerWidth="10"
									markerHeight="10"
									refX="0"
									refY="3"
									orient="auto"
									markerUnits="strokeWidth"
									viewBox="0 0 20 20">
									<path d="M0,0 L0,6 L9,3 z" fill={color} />
								</marker>
							</defs>
							<line
								markerEnd={`url(#${id})`}
								x1={coordinatePlaneOrigin.x}
								y1={coordinatePlaneOrigin.y}
								x2={coordinatePlaneOrigin.x + x}
								y2={coordinatePlaneOrigin.y - y}
								stroke={color}
								strokeWidth={4}
							/>
							<DragHandle
								initialValues={{ x, y }}
								pos={{ x: coordinatePlaneOrigin.x + x, y: coordinatePlaneOrigin.y - y }}
								onDrag={({ dx, dy }, initialValues) => {
									stateManager.setState(state => {
										const vGraph = state.vectorGraphs.find(({ id }) => id === graphData.id)
										vGraph.vecs[ind].x = initialValues.x + dx
										vGraph.vecs[ind].y = initialValues.y - dy
									})
								}}
							/>
						</g>
					)
				})}
			</g>
		)
	}
}

export default CoordinateGraph

import _ from 'lodash'
import cx from 'classnames'
import React, { Component } from 'react'
import { genId } from 'Utilities/general'
import DragHandle from 'Components/svg/DragHandle'

const GRAY = '#e0e0e0'
const DARK_GRAY = '#6d6d6d'

// Move control of grid size from external to internal
// call it grid scaling

class CoordinateGraph extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	isDragging: false
		}
	}
	render() {
		let { size, gridSpacing, position, vectorData } = this.props
		size = size || 100
		const coordinatePlaneOrigin = { x: size / 2, y: size / 2 }
		// should be able to do all this coordinate plane stuff with transforms
		gridSpacing = gridSpacing || 5

		let currentX = 0
		let currentY = 0

		let gridLines = []

		_.times(Math.floor(size / gridSpacing) + 1, ind => {
			let color = ind === Math.floor(size / gridSpacing) / 2 ? DARK_GRAY : GRAY
			gridLines.push(<line key={`${ind}_v`} x1={currentX} y1={0} x2={currentX} y2={size} stroke={color} />)
			gridLines.push(<line key={`${ind}_y`} x1={0} y1={currentY} x2={size} y2={currentY} stroke={color} />)
			currentX += gridSpacing
			currentY += gridSpacing
		})

		return (
			<g
				className={cx({ move: this.state.isDragging })}
				transform={`translate(${position.x}, ${position.y})`}>
				<rect x={0} y={0} width={size} height={size} fill="transparent"/>
				{gridLines}
				{vectorData.map(({ vector, onDrag }, ind) => {
					const [[vecX], [vecY]] = vector
					const normalizedVecX = vecX * gridSpacing
					const normalizedVecY = vecY * gridSpacing

					const id = genId()
					return (
						<g key={ind}>
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
									<path d="M0,0 L0,6 L9,3 z" fill="black" />
								</marker>
							</defs>
							<line
								markerEnd={`url(#${id})`}
								x1={coordinatePlaneOrigin.x}
								y1={coordinatePlaneOrigin.y}
								x2={coordinatePlaneOrigin.x + normalizedVecX}
								y2={coordinatePlaneOrigin.y - normalizedVecY}
								stroke="black"
								strokeWidth={4}
							/>
							<DragHandle
								onDragStart={() => {
                	this.setState({ isDragging: true })
								}}
								onDragEnd={() => {
                  this.setState({ isDragging: false })
								}}
								gridScale={gridSpacing}
								initialValues={{ vecX, vecY }}
								pos={{ x: coordinatePlaneOrigin.x + normalizedVecX, y: coordinatePlaneOrigin.y - normalizedVecY }}
								onDrag={onDrag}
							/>
						</g>
					)
				})}
			</g>
		)
	}
}

export default CoordinateGraph

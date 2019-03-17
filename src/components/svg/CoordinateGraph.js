import _ from 'lodash'
import cx from 'classnames'
import React, { Component } from 'react'
import { ifTrue } from 'Utilities/general'
import DragHandle from 'Components/svg/DragHandle'

const GRAY = '#e0e0e0'
const DARK_GRAY = '#6d6d6d'

class CoordinateGraph extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	isDragging: false
		}
	}
	render() {
		let { size, gridSpacing, vectors, vectorOptions = [], className } = this.props
		const { isDragging } = this.state
		size = size || 100
		const coordinatePlaneOrigin = { x: size / 2, y: size / 2 } // shoule all the coordinate plane stuff happen with transforms?
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
			<svg className={className} width={size} height={size}>
				<g className={cx({ 'c-grabbing': isDragging })}>
					<rect x={0} y={0} width={size} height={size} fill="transparent"/>
					{gridLines}
					{vectors.map((vector, ind) => {
						const { color, onMove, origin = { x: 0, y: 0 } } = (vectorOptions[ind] || {})
						const [[vecX], [vecY]] = vector
						const normalizedVecX = vecX * gridSpacing
						const normalizedVecY = vecY * gridSpacing
						const adjustedOriginX = coordinatePlaneOrigin.x + (origin.x * gridSpacing)
						const adjustedOriginY = coordinatePlaneOrigin.y - (origin.y * gridSpacing)

						return (
							<g key={ind}>
								<line
									x1={adjustedOriginX}
									y1={adjustedOriginY}
									x2={adjustedOriginX + normalizedVecX}
									y2={adjustedOriginY - normalizedVecY}
									stroke={color}
									strokeWidth={4}
								/>
								{
									ifTrue(onMove, () => (
										<DragHandle
											onDragStart={() => {
			                	this.setState({ isDragging: true })
											}}
											onDragEnd={() => {
			                  this.setState({ isDragging: false })
											}}
											gridScale={gridSpacing}
											initialValues={{ vecX, vecY }}
											pos={{ x: adjustedOriginX + normalizedVecX, y: adjustedOriginY - normalizedVecY }}
											onDrag={({ dx, dy }, { vecX, vecY }) => {
												const newX = vecX + dx
												const newY =  vecY - dy // why do I need to do this? bug?
												if (
													newX <= ((size/2) / gridSpacing) &&
													newX >= (-(size/2) / gridSpacing) &&
													newY <= ((size/2) / gridSpacing) &&
													newY >= (-(size/2) / gridSpacing)
												) {
													onMove({ newY, newX })
												}
											}}
											graphSize={size}
											isDragging={isDragging}
										/>
									))
								}
							</g>
						)
					})}
				</g>
			</svg>
		)
	}
}

export default CoordinateGraph

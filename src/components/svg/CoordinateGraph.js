import _ from 'lodash'
import cx from 'classnames'
import React, { Component } from 'react'
import { X_COMPONENT_COLOR, Y_COMPONENT_COLOR } from 'Root/constants/colors'
import { ifTrue } from 'Utilities/general'
import DragHandle from 'Components/svg/DragHandle'

const GRAY = '#e0e0e0'
const BLACK = '#333333'
const SVG_PADDING = 20

class CoordinateGraph extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	isDragging: false
		}
	}
	render() {
		let { size, gridSpacing, vectors, className=null, vectorOptions=[], showGridlines=true, showLabels=true } = this.props
		const { isDragging } = this.state
		size = size || 100
		const coordinatePlaneOrigin = { x: size / 2, y: size / 2 } // shoule all the coordinate plane stuff happen with transforms?
		gridSpacing = gridSpacing || 5

		let currentX = 0
		let currentY = 0

		let gridLines = []

		if (showGridlines) {
			_.times(Math.floor(size / gridSpacing) + 1, ind => {
				let color = ind === Math.floor(size / gridSpacing) / 2 ? BLACK : GRAY
				gridLines.push(<line key={`${ind}_v`} x1={currentX} y1={0} x2={currentX} y2={size} stroke={color} />)
				gridLines.push(<line key={`${ind}_y`} x1={0} y1={currentY} x2={size} y2={currentY} stroke={color} />)
				currentX += gridSpacing
				currentY += gridSpacing
			})
		} else {
			const TICK_SIZE = 4
			_.times(Math.floor(size / gridSpacing) + 1, ind => {
				// Vertical Tick
				gridLines.push(
					<line
						key={`${ind}_x`}
						x1={currentX}
						y1={(size/2) - TICK_SIZE}
						x2={currentX}
						y2={(size/2) + TICK_SIZE}
						stroke={BLACK}
						strokeWidth={2}
					/>
				)

				// Horizontal Tick
				gridLines.push(
					<line
						key={`${ind}_y`}
						x1={(size/2) - TICK_SIZE}
						y1={currentY}
						x2={(size/2) + TICK_SIZE}
						y2={currentY}
						stroke={BLACK}
						strokeWidth={2}
					/>
				)
				currentX += gridSpacing
				currentY += gridSpacing
			})
			gridLines.push(<line key={`origin_line_x`} x1={0} y1={size/2} x2={size} y2={size/2} stroke={BLACK} strokeWidth={2} />)
			gridLines.push(<line key={`origin_line_y`} x1={size/2} y1={0} x2={size/2} y2={size} stroke={BLACK} strokeWidth={2} />)
		}

		return (
			<svg className={cx(className, 'u-unselectable')} width={size + (SVG_PADDING * 2)} height={size + (SVG_PADDING * 2)}>
				{
        	ifTrue(showLabels, () => ([
						<text style={{ font: 'italic 20px serif' }} x={(size/2) + SVG_PADDING - 3} y={9}>x</text>,
						<text style={{ font: 'italic 20px serif' }} x={size + SVG_PADDING + 10} y={(size/2) + SVG_PADDING + 3}>y</text>
					]))
				}
				<g className={cx({ 'c-grabbing': isDragging })} transform={`translate(${SVG_PADDING}, ${SVG_PADDING})`}>
					<rect x={0} y={0} width={size} height={size} fill="transparent"/>
					{gridLines}
					{vectors.map((vector, ind) => {
						const { color, onMove, origin = { x: 0, y: 0 }, showComponentVectors=false } = (vectorOptions[ind] || {})
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
									ifTrue(showComponentVectors, () => ([
										// X component
										<line
											x1={adjustedOriginX}
											y1={adjustedOriginY}
											x2={adjustedOriginX + normalizedVecX}
											y2={adjustedOriginY}
											stroke={X_COMPONENT_COLOR}
											strokeWidth={4}
										/>,
										// Y component
										<line
											x1={adjustedOriginX + normalizedVecX}
											y1={adjustedOriginY}
											x2={adjustedOriginX + normalizedVecX}
											y2={adjustedOriginY - normalizedVecY}
											stroke={Y_COMPONENT_COLOR}
											strokeWidth={4}
										/>
									]))
								}
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
											color={color}
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

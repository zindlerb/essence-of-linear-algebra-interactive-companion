import React, { Component } from 'react'
import { X_COMPONENT_COLOR, Y_COMPONENT_COLOR } from 'Root/constants/colors'
import { ifTrue } from 'Utilities/general'
import DragHandle from 'Components/svg/DragHandle'
import globalStateService from 'Utilities/global_state_service'

class GeometricVectors extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isDragging: false
		}
	}

	render() {
		const { size, gridSpacing, vectors, vectorOptions=[] } = this.props
		const { isDragging } = this.state
		const coordinatePlaneOrigin = { x: size / 2, y: size / 2 } // shoule all the coordinate plane stuff happen with transforms?

		return (
			vectors.map((vector, ind) => {
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
								<line
									key="x_component"
									x1={adjustedOriginX}
									y1={adjustedOriginY}
									x2={adjustedOriginX + normalizedVecX}
									y2={adjustedOriginY}
									stroke={X_COMPONENT_COLOR}
									strokeWidth={4}
								/>,
								<line
									key="y_component"
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
										globalStateService.setState({ globalCursor: 'grabbing' })
	                	this.setState({ isDragging: true })
									}}
									onDragEnd={() => {
										globalStateService.setState({ globalCursor: null })
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
			})
		)
	}
}

export default GeometricVectors

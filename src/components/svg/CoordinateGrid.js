import _ from 'lodash'
import React from 'react'
import { ifTrue } from 'Utilities/general'
import { GRAY, BLACK } from 'Root/constants/colors'

const getTransformString = (transformMatrix, gridSize) => {
	const [vec1Str, vec2Str] = transformMatrix.map(([x, y]) => `${x}, ${y}`)
	return `translate(${gridSize/2}, ${gridSize/2}) matrix(${vec1Str}, ${vec2Str}, 0, 0) translate(-${gridSize/2}, -${gridSize/2})`
}

const CoordinateGrid = ({
	size, gridSpacing, opacity=1, showGridlines=true,
	showLabels=true, gridLineColor=GRAY, transform=null
}) => {
	let currentX = 0
	let currentY = 0
	let gridLines = []
	if (showGridlines) {
		_.times(Math.floor(size / gridSpacing) + 1, ind => {
			let color = ind === Math.floor(size / gridSpacing) / 2 ? BLACK : gridLineColor
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
		<g transform={transform ? getTransformString(transform, size) : null} opacity={opacity}>
			<rect x={0} y={0} width={size} height={size} fill="transparent"/>
			{
       	ifTrue(showLabels, () => ([
					<text key="x" style={{ font: 'italic 20px serif' }} x={(size/2) - 3} y={-9}>x</text>,
					<text key="y" style={{ font: 'italic 20px serif' }} x={size + 10} y={(size/2) + 3}>y</text>
				]))
			}
			{gridLines}
		</g>
	)
}

export default CoordinateGrid

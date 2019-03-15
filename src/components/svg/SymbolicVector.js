import React, { Component } from 'react'
import { getTextDimensions } from '../../utilities/general.js'

const BRACKET_THICKNESS = 6 //
const VECTOR_INSET = 15
const BRACKET_PADDING = 5
const FONT = '30px sans-serif'
const COLUMN_SPACING = 10
const ROW_SPACING = 0

class SymbolicVector extends Component {
	render() {
		const { vector, position } = this.props;
		const totalRows =  vector.length;
		const totalColumns = vector[0].length;
		// determine height
		// determing width
			 // dependent on size of numbers (decimals)

		// svg text size - what is the height and width of this text
		// row spacing, column spacing
		// vector sides padding/ padding
		const vectorItems = []
		const vectorHeight = 100
		const vectorWidth = 100

		let itemWidth = 0
		let itemHeight = 0
		for (let colInd = 0; colInd < totalColumns; colInd++) {
			let columnHeight = 0
			let maxItemWidth = 0
			for (let rowInd = 0; rowInd < totalRows; rowInd++) {
				// Iterate all rows in a column. Then move to next column.
				const vectorItem = vector[rowInd][colInd]
				const itemDimensions = getTextDimensions(vectorItem, FONT)
				itemWidth = Math.max(itemWidth, itemDimensions.width)
				itemHeight = itemDimensions.height // All heights are assumed to be the same.
			}
		}

		// Content is everything inside the brackets and padding. The numbers or variables of the vector.
		// totalColumns - 1 because the spacing is between each item.
		let contentHeight = (itemHeight * totalRows) + (COLUMN_SPACING * (totalRows - 1))
		let contentWidth = (itemWidth * totalColumns) + (ROW_SPACING * (totalColumns - 1))
		const totalWidth = (BRACKET_PADDING * 2) + contentWidth + (BRACKET_THICKNESS * 2)
		const totalHeight = (BRACKET_PADDING * 2) + contentHeight + (BRACKET_THICKNESS * 2)

		let textX = BRACKET_THICKNESS + BRACKET_PADDING
		let textY = BRACKET_THICKNESS + BRACKET_PADDING
		vector.forEach((row, rowInd) => {
			row.forEach((item, colInd) => {
				const { height } = getTextDimensions(item, FONT)
				console.log('item:', item, 'height', height, 'itemHeigth', itemHeight)
				vectorItems.push(
					<text
						key={`${rowInd}_${colInd}`}
						x={textX + (colInd * (itemWidth + COLUMN_SPACING))}
						y={(textY + height) + (rowInd * (itemHeight + ROW_SPACING))}
						style={{ font: FONT }}>
						{item}
					</text>
				)
			})
		})

		return (
			<g fill="black">
				<rect className="left-top" x={0} y={0} width={VECTOR_INSET} height={BRACKET_THICKNESS} />
				<rect className="left-side" x={0} y={0} width={BRACKET_THICKNESS} height={totalHeight} />
				<rect className="left-bottom" x={0} y={totalHeight - BRACKET_THICKNESS} width={VECTOR_INSET} height={BRACKET_THICKNESS} />
				<rect className="right-top" x={totalWidth - VECTOR_INSET} y={0} width={VECTOR_INSET} height={BRACKET_THICKNESS} />
				<rect className="right-side" x={totalWidth - BRACKET_THICKNESS} y={0} width={BRACKET_THICKNESS} height={totalHeight} />
				<rect className="right-bottom" x={totalWidth - VECTOR_INSET} y={totalHeight - BRACKET_THICKNESS} width={VECTOR_INSET} height={BRACKET_THICKNESS} />
				{vectorItems}
			</g>
		)
	}
}

export default SymbolicVector

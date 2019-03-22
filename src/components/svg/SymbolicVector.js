import cx from 'classnames'
import PT from 'prop-types';
import React, { Component } from 'react'
import { getTextDimensions } from '../../utilities/general.js'

const BRACKET_THICKNESS = 3
const VECTOR_INSET = 10
const VERTICAL_BRACKET_PADDING = 4
const HORIZONTAL_BRACKET_PADDING = 12
const FONT = '30px sans-serif'
const COLUMN_SPACING = 5
const ROW_SPACING = 3
const BASELINE_HEIGHT = 7 // Space between baseline and bottom of the text bounding box. Must be determined manually based on font size.

class SymbolicVector extends Component {
	static propTypes = {
  	vector: PT.arrayOf(PT.arrayOf(PT.any)), // Example: [[1, 2], [34, 6]]
		scale: PT.number
	}

	render() {
		const { vector, className = null, scale = 1, options = {}, stringVector = null, onScrub = null } = this.props;
		const { color = 'black' } = options
		const totalRows =  vector.length;
		const totalColumns = vector[0].length;
		const vectorItems = []

		let itemWidth = 0
		let itemHeight = 0
		for (let colInd = 0; colInd < totalColumns; colInd++) {
			let columnHeight = 0
			let maxItemWidth = 0
			for (let rowInd = 0; rowInd < totalRows; rowInd++) {
				// Iterate all rows in a column. Then move to next column.
				let vectorItem = vector[rowInd][colInd]
				if (stringVector) { // combine dimension getting into 1 part
					vectorItem = stringVector[rowInd][colInd]
				}
				const itemDimensions = getTextDimensions(vectorItem, FONT)
				itemWidth = Math.max(itemWidth, itemDimensions.width)
				itemHeight = itemDimensions.height // All heights are assumed to be the same.
			}
		}

		// Content is everything inside the brackets and padding. The numbers or variables of the vector.
		// totalColumns - 1 because the spacing is between each item.
		let contentHeight = (itemHeight * totalRows) + (ROW_SPACING * (totalRows - 1))
		const totalHeight = (VERTICAL_BRACKET_PADDING * 2) + contentHeight + (BRACKET_THICKNESS * 2)

		let contentWidth = (itemWidth * totalColumns) + (COLUMN_SPACING * (totalColumns - 1))
		const totalWidth = (HORIZONTAL_BRACKET_PADDING * 2) + contentWidth + (BRACKET_THICKNESS * 2)

		let textX = BRACKET_THICKNESS + HORIZONTAL_BRACKET_PADDING
		let textY = BRACKET_THICKNESS + VERTICAL_BRACKET_PADDING
		vector.forEach((row, rowInd) => {
			row.forEach((item, colInd) => {
				let dimensionItem = item
				if (stringVector) {
					dimensionItem = stringVector[rowInd][colInd]
				}
				const { height, width } = getTextDimensions(dimensionItem, FONT)
				if (onScrub) {

				} else {
        	vectorItems.push(
						<text
							key={`${rowInd}_${colInd}`}
							x={textX + (colInd * (itemWidth + COLUMN_SPACING)) + ((itemWidth - width) / 2)}
							y={(textY + height) + (rowInd * (itemHeight + ROW_SPACING)) - BASELINE_HEIGHT}
							style={{ font: FONT }}>
							{item}
						</text>
					)
				}
			})
		})

		return (
			<svg className={cx(className, 'u-unselectable')} width={totalWidth * scale} height={totalHeight * scale}>
				<g fill={color} transform={`scale(${scale})`}>
					<rect className="left-top" x={0} y={0} width={VECTOR_INSET} height={BRACKET_THICKNESS} />
					<rect className="left-side" x={0} y={0} width={BRACKET_THICKNESS} height={totalHeight} />
					<rect className="left-bottom" x={0} y={totalHeight - BRACKET_THICKNESS} width={VECTOR_INSET} height={BRACKET_THICKNESS} />
					<rect className="right-top" x={totalWidth - VECTOR_INSET} y={0} width={VECTOR_INSET} height={BRACKET_THICKNESS} />
					<rect className="right-side" x={totalWidth - BRACKET_THICKNESS} y={0} width={BRACKET_THICKNESS} height={totalHeight} />
					<rect className="right-bottom" x={totalWidth - VECTOR_INSET} y={totalHeight - BRACKET_THICKNESS} width={VECTOR_INSET} height={BRACKET_THICKNESS} />
					{vectorItems}
				</g>
			</svg>
		)
	}
}

export default SymbolicVector

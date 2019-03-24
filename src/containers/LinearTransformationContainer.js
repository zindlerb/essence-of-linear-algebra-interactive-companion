import _ from 'lodash'
import React, { Component } from 'react'
import SvgContainer from 'Components/svg/SvgContainer'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGrid from 'Components/svg/CoordinateGrid'
import GeometricVectors from 'Components/svg/GeometricVectors'
import { I_HAT, J_HAT } from 'Root/constants.js'
import Scrubber from 'Components/Scrubber'
import SpanGrid from 'Components/svg/SpanGrid'
import {
  vectorScale, ifTrue, pointVectorMatrixMultiply, invert2By2Matrix,
  vectorsToMatrix, determinant2By2Matrix
} from 'Utilities/general'
import { BLUE, SHADOW_BLUE, PURPLE, SHADOW_PURPLE, GREEN } from 'Root/constants/colors'

const GRID_SIZE = 420
const GRID_SPACING = 30

class LinearTransformationContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	transformMatrix: [
				[1, 1],
				[0, 1]
			],
		}
	}

	render() {
		const { transformMatrix } = this.state

		return (
			<div className="span-container mv4 flex items-center">
				<SvgContainer size={GRID_SIZE}>
					<CoordinateGrid
						opacity={0.7}
						size={GRID_SIZE}
						gridSpacing={GRID_SPACING}
						showGridlines={true}
						showLabels={false}
					/>
					<CoordinateGrid
						gridLineColor={'#7cb9e4'}
						transform={transformMatrix}
						size={GRID_SIZE}
						gridSpacing={GRID_SPACING}
						showGridlines={true}
						showLabels={false}
					/>
				</SvgContainer>
				<div className="ml4 flex items-center">
					<SymbolicVector
						className="mr2"
						vector={transformMatrix}
						onScrub={({ value, row, col }) => {
							if (this.state.transformMatrix[row][col] !== value) {
								const newTMatrix = _.cloneDeep(transformMatrix)
								newTMatrix[row][col] = value
								this.setState({ transformMatrix: newTMatrix })
							}
						}}
					/>
					<SymbolicVector vector={[['x'], ['y']]} />
				</div>
			</div>
		)
	}
}

export default LinearTransformationContainer

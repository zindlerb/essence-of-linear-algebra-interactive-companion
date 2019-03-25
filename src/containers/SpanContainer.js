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
import './SpanContainer.css'

const GRID_SIZE = 420
const GRID_SPACING = 30

class SpanContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vectorW: [[1], [3]],
			vectorV: [[0], [-2]],

			exampleVector: null
		}
	}

	render() {
		const { vectorW, vectorV, exampleVector } = this.state

		let vectors = [vectorW, vectorV]
		let vectorOptions = [
			{ color: BLUE, onMove: ({ newX, newY }) => this.setState({ vectorW: [[newX], [newY]] }) },
			{ color: PURPLE, onMove: ({ newX, newY }) => this.setState({ vectorV: [[newX], [newY]] }) },
		]

		if (exampleVector) {
			vectors = [vectorW, vectorV, exampleVector]
			vectorOptions = [
				{ color: SHADOW_BLUE },
				{ color: SHADOW_PURPLE },
				{ color: GREEN },
			]
		}

		return (
			<div className="span-container">
				<div className="flex">
					<SvgContainer size={GRID_SIZE}>
						<CoordinateGrid
							size={GRID_SIZE}
							gridSpacing={GRID_SPACING}
							showGridlines={true}
							showLabels={true}
						/>
						<SpanGrid
							size={GRID_SIZE}
							gridSpacing={GRID_SPACING}
							spanVectors={[vectorW, vectorV]}
							onEnterSpanDot={(exampleVector) => { this.setState({ exampleVector }) }}
							onLeaveSpanDot={() => { this.setState({ exampleVector: null }) }}
						/>
						<GeometricVectors
							size={GRID_SIZE}
							gridSpacing={GRID_SPACING}
							vectors={vectors}
							vectorOptions={vectorOptions}
						/>
					</SvgContainer>
					<div className="ml4 pt4">
						<div className="f3 flex items-center mb3">
							<span className="i">w</span> <span className="mh2">=</span> <SymbolicVector vector={vectorW} options={{ color: BLUE }} />
						</div>
						<div className="f3 flex items-center mb3">
							<span className="i">v</span> <span className="mh2">=</span> <SymbolicVector vector={vectorV} options={{ color: PURPLE }} />
						</div>
						{ifTrue(exampleVector, () => {
							const matrix = vectorsToMatrix(vectorW, vectorV)
							const determinant = determinant2By2Matrix(matrix)
							let scaleW, scaleV

							if (determinant === 0) {
								if (_.isEqual(matrix, [[0, 0], [0, 0]])) {
									scaleW = 0
									scaleV = 0
								} else {
									// I'm sure there is a better way to do this. :/
									scaleW = 0
									if (vectorV[0][0] !== 0) {
										scaleV = exampleVector[0][0] / vectorV[0][0]
									} else if (vectorV[1][0] !== 0) {
										scaleV = exampleVector[1][0] / vectorV[1][0]
									} else {
										scaleV = 0
									}
								}
							} else {
								[[scaleW], [scaleV]] = pointVectorMatrixMultiply(exampleVector, invert2By2Matrix(vectorsToMatrix(vectorW, vectorV)))
							}

							return (
								<div className="f3 flex items-center mb3">
									(<span style={{ color: GREEN }}>{_.floor(scaleW, 2)}</span><span className="mh2">*</span><span style={{ color: BLUE }}>w</span>)
									<span className="mh2">+</span>
									(<span style={{ color: GREEN }}>{_.floor(scaleV, 2)}</span><span className="mh2">*</span><span style={{ color: PURPLE }}>v</span>)
									<span className="mh2">=</span>
									<SymbolicVector vector={exampleVector} options={{ color: GREEN }} />
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default SpanContainer

import React, { Component } from 'react'
import SvgContainer from 'Components/svg/SvgContainer'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGrid from 'Components/svg/CoordinateGrid'
import GeometricVectors from 'Components/svg/GeometricVectors'
import { I_HAT, J_HAT } from 'Root/constants.js'
import Scrubber from 'Components/Scrubber'
import SpanGrid from 'Components/svg/SpanGrid'
import { vectorScale } from 'Utilities/general'
import { BLUE, SHADOW_BLUE, PURPLE, SHADOW_PURPLE, GREEN } from 'Root/constants/colors'
import './SpanContainer.css'

const GRID_SIZE = 420
const GRID_SPACING = 30

class SpanContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vectorW: [[3], [3]],
			vectorV: [[-2], [-2]],

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

		console.log('exampleVector', exampleVector)
		if (exampleVector) {
			vectors = [vectorW, vectorV, exampleVector]
			vectorOptions = [
				{ color: SHADOW_BLUE },
				{ color: SHADOW_PURPLE },
				{ color: GREEN },
			]
		}

		return (
			<div className="span-container mv4 ">
				<div className="flex items-center">
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
							onEnterSpanDot={(x, y) => { this.setState({ exampleVector: [[x], [y]] }) }}
							onLeaveSpanDot={() => { this.setState({ exampleVector: null }) }}
						/>
						<GeometricVectors
							size={GRID_SIZE}
							gridSpacing={GRID_SPACING}
							vectors={vectors}
							vectorOptions={vectorOptions}
						/>
					</SvgContainer>
					<div className="ml4">
						<div className="f3 flex items-center mb3">
							w <span className="mh2">=</span> <SymbolicVector vector={vectorW} options={{ color: BLUE }} />
						</div>
						<div className="f3 flex items-center mb3">
							v <span className="mh2">=</span> <SymbolicVector vector={vectorV} options={{ color: PURPLE }} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SpanContainer

import React, { Component } from 'react'
import SvgContainer from 'Components/svg/SvgContainer'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import { I_HAT, J_HAT } from 'Root/constants.js'
import Scrubber from 'Components/Scrubber'
import { BLUE, X_COMPONENT_COLOR, Y_COMPONENT_COLOR, X_COMPONENT_COLOR_SHADOW, Y_COMPONENT_COLOR_SHADOW } from 'Root/constants/colors'

class BasisVectorContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vector: [[-1], [-2]],
		}
	}
	// { color, onMove, hasMovingHandle, hasScalingHandle, onScale,  }
	render() {
		const { vector } = this.state
		return (
			<div className="vector-addition-container">
				<div className="flex items-center">
					<SvgContainer size={420}>
						<CoordinateGraph
							showLabels={false}
							vectors={[
								[[1], [0]],
								[[0], [1]],
								vector,
							]}
							vectorOptions={[
								{ color: X_COMPONENT_COLOR_SHADOW },
								{ color: Y_COMPONENT_COLOR_SHADOW },
								{ color: BLUE, showComponentVectors: true },
							]}
							size={420}
							gridSpacing={30}
						/>
					</SvgContainer>
					<div className="f1 ml4 flex items-center">
						<Scrubber
							className="interactive"
							onChange={(newVal) => this.setState({ vector: [[newVal], [vector[1][0]]] })}>
							{vector[0][0]}
						</Scrubber>
						<span className="mh2">*</span>
						<span style={{ color: X_COMPONENT_COLOR }}>{I_HAT}</span>
						<span className="mh3">+</span>
						<Scrubber
							className="interactive"
							onChange={(newVal) => this.setState({ vector: [[vector[0][0]], [newVal]] })}>
							{vector[1][0]}
						</Scrubber>
						<span className="mh2">*</span>
						<span style={{ color: Y_COMPONENT_COLOR }}>{J_HAT}</span>
						<span className="mh3">=</span>
						<SymbolicVector vector={vector} options={{ color: BLUE }} />
					</div>
				</div>
			</div>
		)
	}
}

export default BasisVectorContainer

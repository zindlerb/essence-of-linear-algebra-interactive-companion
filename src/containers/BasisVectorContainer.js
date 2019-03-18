import React, { Component } from 'react'
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
			<div className="vector-addition-container mv4 ">
				<div className="flex items-center">
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
					<div className="f1 ml4 flex items-center">
						<span
							style={{ color: X_COMPONENT_COLOR }}>
							(<Scrubber onChange={(newVal) => this.setState({ vector: [[newVal], [vector[1][0]]] })}>{vector[0][0]}</Scrubber>){I_HAT}
						</span>
						<span className="mh3">+</span>
						<span
							style={{ color: Y_COMPONENT_COLOR }}>
							(<Scrubber onChange={(newVal) => this.setState({ vector: [[vector[0][0]], [newVal]] })}>{vector[1][0]}</Scrubber>){J_HAT}
						</span>
						<span className="mh3">=</span>
						<SymbolicVector vector={vector} />
					</div>
				</div>
			</div>
		)
	}
}

export default BasisVectorContainer

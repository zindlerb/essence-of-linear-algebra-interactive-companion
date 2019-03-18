import React, { Component } from 'react'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import { I_HAT, J_HAT } from 'Root/constants.js'
import Scrubber from 'Components/Scrubber'
import { vectorScale } from 'Utilities/general'
import { BLUE, SHADOW_BLUE, PURPLE, SHADOW_PURPLE } from 'Root/constants/colors'

class BasisVectorContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vectorW: [[1], [2]],
			vectorV: [[3], [-1]],
			scaleW: -2,
			scaleV: -1,
		}
	}
	// { color, onMove, hasMovingHandle, hasScalingHandle, onScale,  }
	render() {
		const { vectorW, vectorV, scaleW, scaleV } = this.state

		return (
			<div className="vector-addition-container mv4 ">
				<div className="flex items-center">
					<CoordinateGraph
						showLabels={false}
						vectors={[
							vectorW,
							vectorV,
							vectorScale(vectorW, scaleW),
							vectorScale(vectorV, scaleV)
						]}
						vectorOptions={[
							{ color: SHADOW_BLUE },
							{ color: SHADOW_PURPLE },
							{ color: BLUE },
							{ color: PURPLE },
						]}
						size={420}
						gridSpacing={30}
					/>
					<div className="ml4">
						<div className="f3 flex items-center mb3">
							w <span className="mh2">=</span> <SymbolicVector vector={vectorW} options={{ color: BLUE }} />
						</div>
						<div className="f3 flex items-center mb3">
							v <span className="mh2">=</span> <SymbolicVector vector={vectorV} options={{ color: PURPLE }} />
						</div>
						<div className="f2 flex items-center">
							<span>
								(
									<Scrubber className="interactive" onChange={(scaleW) => this.setState({ scaleW })}>{scaleW}</Scrubber>
									<span className="mh2">*</span>
									<span style={{ color: BLUE }}>w</span>
								)
							</span>
							<span className="mh2">+</span>
							<span>
								(
									<Scrubber
										className="interactive"
										onChange={(scaleV) => this.setState({ scaleV })}>{scaleV}</Scrubber>
										<span className="mh2">*</span>
										<span style={{ color: PURPLE }}>v</span>
								)
							</span>
							<span className="mh2">=</span>
							<SymbolicVector vector={[[scaleW], [scaleV]]} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BasisVectorContainer

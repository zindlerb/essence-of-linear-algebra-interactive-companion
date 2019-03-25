import React, { Component } from 'react'
import { BLUE, X_COMPONENT_COLOR, Y_COMPONENT_COLOR } from 'Root/constants/colors'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import SvgContainer from 'Components/svg/SvgContainer'

class VectorIntroductionContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vector: [[1], [2]]
		}
	}
	// { color, onMove, hasMovingHandle, hasScalingHandle, onScale,  }
	render() {
		const { vector } = this.state
		return (
			<div className="flex">
				<SvgContainer size={420}>
					<CoordinateGraph
						showGridlines={false}
						vectors={[
							vector
						]}
						vectorOptions={[
							{
								color: BLUE,
								showComponentVectors: true,
								onMove: ({ newX, newY }) => {
									this.setState({
	                	vector: [
											[newX],
											[newY]
										]
									})
								}
							}
						]}
						size={420}
						gridSpacing={30}
					/>
				</SvgContainer>
				<SymbolicVector
					className="ph4 w4"
					vector={[
						[<tspan fill={X_COMPONENT_COLOR}>{vector[0][0]}</tspan>],
						[<tspan fill={Y_COMPONENT_COLOR}>{vector[1][0]}</tspan>]
					]}
					stringVector={vector}
				/>
			</div>
		)
	}
}

export default VectorIntroductionContainer

import React, { Component } from 'react'
import { BLUE, SHADOW_BLUE } from 'Root/constants/colors'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import { vectorScale } from 'Utilities/general'
import Scrubber from 'Components/Scrubber'
import './VectorScalingContainer.css'

class VectorScalingContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vector: [[1], [2]],
			scalar: 2,
		}
	}
	// { color, onMove, hasMovingHandle, hasScalingHandle, onScale,  }
	render() {
		const { vector, scalar } = this.state
		return (
			<div className="vector-scaling-container flex mv4 w-100 justify-between">
				<CoordinateGraph
					vectors={[
						vector,
						vectorScale(vector, scalar)
					]}
					vectorOptions={[
						{
							color: SHADOW_BLUE,
							onMove: ({ newX, newY }) => {
								this.setState({
                	vector: [
										[newX],
										[newY]
									]
								})
							}
						},
						{
							color: BLUE,
						}
					]}
					size={400}
					gridSpacing={20}
				/>
				<div className="flex items-center">
					<SymbolicVector
						className="ph2"
						vector={vector}
					/>
					<div className="operator mh2">*</div>
					<Scrubber
						className="scalar"
						onChange={(scalar) => this.setState({ scalar })}>
						{scalar}
					</Scrubber>
					<div className="operator mh2">=</div>
					<SymbolicVector
						className="ph2"
						vector={[
							[`${scalar} * ${vector[0][0]}`],
							[`${scalar} * ${vector[1][0]}`],
						]}
					/>
					<div className="operator mh2">=</div>
					<SymbolicVector
						className="ph2"
						vector={vectorScale(vector, scalar)}
					/>
				</div>
			</div>
		)
	}
}

export default VectorScalingContainer

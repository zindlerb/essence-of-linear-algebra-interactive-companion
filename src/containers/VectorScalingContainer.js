import React, { Component } from 'react'
import { BLUE } from 'Root/constants/colors'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import { vectorScale } from 'Utilities/general'

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
			<div className="flex mv4">
				<CoordinateGraph
					vectors={[
						vector
					]}
					vectorOptions={[
						{
							color: BLUE,
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
					size={400}
					gridSpacing={20}
				/>
				<div className="flex items-center">
					<SymbolicVector
						className="ph2"
						vector={vector}
					/>
					<div>*</div>
					<div>{scalar}</div>
					<div>=</div>
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

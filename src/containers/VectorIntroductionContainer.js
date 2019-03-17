import React, { Component } from 'react'
import { BLUE } from 'Root/constants/colors'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'

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
				<SymbolicVector
					className="ph4 w4"
					vector={vector}
				/>
			</div>
		)
	}
}

export default VectorIntroductionContainer

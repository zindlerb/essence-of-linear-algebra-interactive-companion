import React, { Component } from 'react'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'

class VectorIntroductionContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vector: [[1], [2]]
		}
	}

	render() {
		const { vector } = this.state
		return (
			<svg className="w-100 h-100">
				<SymbolicVector
					vector={vector}
					position={{
						x: 100,
						y: 100
					}}
				/>
				<CoordinateGraph
					vectorData={[
						{
							vector,
							onDrag: ({ dx, dy }, initialValues) => {
								this.setState({
                	vector: [
										[initialValues.vecX + dx],
										[initialValues.vecY - dy]
									]
								})
							}
						}
					]}
					size={300}
					gridSpacing={15}
					position={{ x: 100, y: 100 }}
				/>
			</svg>
		)
	}
}

export default VectorIntroductionContainer

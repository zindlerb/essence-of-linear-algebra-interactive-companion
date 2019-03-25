import React, { Component } from 'react'
import { BLUE, SHADOW_BLUE } from 'Root/constants/colors'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import { vectorScale } from 'Utilities/general'
import Scrubber from 'Components/Scrubber'
import SvgContainer from 'Components/svg/SvgContainer'
import './VectorScalingContainer.css'

class VectorScalingContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vector: [[1], [2]],
			scalar: 2,
		}
	}

	render() {
		const { vector, scalar } = this.state
		return (
			<div className="vector-scaling-container">
				<p>Here is the abstract equation for vector scaling.</p>
				<div className="flex items-center">
					<span className="f2 i">s</span>
					<div className="operator mh2">*</div>
					<SymbolicVector
						italic={true}
						vector={[['x'], ['y']]}
					/>
					<div className="operator mh2">=</div>
					<SymbolicVector
						vector={[
							[<tspan><tspan className="i">s</tspan> * <tspan className="i">x</tspan></tspan>],
							[<tspan><tspan className="i">s</tspan> * <tspan className="i">y</tspan></tspan>]
						]}
						stringVector={[
							['s * x'],
							['s * y']
						]}
					/>
				</div>
				<p>Below is an example of multiplying two vectors. The light blue is the vector before being scaled. The dark blue vector is after it has been scaled. You can drag the scalar with the dotted underline on the right.</p>
				<div className="flex w-100 justify-between">
					<SvgContainer size={400}>
						<CoordinateGraph
							vectors={[
								vectorScale(vector, scalar),
								vector,
							]}
							vectorOptions={[
								{
									color: BLUE,
								},
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
							]}
							size={400}
							gridSpacing={20}
						/>
					</SvgContainer>
					<div className="flex items-center">
						<Scrubber
							className="scalar interactive"
							onChange={(scalar) => this.setState({ scalar })}>
							{scalar}
						</Scrubber>
						<div className="operator mh2">*</div>
						<SymbolicVector
							options={{color: SHADOW_BLUE}}
							className="ph2"
							vector={vector}
						/>
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
							options={{color: BLUE}}
							className="ph2"
							vector={vectorScale(vector, scalar)}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default VectorScalingContainer

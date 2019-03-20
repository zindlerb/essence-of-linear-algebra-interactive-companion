import React, { Component } from 'react'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import SvgContainer from 'Components/svg/SvgContainer'
import { BLUE, GREEN, PURPLE } from 'Root/constants/colors'
import { vectorAdd } from 'Utilities/general'
import './VectorAdditionContainer.css'

const SYMBOLIC_VECTOR_SCALING = .7

class VectorAdditionContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	vectorA: [[1], [2]],
			vectorB: [[2], [-1]],
		}
	}
	// { color, onMove, hasMovingHandle, hasScalingHandle, onScale,  }
	render() {
		const { vectorA, vectorB } = this.state
		return (
			<div className="vector-addition-container mv4">
				<div className="mb2">
					<p>Here is the abstract equation for vector addition.</p>
					<div className="mt2 mb4 flex items-center">
						<SymbolicVector
							scale={SYMBOLIC_VECTOR_SCALING}
							vector={[
								['x1'],
								['y1']
							]}
						/>
						<div className="operator-small mh2">+</div>
						<SymbolicVector
							scale={SYMBOLIC_VECTOR_SCALING}
							vector={[
								['x2'],
								['y2']
							]}
						/>
						<div className="operator-small mh2">=</div>
						<SymbolicVector
							scale={SYMBOLIC_VECTOR_SCALING}
							vector={[
								['x1 + x2'],
								['y1 + y2']
							]}
						/>
					</div>
					<p>Below is an example of vector addtion in action. Drag the handles on the 2 vectors being added to change their position.</p>
					<div className="mt2 mb3 flex items-center">
						<SymbolicVector
							options={{ color: BLUE }}
							scale={SYMBOLIC_VECTOR_SCALING}
							vector={vectorA}
						/>
						<div className="operator-small mh2">+</div>
						<SymbolicVector
							options={{ color: GREEN }}
							scale={SYMBOLIC_VECTOR_SCALING}
							vector={vectorB}
						/>
						<div className="operator-small mh2">=</div>
						<SymbolicVector
							scale={SYMBOLIC_VECTOR_SCALING}
							vector={[
								[<tspan><tspan fill={BLUE}>{vectorA[0][0]}</tspan> + <tspan fill={GREEN}>{vectorB[0][0]}</tspan></tspan>],
								[<tspan><tspan fill={BLUE}>{vectorA[1][0]}</tspan> + <tspan fill={GREEN}>{vectorB[1][0]}</tspan></tspan>],
							]}
							stringVector={[
								[`${vectorA[0][0]} + ${vectorB[0][0]}`],
								[`${vectorA[1][0]} + ${vectorB[1][0]}`],
							]}
						/>
						<div className="operator-small mh2">=</div>
						<SymbolicVector
							options={{ color: PURPLE }}
							scale={SYMBOLIC_VECTOR_SCALING}
							vector={vectorAdd(vectorA, vectorB)}
						/>
					</div>
				</div>
				<div className="flex items-center">
					<SvgContainer size={210}>
						<CoordinateGraph
							showLabels={false}
							vectors={[
								vectorA
							]}
							vectorOptions={[
								{
									color: BLUE,
									onMove: ({ newX, newY }) => {
										this.setState({
	        	        	vectorA: [
												[newX],
												[newY]
											]
										})
									}
								}
							]}
							size={210}
							gridSpacing={15}
						/>
					</SvgContainer>
					<div className="operator mh3">+</div>
					<SvgContainer size={210}>
						<CoordinateGraph
							showLabels={false}
							vectors={[
								vectorB
							]}
							vectorOptions={[
								{
									color: GREEN,
									onMove: ({ newX, newY }) => {
										this.setState({
	        	        	vectorB: [
												[newX],
												[newY]
											]
										})
									}
								}
							]}
							size={210}
							gridSpacing={15}
						/>
					</SvgContainer>
					<div className="operator mh3">=</div>
					<SvgContainer size={210}>
						<CoordinateGraph
							showLabels={false}
							vectors={[
								vectorA,
								vectorB,
								vectorAdd(vectorA, vectorB)
							]}
							vectorOptions={[
								{ color: BLUE },
								{ color: GREEN, origin: { x: vectorA[0][0], y: vectorA[1][0] } },
								{ color: PURPLE }
							]}
							size={210}
							gridSpacing={15}
						/>
					</SvgContainer>
				</div>
			</div>
		)
	}
}

export default VectorAdditionContainer

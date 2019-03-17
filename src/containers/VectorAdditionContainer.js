import React, { Component } from 'react'
import SymbolicVector from 'Components/svg/SymbolicVector'
import CoordinateGraph from 'Components/svg/CoordinateGraph'
import { BLUE, GREEN, PURPLE } from 'Root/constants/colors'
import { vectorAdd } from 'Utilities/general'
import './VectorAdditionContainer.css'

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
					<div className="ma2 flex items-center">
						<SymbolicVector
							vector={[
								['x1'],
								['y1']
							]}
						/>
						<div className="operator-small mh2">+</div>
						<SymbolicVector
							vector={[
								['x2'],
								['y2']
							]}
						/>
						<div className="operator-small mh2">=</div>
						<SymbolicVector
							vector={[
								['x1 + x2'],
								['y1 + y2']
							]}
						/>
					</div>
					<div className="ma2 flex items-center">
						<SymbolicVector
							vector={vectorA}
						/>
						<div className="operator-small mh2">+</div>
						<SymbolicVector
							vector={vectorB}
						/>
						<div className="operator-small mh2">=</div>
						<SymbolicVector
							vector={[
								[`${vectorA[0][0]} + ${vectorB[0][0]}`],
								[`${vectorA[1][0]} + ${vectorB[1][0]}`],
							]}
						/>
						<div className="operator-small mh2">=</div>
						<SymbolicVector
							vector={vectorAdd(vectorA, vectorB)}
						/>
					</div>
				</div>
				<div className="flex items-center">
					<CoordinateGraph
						className="mh3"
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
					<div className="operator">+</div>
					<CoordinateGraph
						className="mh3"
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
					<div className="operator">=</div>
					<CoordinateGraph
						className="mh3"
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
				</div>
			</div>
		)
	}
}

export default VectorAdditionContainer

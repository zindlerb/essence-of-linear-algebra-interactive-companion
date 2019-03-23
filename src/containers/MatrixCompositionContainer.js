import React, { Component } from 'react'
import MatrixTransformationEditor from 'Components/MatrixTransformationEditor'
import SvgContainer from 'Components/svg/SvgContainer'
import CoordinateGrid from 'Components/svg/CoordinateGrid'

const GRID_SIZE = 420
const GRID_SPACING = 30

class MatrixCompositionContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	matrices: [
				[
					[1],
					[1]
				],
				[
					[1, 0],
					[0, 1]
				]
			],
			activeMatrixIndex: 0
		}
	}

	render() {
		const { matrices, activeMatrixIndex } = this.state

  	return (
			<div className="matrix-composition-container">
				<MatrixTransformationEditor
					className="mb3"
					activeMatrixIndex={activeMatrixIndex}
					matrices={matrices}
					onAdd={() => {
						this.setState({
							activeMatrixIndex: matrices.length,
	          	matrices: [
								...matrices,
								[
									[1, 0],
									[0, 1]
								]
							]
						})
					}}
					onDelete={() => {
						this.setState({
							activeMatrixIndex: matrices.length - 2,
	          	matrices: matrices.slice(0, matrices.length - 1)
						})
					}}
					onSelect={(activeMatrixIndex) => {
						this.setState({ activeMatrixIndex })
					}}
				/>
				<SvgContainer size={GRID_SIZE}>
					<CoordinateGrid
						size={GRID_SIZE}
						gridSpacing={GRID_SPACING}
						showGridlines={true}
						showLabels={true}
					/>
				</SvgContainer>
			</div>
		)
	}
}

// first: show only vector
// else:
//   show current vector - how to map the movements back
//     what matrix, applied to this vector gets this vector.
//   for prev vectors - compose matrices, do matrix multiplication

export default MatrixCompositionContainer

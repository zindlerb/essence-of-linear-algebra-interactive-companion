import _ from 'lodash'
import cx from 'classnames'
import React, { Component } from 'react'
import CoordinateGrid from 'Components/svg/CoordinateGrid'
import GeometricVectors from 'Components/svg/GeometricVectors'

class CoordinateGraph extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	isDragging: false
		}
	}

	render() {
		let { size, gridSpacing=5, vectors, vectorOptions=[], showGridlines=true, showLabels=true } = this.props
		const { isDragging } = this.state

		return (
			<g>
				<CoordinateGrid size={size} gridSpacing={gridSpacing} showGridlines={showGridlines} showLabels={showLabels} />
				<GeometricVectors size={size} gridSpacing={gridSpacing} vectors={vectors} vectorOptions={vectorOptions} />
			</g>
		)
	}
}

export default CoordinateGraph

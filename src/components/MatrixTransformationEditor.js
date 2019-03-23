import _ from 'lodash'
import React, { Component } from 'react'
import cx from 'classnames'
import SymbolicVector from 'Components/svg/SymbolicVector'
import './MatrixTransformationEditor.css'

const AddButton = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className="add-button flex items-center justify-center mv1 pointer relative u-unselectable">
			<span className="abs-center">+</span>
		</div>
	)
}

const DeleteButton = ({ onClick, disabled }) => {
	return (
		<div
			onClick={onClick}
			className={cx('delete-button flex items-center justify-center mv1 pointer relative u-unselectable', { disabled })}>
			<span className="abs-center">-</span>
		</div>
	)
}

class MatrixTransformationEditor extends Component {
	render() {
		const { matrices, activeMatrixIndex, onSelect, onAdd, onDelete, className=null } = this.props

		const matrixComponents = _.reverse(matrices.map((matrix, ind) => {
			return (
				<div
					className={cx('matrix-container pa3', { active: activeMatrixIndex === ind })}
					onClick={() => onSelect(ind)}>
					<SymbolicVector vector={matrix} />
				</div>
			)
		}))

		return (
			<div className={cx(className, 'matrix-transformation-editor flex')}>
				<div className="flex flex-column justify-center mh2">
					<AddButton onClick={onAdd} />
					<DeleteButton onClick={onDelete} disabled={matrices.length === 1} />
				</div>
				<div className="flex overflow-x-auto">
					{matrixComponents}
				</div>
			</div>
		)
	}
}

export default MatrixTransformationEditor

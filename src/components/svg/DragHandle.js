import cx from 'classnames'
import React, { Component } from 'react'
import dragManager from 'Utilities/drag_manager.js'
import { clamp } from 'Utilities/general'

class DragHandle extends Component {
	constructor(props) {
		super(props)
		this.state = {
    	isHovering: false
		}
	}

	render() {
  	const { onDrag, pos, initialValues, gridScale, onDragStart, onDragEnd, isDragging, graphSize, color } = this.props
		const { isHovering } = this.state
		return (
			<circle
				className={cx('drag-handle', { 'c-grab': !isDragging, 'c-grabbing': isDragging })}
				cx={pos.x}
				cy={pos.y}
				r={(isHovering || isDragging) ? 10 : 9}
				fill={color}
				stroke="white"
				strokeWidth={3}
				onMouseEnter={() => this.setState({ isHovering: true })}
				onMouseLeave={() => this.setState({ isHovering: false })}
				onMouseDown={e => {
					onDragStart()
					dragManager.start(e, {
						initialValues,
						onDrag(_, { dy, dx }) {
							onDrag({
								dx: Math.round(dx / gridScale),
								dy: Math.round(dy / gridScale),
							}, this.initialValues)
						},
						onEnd: onDragEnd
					})
				}}
			/>
		)
	}
}

export default DragHandle

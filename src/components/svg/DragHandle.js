import React from 'react'
import dragManager from 'Utilities/drag_manager.js'

const DragHandle = ({ onDrag, pos, r, initialValues, gridScale, onDragStart, onDragEnd }) => {
	return (
		<circle
			className="u-moveable"
			cx={pos.x}
			cy={pos.y}
			r={r || 5}
			fill="tomato"
			onMouseDown={e => {
				onDragStart()
				dragManager.start(e, {
					initialValues,
					onDrag(_, { dy, dx }) {
						onDrag({ dx: Math.round(dx / gridScale),  dy: Math.round(dy / gridScale) }, this.initialValues)
					},
					onEnd: onDragEnd
				})
			}}
		/>
	)
}

export default DragHandle

import React from 'react'
import dragManager from './drag_manager.js'

const DragHandle = ({ onDrag, pos, r, initialValues }) => {
	return (
		<circle
			className="u-moveable"
			cx={pos.x}
			cy={pos.y}
			r={r || 5}
			fill="tomato"
			onMouseDown={e => {
				dragManager.start(e, {
					initialValues,
					onDrag(_, { dy, dx }) {
						onDrag({ dy, dx }, this.initialValues)
					},
				})
			}}
		/>
	)
}

export default DragHandle

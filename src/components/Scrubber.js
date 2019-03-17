import React from 'react'
import dragManager from 'Utilities/drag_manager'
import cx from 'classnames'
import './Scrubber.css'

const Scrubber = ({ onChange, children, sensitivity, className }) => {
	sensitivity = sensitivity || 5;
	const value = children

	return (
		<span
			className={cx(className, 'scrubber u-unselectable')}
			onMouseDown={(e) => {
				dragManager.start(e, {
					originalValue: value,
					onDrag(e) {
						const newValue = this.originalValue + Math.round((e.clientX - this.originalX) / sensitivity)
						if (newValue !== this.originalValue) {
							onChange(newValue)
						}
					}
				})
			}}>
			{ value }
		</span>
	)
}

export default Scrubber

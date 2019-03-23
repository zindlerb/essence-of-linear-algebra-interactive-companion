import React from 'react'
import dragManager from 'Utilities/drag_manager'
import cx from 'classnames'
import './Scrubber.css'

const Scrubber = ({ onChange, children, className=null, sensitivity=5, isSvg=false }) => {
	const value = children
	const spanProps = {
    className: cx(className, 'scrubber u-unselectable'),
		onMouseDown: (e) => {
			dragManager.start(e, {
				originalValue: value,
				onDrag(e) {
					const newValue = this.originalValue + Math.round((e.clientX - this.originalX) / sensitivity)
					if (newValue !== this.originalValue) {
						onChange(newValue)
					}
				}
			})
		}
	}

	if (isSvg) {
		return <tspan {...spanProps}>{value}</tspan>
	} else {
  	return <span {...spanProps}>{value}</span>
	}
}

export default Scrubber

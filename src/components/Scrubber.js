import React from 'react'
import dragManager from 'Utilities/drag_manager'
import cx from 'classnames'
import globalStateService from 'Utilities/global_state_service'
import './Scrubber.css'

const Scrubber = ({ onChange, children, className=null, sensitivity=10, isSvg=false }) => {
	const value = children
	const spanProps = {
    className: cx(className, 'scrubber u-unselectable'),
		onMouseDown: (e) => {
			globalStateService.setState({ globalCursor: 'ew-resize' })
			dragManager.start(e, {
				consummated: true,
				originalValue: value,
				onDrag(e) {
					const newValue = this.originalValue + Math.round((e.clientX - this.originalX) / sensitivity)
					onChange(newValue)
				},
				onEnd() {
        	globalStateService.setState({ globalCursor: null })
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

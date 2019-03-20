import React from 'react'
import cx from 'classnames'

const SvgContainer = ({ size, children, className=null, padding=20 }) => {
	return (
		<svg className={cx(className, 'u-unselectable')} width={size + (2 * padding)} height={size + (2 * padding)}>
			<g transform={`translate(${padding}, ${padding})`}>
				{children}
			</g>
		</svg>
	)
}

export default SvgContainer

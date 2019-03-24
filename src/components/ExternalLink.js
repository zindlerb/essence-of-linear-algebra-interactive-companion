import React from 'react'
import './ExternalLink.css'

const ExternalLink = ({ href, children }) => (
	<a className="external-link" href={href} target="_blank">{children} <i className="fas fa-external-link-alt"/></a>
)

export default ExternalLink

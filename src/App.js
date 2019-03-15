import classnames from 'classnames'
import _ from 'lodash'
import $ from 'jquery'
import dragManager from './drag_manager.js'
import React, { Component } from 'react'
import './App.css'
import stateManager from './utilities/state_manager.js'
import { Vec, VectorGraphData } from './data_types.js'

import { isPointWithinRect, getRectMidpoint } from './utilities/general.js'

const genId = () =>
	Math.random()
		.toString()
		.replace('.', '')

window.isDebugMode = false

const GRAY = '#e0e0e0'
const DARK_GRAY = '#6d6d6d'

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

const VectorGraph = ({ graphData, size, gridSpacing }) => {
	size = size || 100
	const { pos, vecs } = graphData
	const coordinatePlaneOrigin = { x: size / 2, y: size / 2 }
	// should be able to do all this coordinate plane stuff with transforms
	gridSpacing = gridSpacing || 5

	let currentX = 0
	let currentY = 0

	let gridLines = []

	_.times(Math.floor(size / gridSpacing) + 1, ind => {
		let color = ind === Math.floor(size / gridSpacing) / 2 ? DARK_GRAY : GRAY
		gridLines.push(<line x1={currentX} y1={0} x2={currentX} y2={size} stroke={color} />)
		gridLines.push(<line x1={0} y1={currentY} x2={size} y2={currentY} stroke={color} />)
		currentX += gridSpacing
		currentY += gridSpacing
	})

	return (
		<g transform={`translate(${pos.x}, ${pos.y})`}>
			{gridLines}
			{vecs.map(({ x, y, color }, ind) => {
				const id = genId()
				return (
					<g>
						<defs>
							<marker
								id={id}
								markerWidth="10"
								markerHeight="10"
								refX="0"
								refY="3"
								orient="auto"
								markerUnits="strokeWidth"
								viewBox="0 0 20 20">
								<path d="M0,0 L0,6 L9,3 z" fill={color} />
							</marker>
						</defs>
						<line
							markerEnd={`url(#${id})`}
							x1={coordinatePlaneOrigin.x}
							y1={coordinatePlaneOrigin.y}
							x2={coordinatePlaneOrigin.x + x}
							y2={coordinatePlaneOrigin.y - y}
							stroke={color}
							strokeWidth={4}
						/>
						<DragHandle
							initialValues={{ x, y }}
							pos={{ x: coordinatePlaneOrigin.x + x, y: coordinatePlaneOrigin.y - y }}
							onDrag={({ dx, dy }, initialValues) => {
								stateManager.setState(state => {
									const vGraph = state.vectorGraphs.find(({ id }) => id === graphData.id)
									vGraph.vecs[ind].x = initialValues.x + dx
									vGraph.vecs[ind].y = initialValues.y - dy
								})
							}}
						/>
					</g>
				)
			})}
		</g>
	)
}

class App extends Component {
	constructor() {
		super()
		this.state = stateManager.state
	}

	componentDidMount() {
		stateManager.registerStateCallback(state => this.setState(state))
	}

	render() {
		return (
			<div className="App w-100 h-100">
				<svg className="w-100 h-100">
					{this.state.vectorGraphs.map(graphData => {
						return <VectorGraph graphData={graphData} size={300} gridSpacing={15} />
					})}
				</svg>
			</div>
		)
	}
}

export default App

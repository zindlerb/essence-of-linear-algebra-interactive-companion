import _ from 'lodash'
import React, { Component } from 'react'
import Node from './Node.js'
import * as dataTypes from '../data_types.js'
import { getTextBoxDimensions, getOffsetPos } from '../utilities/general.js'
import $ from 'jquery'
import Rect from './Rect.js'
import GraphContainer from './GraphContainer.js'
import stateManager from '../utilities/state_manager.js'
import {
	COLORS,
	ICON_SIZE,
	RANK_PADDING,
	ORDER_PADDING,
	TEXT_BOX_PADDING,
	EMPTY_RANK_HEIGHT,
	EMPTY_ORDER_WIDTH,
} from '../constants.js'
import AddNodeIcon from './icons/AddNodeIcon.js'

const TextEditField = ({ onChange, value, rect }) => {
	return (
		<textarea
			onClick={e => e.stopPropagation()}
			onChange={onChange}
			value={value}
			style={{
				position: 'absolute',
				left: rect.pos.x,
				top: rect.pos.y,
				width: rect.width,
				height: rect.height,
			}}
		/>
	)
}

const generateLayout = (graphContainer, uiState) => {
	const nodeData = []
	const root = graphContainer.pos

	let containerWidth
	let containerHeight
	let rankHeights = []
	let rankWidths = []
	let editComponent

	graphContainer.nodeMatrix.forEach((rank, rankInd) => {
		let rankWidth = 0
		let rankHeight = 0
		rank.forEach((nodeId, orderInd) => {
			const node = graphContainer.graph.getNode(nodeId)
			const { height, width } = getTextBoxDimensions(node.attrs.text, TEXT_BOX_PADDING)

			if (orderInd === 0) rankWidth += ORDER_PADDING
			rankWidth += width
			rankWidth += ORDER_PADDING

			rankHeight = Math.max(rankHeight, height + RANK_PADDING)
		})

		rankHeights[rankInd] = rankHeight
		rankWidths[rankInd] = rankWidth
	})

	containerHeight = rankHeights.reduce((a, b) => a + b, 0) + EMPTY_RANK_HEIGHT * 2
	containerWidth = rankWidths.reduce((a, b) => Math.max(a, b), 0) + EMPTY_ORDER_WIDTH * 2

	let rankY = EMPTY_RANK_HEIGHT
	graphContainer.nodeMatrix.forEach((rank, rankInd) => {
		let rankHeight = rankHeights[rankInd]
		let rankWidth = rankWidths[rankInd]
		const rankOffset = (containerWidth - rankWidth) / 2
		let rankX = rankOffset
		rank.forEach((nodeId, orderInd) => {
			const node = graphContainer.graph.getNode(nodeId)
			const { height, width } = getTextBoxDimensions(node.attrs.text, TEXT_BOX_PADDING)
			rankX += ORDER_PADDING
			const nodeDatum = {
				isEditing: uiState.editingNodeId === nodeId,
				attrs: { text: node.attrs.text, nodeId: node.id },
				shape: new dataTypes.Rect(
					new dataTypes.Pos(rankX, rankY + (rankHeight - height) / 2).add(root),
					width,
					height
				),
				rawNode: node,
			}

			nodeData.push(nodeDatum)

			rankX += width
		})

		rankY += rankHeight
	})

	let currentRankHeight = 0
	const rankDividers = [EMPTY_RANK_HEIGHT].concat(rankHeights).map(rankHeight => {
		currentRankHeight += rankHeight
		const lineComp = (
			<line
				x1={root.x}
				y1={root.y + currentRankHeight}
				x2={root.x + containerWidth}
				y2={root.y + currentRankHeight}
				stroke={COLORS.lightGrey}
				strokeDasharray="4"
			/>
		)
		return lineComp
	})

	currentRankHeight = 0
	let addNodeIcons = []
	const addIconAction = (rank, order) => () => {
		stateManager.setState(state => {
			state.graphContainers[graphContainer.id].addNodeToMatrix(rank, order, 'Insert Text')
		})
	}
	;[EMPTY_RANK_HEIGHT]
		.concat(rankHeights)
		.concat([EMPTY_RANK_HEIGHT])
		.forEach((rankHeight, ind, arr) => {
			let icon
			if (ind === 0) {
				addNodeIcons.push(
					<AddNodeIcon
						x={root.x + (containerWidth / 2 - ICON_SIZE / 2)}
						y={root.y + (rankHeight / 2 - ICON_SIZE / 2)}
						size={ICON_SIZE}
						onClick={() => {
							stateManager.setState(state => {
								state.graphContainers[graphContainer.id].prependNodeToMatrix('Insert Text')
							})
						}}
					/>
				)
			} else if (ind === arr.length - 1) {
				addNodeIcons.push(
					<AddNodeIcon
						x={root.x + (containerWidth / 2 - ICON_SIZE / 2)}
						y={root.y + currentRankHeight + (rankHeight / 2 - ICON_SIZE / 2)}
						size={ICON_SIZE}
						onClick={addIconAction(ind, 0)}
					/>
				)
			} else {
				addNodeIcons = addNodeIcons.concat([
					<AddNodeIcon
						x={root.x + ICON_SIZE}
						y={root.y + currentRankHeight + (rankHeight / 2 - ICON_SIZE / 2)}
						size={ICON_SIZE}
						onClick={addIconAction(ind - 1, 0)}
					/>,
					<AddNodeIcon
						x={root.x + (containerWidth - ICON_SIZE * 2)}
						y={root.y + currentRankHeight + (rankHeight / 2 - ICON_SIZE / 2)}
						size={ICON_SIZE}
						onClick={addIconAction(ind - 1, graphContainer.nodeMatrix[ind - 1].length - 1)}
					/>,
				])
			}

			currentRankHeight += rankHeight
		})

	const nodeComponents = nodeData.map(({ shape, attrs, isEditing }) => {
		return (
			<Node
				isEditing={isEditing}
				rect={shape}
				text={attrs.text}
				padding={TEXT_BOX_PADDING}
				nodeId={attrs.nodeId}
			/>
		)
	})

	const containerComponent = (
		<GraphContainer
			rect={new dataTypes.Rect(root, containerWidth, containerHeight)}
			graphContainerId={graphContainer.id}>
			{addNodeIcons}
			{rankDividers}
			{nodeComponents}
		</GraphContainer>
	)

	const editDatum = nodeData.find(({ isEditing }) => isEditing)
	if (editDatum) {
		editComponent = (
			<TextEditField
				onChange={e => {
					editDatum.rawNode.attrs.text = e.target.value
					stateManager.triggerRender()
				}}
				rect={editDatum.shape}
				value={editDatum.attrs.text}
			/>
		)
	}

	return {
		containerHeight,
		containerWidth,
		components: [containerComponent],
		domComponents: [editComponent],
	}
}

const AddContainerCursor = ({ pos }) => {
	const width = 50
	const height = 30
	const bluePlusSize = 20
	pos = pos.add(new dataTypes.Pos(-10, -10))
	const offset = 5

	const bluePlusPos = pos.add(new dataTypes.Pos(width / 2 - offset, height / 2 + offset))

	const bluePlus = (
		<text fontSize={bluePlusSize} x={bluePlusPos.x} y={bluePlusPos.y} fill={COLORS.blue}>
			+
		</text>
	)

	return (
		<g>
			<Rect rect={new dataTypes.Rect(pos, width, height)} borderColor={COLORS.lightGrey} />
			{bluePlus}
		</g>
	)
}

export default class Renderer extends Component {
	deSelect() {
		stateManager.setState(state => {
			state.uiState.editingNodeId = null
		})
	}

	render() {
		let allDomNodes = []
		let allShapes = []
		let addContainerCursor

		_.toArray(this.props.graphContainers).forEach(graphContainer => {
			const { components, domComponents } = generateLayout(graphContainer, this.props.uiState)

			allDomNodes = allDomNodes.concat(domComponents)
			allShapes = allShapes.concat(components)
		})

		const cursorStateType = _.get(this.props.uiState, 'cursorState.stateType')
		const cursorStatePos = _.get(this.props.uiState, 'cursorState.pos')

		if (cursorStateType === 'container') {
			addContainerCursor = <AddContainerCursor pos={cursorStatePos} />
		}

		return (
			<div
				className="w-100 h-100"
				onClick={e => {
					const cursorStateType = _.get(this.props.uiState, 'cursorState.stateType')
					if (cursorStateType === 'container') {
						stateManager.setState(state => {
							const graphContainer = new dataTypes.GraphContainer(getOffsetPos(e, true))
							state.graphContainers[graphContainer.id] = graphContainer
						})
					}
					this.deSelect()
				}}>
				{allDomNodes}
				<svg
					className="renderer w-100 h-100 db"
					onMouseMove={e => {
						stateManager.state.uiState.cursorState = {
							stateType: 'container',
							pos: getOffsetPos(e, true),
						}
						stateManager.triggerRender()
						e.stopPropagation()
					}}>
					{addContainerCursor}
					{allShapes}
				</svg>
			</div>
		)
	}
}

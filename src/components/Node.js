import React, { Component } from 'react';
import Rect from './Rect.js'
import TextBox from './TextBox.js'
import {Pos} from '../data_types.js'
import numeric from 'numeric'
import stateManager from '../utilities/state_manager.js'

function pointOnRectEdgeAtPercentage(percentageAlongEdge, rect) {
	const {pos, width, height} = rect
	const {x, y} = pos

	const perimiter = (2 * width) + (2 * height)

  const topSectionPercentage = width / perimiter
  const bottomSectionPercentage = width / perimiter
  const leftSectionPercentage = height / perimiter
  const rightSectionPercentage = height / perimiter

	const topPercentageTotal = width / perimiter
	const rightPercentageTotal = (width + height) / perimiter
	const bottomPercentageTotal = ((width * 2) + height) / perimiter

  const percentageAlongTop = percentageAlongEdge / topSectionPercentage
  const percentageAlongRight = (percentageAlongEdge - topPercentageTotal) / rightSectionPercentage
  const percentageAlongBottom = (percentageAlongEdge - rightPercentageTotal) / bottomSectionPercentage
  const percentageAlongLeft = (percentageAlongEdge - bottomPercentageTotal) / leftSectionPercentage

	if (percentageAlongEdge <= topPercentageTotal) { // Top
		return new Pos(x + (width * percentageAlongTop), y)
	} else if (percentageAlongEdge <= rightPercentageTotal) { // Right
		return new Pos(x + width, y + (height * percentageAlongRight))
	} else if (percentageAlongEdge <= bottomPercentageTotal) { // Bottom
		return new Pos((x + width) - (width * percentageAlongBottom), y + height)
	} else { // Left
		return new Pos(x, (y + height) - (height * percentageAlongLeft))
	}
}

class Constraint {
  constructor(errorFuncCreator, initialArguments) {
    const framesPerSecond = 120
    this.errorFuncCreator = errorFuncCreator
    this.prevSolutions = initialArguments

    this.solve = _.debounce((otherArgs, solutionCallback) => {
      const result = numeric.uncmin(errorFuncCreator(otherArgs), this.prevSolutions).solution
      this.prevSolutions = result
      solutionCallback(result)
    }, 1000/framesPerSecond)
  }
}

class Node extends Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      isHoveringBorder: false,
      closestPointToPointOnRect: new Constraint(({closestPoint, rect}) => {
        return ([percentageAlongEdge]) => {
	        const pos = pointOnRectEdgeAtPercentage(percentageAlongEdge, rect)
	        return Math.pow(closestPoint.distanceTo(pos), 2)
        }
      }, [.1])
    }
  }

  onEnterOuterHitbox = (e) => {
    this.setState({
      isHoveringBorder: true,
    })
  }

  onExitOuterHitbox = (e) => {
    this.setState({
      isHoveringBorder: false,
    })
  }

  onEnterInnerHitbox = (e) => {
    this.setState({
      isHoveringBorder: false,
    })
  }

  onBorderHitboxMove = (e) => {
    const mousePos = new Pos(e.clientX, e.clientY)
    const result = this.state.closestPointToPointOnRect.solve({
      closestPoint: mousePos,
      rect: this.props.rect
    }, ([percentageAlongRect]) => {
      this.setState({ percentageAlongRect })
    })
  }

  render() {
    const borderHitboxWidth = 15
    let borderDot
    let textBox

		if (this.state.isHoveringBorder && this.state.percentageAlongRect) {
      const pointPos = pointOnRectEdgeAtPercentage(this.state.percentageAlongRect, this.props.rect)
			borderDot = <circle cx={pointPos.x} cy={pointPos.y} r="4" fill="tomato" />
		}

    return (
      <g onDoubleClick={(e) => {
          stateManager.setState(({uiState}) => uiState.editingNodeId = this.props.nodeId)
          e.stopPropagation()
      }}
      onClick={(e) => e.stopPropagation()}>
        {borderDot}
        <TextBox
          isEditing={this.props.isEditing}
          onBlur={this.props.onBlur}
          rect={this.props.rect}
          text={this.props.text}
          padding={this.props.padding} />
        <Rect
          onMouseEnter={this.onEnterOuterHitbox}
          onMouseLeave={this.onExitOuterHitbox}
          onMouseMove={this.onBorderHitboxMove}
          rect={this.props.rect.expand(borderHitboxWidth/2)}
        />
        <Rect
          onMouseEnter={this.onEnterInnerHitbox}
          rect={this.props.rect.shrink(borderHitboxWidth/2)}
        />
      </g>
    )
  }
}

export default Node

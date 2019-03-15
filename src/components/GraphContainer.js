import React from 'react';
import dragManager from '../drag_manager.js'
import stateManager from '../utilities/state_manager.js'
import MoveArrowIcon from './icons/MoveArrowIcon.js'
import DeleteIcon from './icons/DeleteIcon.js'
import Rect from './Rect.js'
import {Pos} from '../data_types.js'
import {COLORS} from '../constants.js'

const GraphContainer = ({rect, graphContainerId, children}) => {
  const moveIconSize = 25
  const moveIconSpacing = 5

  const containerRect = rect.expand(moveIconSize + moveIconSpacing + 10)

  return (
    <g
      onMouseMove={(e) => {
          stateManager.setState((state) => {
            state.uiState.cursorState = null
          })

          e.stopPropagation()
      }}>
      <Rect rect={containerRect} backgroundColor="transparent"/>
      <MoveArrowIcon
        onMouseDown={(e) => dragManager.start(e, {
            rootX: rect.pos.x,
            rootY: rect.pos.y,
            onDrag(_, {dx, dy}) {
              stateManager.setState((state) => {
                state.graphContainers[graphContainerId].pos = new Pos(this.rootX + dx, this.rootY + dy)
              })
            }
        })}
        x={rect.pos.x}
        y={rect.pos.y - moveIconSize - moveIconSpacing}
        size={moveIconSize}
      />
      <DeleteIcon
        onClick={(e) => {
            stateManager.setState((state) => {
              delete state.graphContainers[graphContainerId]
            })
            e.preventDefault()
        }}
        x={rect.pos.x + moveIconSize}
        y={rect.pos.y - moveIconSize - moveIconSpacing}
        size={moveIconSize}
      />
      <Rect
        rect={rect}
        borderColor={COLORS.lightGrey}
      />
      {children}
    </g>
  )
}

export default GraphContainer

import React, { Component } from 'react';
import {getRandomColor} from '../utilities/general.js'

class Rect extends Component {
  constructor() {
    super()
    this.state = {
      isHovered: false,
      debugColor: getRandomColor()
    }
  }

  render() {
    const rectProps = {
      onClick: this.props.onClick,
      onMouseLeave: (e) => {
        this.setState({isHovered: false})

        if (this.props.onMouseLeave) {
          this.props.onMouseLeave(e)
        }
      },
      onMouseEnter: (e) => {
        this.setState({isHovered: true})

        if (this.props.onMouseEnter) {
          this.props.onMouseEnter(e)
        }
      },
      onMouseMove: this.props.onMouseMove,
      stroke: this.props.borderColor,
      fill: this.props.backgroundColor || 'transparent',
      x: this.props.rect.pos.x,
      y: this.props.rect.pos.y,
      width: this.props.rect.width,
      height: this.props.rect.height
    }

    if (this.props.isDebug || window.isDebugMode) {
      Object.assign(rectProps, {
        fill: this.state.debugColor,
        fillOpacity: this.state.isHovered ? 0.5 : 0.8
      })
    }

    return <rect {...rectProps}/>
  }
}

export default Rect

import React, { Component } from 'react';

export default class TextBox extends Component {
  constructor() {
    super()
    this.state = { textElement: undefined }
  }

  render() {
    let {rect, text, borderColor, padding, lineHeight, isEditing} = this.props
    const {x, y} = rect.pos
    let textComponent

    lineHeight = lineHeight || "1.2em";
    padding = padding || 0;
    borderColor = borderColor || 'black';

    if (!isEditing) {
      textComponent = (
        <g transform={`translate(${x + padding}, ${y + padding})`}>
          <text x="0" y="0">
            {
              text.split('\n').map(
                (line) => <tspan x="0" dy={lineHeight}>{line}</tspan>
              )
            }
          </text>
        </g>
      )
    }

    return (
      <g>
        <rect
          stroke={borderColor}
          fill="transparent"
          x={x}
          y={y}
          width={rect.width}
          height={rect.height} />
        {textComponent}
      </g>
    )
  }
}

import React from 'react';

const MoveArrowIcon = ({size, x, y, ...otherProps}) => {
  return (
    <image
      class="u-moveable"
      x={x - 3}
      y={y - 3}
      width={size}
      height={size}
      href="/move_icon.png"
      {...otherProps}
    />
  )
}

export default MoveArrowIcon

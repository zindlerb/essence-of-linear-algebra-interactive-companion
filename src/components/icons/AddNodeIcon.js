import React from 'react';

const AddNodeIcon = ({size, x, y, ...otherProps}) => {
  return (
    <image
      class="u-clickable"
      x={x - 3}
      y={y - 3}
      width={size}
      height={size}
      href="/add_node.png"
      {...otherProps}
    />
  )
}

export default AddNodeIcon

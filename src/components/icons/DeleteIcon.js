import React from 'react';

const DeleteIcon = ({size, x, y, ...otherProps}) => {
  return (
    <image
      class="u-clickable"
      x={x - 3}
      y={y - 3}
      width={size}
      height={size}
      href="/delete_icon.png"
      {...otherProps}
    />
  )
}

export default DeleteIcon

import React, { memo } from 'react'

import classes from './ImgContainer.module.scss'

const ImgContainer = ({ children, height = '350px', width = '100%' }) => {
  return (
    <div
      style={{ height, width }}
      className={`${classes.ImgContainer} bg-light`}>
      {children}
    </div>
  )
}

export default memo(ImgContainer)

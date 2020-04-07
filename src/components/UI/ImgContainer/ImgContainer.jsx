import React from 'react'

import classes from './ImgContainer.module.scss'

const ImgContainer = ({ children, height = '350px' }) => {
  return (
    <div style={{ height }} className={`${classes.ImgContainer} bg-light`}>
      {children}
    </div>
  )
}

export default ImgContainer

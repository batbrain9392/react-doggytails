import React from 'react'

const ImgContainer = ({ children, height = '350px' }) => {
  return (
    <div style={{ height }} className='bg-light ImgContainer'>
      {children}
    </div>
  )
}

export default ImgContainer

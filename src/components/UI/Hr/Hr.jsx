import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import { ReactComponent as Star } from '../../../assets/icons/star.svg'

const Hr = ({ children, width, loading }) => {
  return (
    <div className='Hr mb-5'>
      {children ? children : <hr className='m-0' style={{ width }} />}
      <div className='Svg'>
        {loading ? (
          <Spinner animation='grow' variant='secondary' className='m-auto' />
        ) : (
          <>
            <Star />
            <Star />
            <Star />
          </>
        )}
      </div>
      <hr className='m-0' />
    </div>
  )
}

export default Hr

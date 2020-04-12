import React, { memo } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import { ReactComponent as Star } from '../../../assets/icons/star.svg'

import classes from './Hr.module.scss'

const Hr = ({ children, width, loading }) => {
  return (
    <div className={`${classes.grid} mb-5`}>
      {children ? children : <hr style={{ width }} />}
      <div className={classes.svgContainer}>
        {loading ? (
          <Spinner animation='grow' variant='secondary' className='m-auto' />
        ) : (
          [...new Array(3)].map((_, i) => (
            <Star key={i} className={classes.Svg} />
          ))
        )}
      </div>
      <hr />
    </div>
  )
}

export default memo(Hr)

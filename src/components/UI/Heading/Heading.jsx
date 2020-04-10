import React, { memo } from 'react'

import Hr from '../Hr/Hr'

import classes from './Heading.module.scss'

const Heading = ({ children, loading }) => {
  return (
    <Hr loading={loading}>
      <h1 className={`${classes.h1} font-weight-bold`}>{children}</h1>
    </Hr>
  )
}

export default memo(Heading)

import React from 'react'

import Hr from '../Hr/Hr'

const Heading = ({ children, loading }) => {
  return (
    <Hr loading={loading}>
      <h1 className='font-weight-bold'>{children}</h1>
    </Hr>
  )
}

export default Heading

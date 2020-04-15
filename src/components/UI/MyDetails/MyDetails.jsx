import React, { memo } from 'react'

const MyDetails = ({ userDetails }) => {
  return (
    <div className='mb-5'>
      <h4 className='mb-4'>Details</h4>
      <p>
        <strong>Name : </strong> {userDetails.name}
      </p>
      {userDetails.email && (
        <p>
          <strong>Email : </strong> {userDetails.email}
        </p>
      )}
      {userDetails.phone && (
        <p>
          <strong>Phone : </strong> {userDetails.phone}
        </p>
      )}
    </div>
  )
}

export default memo(MyDetails)

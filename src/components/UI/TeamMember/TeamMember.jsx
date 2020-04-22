import React, { memo } from 'react'
import Image from 'react-bootstrap/Image'

const TeamMember = ({ member }) => {
  return (
    <div className='text-center'>
      <Image src={member.img} alt='img' roundedCircle />
      <div className='font-weight-bold mt-3'>{member.name}</div>
      <div className='font-weight-light mb-1'>{member.designation}</div>
      {member.quote}
    </div>
  )
}

export default memo(TeamMember)

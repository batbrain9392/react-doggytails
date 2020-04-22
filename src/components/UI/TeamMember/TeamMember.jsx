import React, { memo } from 'react'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TeamMember = ({ member }) => {
  return (
    <div className='text-center'>
      <Image src={member.img} alt='img' roundedCircle />
      <div className='font-weight-bold mt-3'>{member.name}</div>
      <div className='mb-2'>{member.designation}</div>
      <div className='font-italic font-weight-lighter'>
        <FontAwesomeIcon
          icon='quote-right'
          size='lg'
          className='text-primary'
        />
        <span className='ml-2'>{member.quote}</span>
      </div>
    </div>
  )
}

export default memo(TeamMember)

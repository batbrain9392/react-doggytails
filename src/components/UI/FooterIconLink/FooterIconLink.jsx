import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FooterIconLink = ({ children, icon, type }) => {
  return (
    <div className='FooterIconLink'>
      <span>
        <FontAwesomeIcon icon={[`fa${type}`, icon]} size='lg' />
      </span>
      <span>{children}</span>
    </div>
  )
}

export default FooterIconLink

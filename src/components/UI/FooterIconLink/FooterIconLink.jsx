import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './FooterIconLink.module.scss'

const FooterIconLink = ({ children, icon, type, href }) => {
  return (
    <a
      href={href}
      className={`${classes.FooterIconLink} text-white`}
      target='_blank'
      rel='noopener noreferrer'>
      <span>
        <FontAwesomeIcon icon={[`fa${type}`, icon]} size='lg' />
      </span>
      <span>{children}</span>
    </a>
  )
}

export default memo(FooterIconLink)

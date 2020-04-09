import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './FooterIconLink.module.scss'

const FooterIconLink = ({ children, icon, type }) => {
  return (
    <div className={classes.FooterIconLink}>
      <span>
        <FontAwesomeIcon icon={[`fa${type}`, icon]} size='lg' />
      </span>
      <span>{children}</span>
    </div>
  )
}

export default memo(FooterIconLink)

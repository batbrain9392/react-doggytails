import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const OverlayTooltip = ({ text, children }) => {
  const delay = 100

  return (
    <OverlayTrigger
      placement='top'
      delay={{ show: delay, hide: delay }}
      overlay={<Tooltip id='tooltip-top'>{text}</Tooltip>}>
      {children}
    </OverlayTrigger>
  )
}

export default OverlayTooltip

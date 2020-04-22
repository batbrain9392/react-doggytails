import React, { memo } from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TeamAchievement = ({ achievement }) => {
  return (
    <Card className='text-center h-100'>
      <Card.Body>
        <FontAwesomeIcon
          icon={achievement.icon}
          size='4x'
          className='text-primary mt-3'
        />
        <h1 className='display-4 mt-4 mb-2'>{achievement.title}</h1>
        {achievement.desc}
      </Card.Body>
    </Card>
  )
}

export default memo(TeamAchievement)

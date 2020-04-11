import React, { memo } from 'react'
import Container from 'react-bootstrap/Container'

import classes from './Events.module.scss'

const Events = () => {
  return (
    <div className={classes.wrapper}>
      <Container>
        <h3 className='home-font mb-4'>Events</h3>
        <div className='mb-3'>
          <div>
            <span className='text-secondary'>
              Pet Owner meet and greet session - 04/25/2020, 1 pm
            </span>{' '}
            <span className='text-danger'>[Online only]</span>
          </div>
          Zoom dial-in details will be provided soon. Keep an eye on this space
          to learn more. ​
        </div>
        <div>
          <div>
            <span className='text-secondary'>
              National Adoption Event at Fisherman's Wharf - 01/12/2020, 11 am
            </span>{' '}
            <span className='text-danger'>[Expired]</span>
          </div>
          Meet dogs up for adoption at Fisherman's Wharf this Friday. See you
          soon. No pre-registration needed.
        </div>
      </Container>
    </div>
  )
}

export default memo(Events)

import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import MyPetCard from '../../MyPetCard/MyPetCard'

import classes from './MyPets.module.scss'

const MyPets = ({ pets, ...props }) => {
  const header = props.isAdoption ? 'Adoptions' : 'Donations'
  const noPets = (
    <>
      <p>You haven't {props.isAdoption ? 'adopted' : 'donated'} any yet.</p>
      <Link to={`/${props.isAdoption ? 'adopt' : 'donate'}`}>
        {props.isAdoption ? 'Adopt' : 'Donate'} now
      </Link>
    </>
  )

  return (
    <>
      <h4 className='mb-4'>{header}</h4>
      {!pets.length ? (
        noPets
      ) : (
        <div className={classes.cardsGrid}>
          {pets.map((pet) => (
            <MyPetCard key={pet.id} pet={pet} {...props} />
          ))}
        </div>
      )}
    </>
  )
}

export default memo(MyPets)

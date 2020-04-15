import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'

import MyPetCard from '../../MyPetCard/MyPetCard'

import classes from './MyPets.module.scss'

const MyPets = ({ pets, isAdoption, onEdit, onDelete }) => {
  const header = isAdoption ? 'Adoptions' : 'Donations'
  const noPets = (
    <>
      <p>You haven't {isAdoption ? 'adopted' : 'donated'} any yet.</p>
      <Link to={`/${isAdoption ? 'adopt' : 'donate'}`}>
        {isAdoption ? 'Adopt' : 'Donate'} now
      </Link>
    </>
  )

  return (
    <>
      <h4 className='mb-4'>
        {header} <Badge variant='secondary'>{pets.length}</Badge>
      </h4>
      {!pets.length ? (
        noPets
      ) : (
        <div className={classes.cardsGrid}>
          {pets.map((pet) => (
            <MyPetCard
              key={pet.id}
              pet={pet}
              isAdoption={isAdoption}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default memo(MyPets)

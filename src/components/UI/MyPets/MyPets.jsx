import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'

import MyPetCard from '../../MyPetCard/MyPetCard'

import classes from './MyPets.module.scss'

const MyPets = ({ pets, type, onEdit, onDelete }) => {
  const isAdopted = type === 'adopted'
  const header = isAdopted ? 'Adoptions' : 'Donations'
  const noPets = (
    <>
      <p>You haven't {isAdopted ? 'adopted' : 'donated'} any yet.</p>
      <Link to={`/${isAdopted ? 'adopt' : 'donate'}`}>
        {isAdopted ? 'Adopt' : 'Donate'} now
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
              isAdopted={isAdopted}
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

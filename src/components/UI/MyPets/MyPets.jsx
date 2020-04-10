import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import MyPetCard from '../../MyPetCard/MyPetCard'

import classes from './MyPets.module.scss'

const MyPets = ({ loading, pets, type, onEdit, onDelete }) => {
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
      <h4 className='mb-4'>My {header}</h4>
      {!loading &&
        (!pets.length ? (
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
        ))}
    </>
  )
}

const donated = 'donated'
const adopted = 'adopted'
MyPets.propTypes = {
  loading: PropTypes.bool.isRequired,
  pets: PropTypes.array.isRequired,
  type: PropTypes.oneOf([adopted, donated]).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
}

export default MyPets

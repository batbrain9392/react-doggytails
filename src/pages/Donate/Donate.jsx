import React, { useState, useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import AuthContext from '../../lib/auth-context'
import pet from '../../http/pet'

import TextInput from '../../components/UI/TextInput/TextInput'

const Donate = () => {
  const { token, userId } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const initialValues = {
    name: 'name',
    breed: 'breed',
    age: 'age',
    vaccination: 'vaccination',
    personality: 'personality',
    foodPreference: 'foodPreference',
    dateAvailable: 'dateAvailable',
    location: 'location',
    description: 'description',
  }
  const validationSchema = Yup.object({
    // email: Yup.string()
    //   .email('Invalid email addresss`')
    //   .required('Required'),
    // password: Yup.string()
    //   .min(6, 'Password has to be longer than 6 characters')
    //   .required('Required'),
  })

  const submitHandler = async formValues => {
    try {
      setError(null)
      const data = await pet.add({ ...formValues, userId }, token)
      console.log(data)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <h3>Donate</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}>
        {({ isValid, isSubmitting }) => (
          <Form>
            <TextInput label='Name' name='name' type='text' />
            <TextInput label='Breed' name='breed' type='text' />
            <TextInput label='Age' name='age' type='text' />
            <TextInput label='Vaccination' name='vaccination' type='text' />
            <TextInput label='Personality' name='personality' type='text' />
            <TextInput
              label='Food Preference'
              name='foodPreference'
              type='text'
            />
            <TextInput
              label='Date Available'
              name='dateAvailable'
              type='text'
            />
            <TextInput label='Location' name='location' type='text' />
            <TextInput label='Description' name='description' type='text' />
            <button type='submit' disabled={!isValid}>
              submit
            </button>
            {isSubmitting && <p>Submitting...</p>}
            {error && <p>{error}</p>}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Donate

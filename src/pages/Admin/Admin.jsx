import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Heading from '../../components/UI/Heading/Heading'
import AdminDataPets from '../../components/AdminDataPets/AdminDataPets'
import AdminDataUsers from '../../components/AdminDataUsers/AdminDataUsers'

const Admin = () => {
  const [loadingPets, setLoadingPets] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const type = {
    pets: 'Pets',
    users: 'Users',
  }

  return (
    <>
      <Heading loading={loadingPets || loadingUsers}>Admin</Heading>
      <Tabs defaultActiveKey={type.pets} id='admin-data'>
        <Tab eventKey={type.pets} title={type.pets}>
          <AdminDataPets loading={loadingPets} setLoading={setLoadingPets} />
        </Tab>
        <Tab eventKey={type.users} title={type.users}>
          <AdminDataUsers loading={loadingUsers} setLoading={setLoadingUsers} />
        </Tab>
      </Tabs>
    </>
  )
}

export default Admin

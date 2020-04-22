import React, { useState, useContext, useCallback, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import AuthContext from '../../lib/auth-context'
import messageService from '../../http/message'
import petService from '../../http/pet'
import userService from '../../http/user'

import Heading from '../../components/UI/Heading/Heading'
import MyDetails from '../../components/UI/MyDetails/MyDetails'
import Hr from '../../components/UI/Hr/Hr'
import AdminDataPanel from '../../components/UI/AdminDataPanel/AdminDataPanel'

const Admin = () => {
  const [messages, setMessages] = useState([])
  const [loadingMessages, setloadingMessages] = useState(true)
  const [pets, setPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(true)
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const { token, userDetails } = useContext(AuthContext)

  const fetchAllMessages = useCallback(async () => {
    try {
      const data = await messageService.fetchAll(token)
      setMessages(data)
    } catch (error) {
      console.log(error)
    } finally {
      setloadingMessages(false)
    }
  }, [])

  const fetchAllPets = useCallback(async () => {
    try {
      const data = await petService.fetchAll()
      setPets(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingPets(false)
    }
  }, [])

  const fetchAllUsers = useCallback(async () => {
    try {
      const data = await userService.fetchAll(token)
      setUsers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingUsers(false)
    }
  }, [token])

  useEffect(() => {
    fetchAllMessages()
    fetchAllPets()
    fetchAllUsers()
  }, [fetchAllMessages, fetchAllPets, fetchAllUsers])

  const type = {
    messages: 'Messages',
    pets: 'Pets',
    users: 'Users',
  }

  return (
    <>
      <Heading>Admin</Heading>
      <MyDetails userDetails={userDetails} />
      <Hr
        width='122px'
        loading={loadingMessages || loadingPets || loadingUsers}
      />
      <h4 className='mb-4'>Database Snapshot</h4>
      <Tabs defaultActiveKey={type.messages} id='admin-data'>
        <Tab eventKey={type.messages} title={type.messages}>
          {!loadingMessages && <AdminDataPanel data={messages} />}
        </Tab>
        <Tab eventKey={type.pets} title={type.pets}>
          {!loadingPets && <AdminDataPanel data={pets} />}
        </Tab>
        <Tab eventKey={type.users} title={type.users}>
          {!loadingUsers && <AdminDataPanel data={users} />}
        </Tab>
      </Tabs>
    </>
  )
}

export default Admin

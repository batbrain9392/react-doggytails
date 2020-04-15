import React, { useState, useContext, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

import AuthContext from '../../lib/auth-context'
import userService from '../../http/user'

const AdminDataUsers = ({ loading, setLoading }) => {
  const [users, setUsers] = useState([])
  const { token } = useContext(AuthContext)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await userService.fetchAll(token)
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchAllUsers()
  }, [setLoading, token])

  return loading ? (
    'Loading...'
  ) : !users.length ? (
    'No ads posted'
  ) : (
    <Accordion defaultActiveKey={users[0].id}>
      {users.map((user) => (
        <Card key={user.id}>
          <Accordion.Toggle as={Card.Header} eventKey={user.id}>
            {user.name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={user.id}>
            <Card.Body>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  )
}

export default AdminDataUsers

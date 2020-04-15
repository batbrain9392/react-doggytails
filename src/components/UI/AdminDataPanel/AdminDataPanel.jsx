import React, { memo } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

const AdminDataPanel = ({ data }) => {
  return (
    <div className='mt-4'>
      {!data.length ? (
        'No data present'
      ) : (
        <>
          <div className='mb-4'>
            Total items in list :{' '}
            <Badge variant='secondary'>{data.length}</Badge>
          </div>
          <Accordion defaultActiveKey={data[0].id}>
            {data.map((item) => (
              <Card key={item.id}>
                <Accordion.Toggle as={Card.Header} eventKey={item.id}>
                  {item.name}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={item.id}>
                  <Card.Body>
                    <pre>{JSON.stringify(item, null, 2)}</pre>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </>
      )}
    </div>
  )
}

export default memo(AdminDataPanel)

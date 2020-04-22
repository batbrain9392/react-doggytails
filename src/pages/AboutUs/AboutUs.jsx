import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Heading from '../../components/UI/Heading/Heading'
import TeamMember from '../../components/UI/TeamMember/TeamMember'
import TeamAchievement from '../../components/UI/TeamAchievement/TeamAchievement'
import zaid from '../../assets/img/zaid.jpg'

import classes from './AboutUs.module.scss'

const AboutUs = () => {
  const teamMembers = [
    {
      img: zaid,
      name: 'Zaid',
      designation: 'Designation',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias id amet sunt deleniti et!',
    },
    {
      img: zaid,
      name: 'Aketa',
      designation: 'Designation',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias id amet sunt deleniti et!',
    },
    {
      img: zaid,
      name: 'Joel',
      designation: 'Designation',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias id amet sunt deleniti et!',
    },
    {
      img: zaid,
      name: 'Rajat',
      designation: 'Designation',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias id amet sunt deleniti et!',
    },
  ]

  const achievements = [
    {
      icon: 'dog',
      title: '5,000',
      desc: 'Animals rescued or assisted',
    },
    {
      icon: 'home',
      title: '576',
      desc: 'Adoptions from the ASPCA Adoption Center',
    },
    {
      icon: 'money-check-alt',
      title: '$2M',
      desc: 'Granted to Animal Welfare Organisations',
    },
    {
      icon: 'briefcase-medical',
      title: '9,000',
      desc: 'Spay/Neuter surgeries performed',
    },
  ]

  return (
    <>
      <Heading>About Us</Heading>
      <section className='mb-5'>
        <h4 className='mb-5'>The Team</h4>
        <Row>
          {teamMembers.map((member) => (
            <Col sm='6' lg='3' className='mb-4' key={member.name}>
              <TeamMember member={member} />
            </Col>
          ))}
        </Row>
      </section>
      <section className='mb-5'>
        <h4 className='mb-5'>Our Achievements</h4>
        <Row>
          {achievements.map((achievement) => (
            <Col sm='6' lg='3' className='mb-4' key={achievement.icon}>
              <TeamAchievement achievement={achievement} />
            </Col>
          ))}
        </Row>
      </section>
      <section>
        <h4 className='mb-5'>Contact Us</h4>
        <Row>
          <Col sm className='mb-4 mb-sm-0'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor error
            omnis facere nihil recusandae debitis facilis et laborum
            reprehenderit, quibusdam explicabo provident illum beatae, odit
            veniam architecto ratione saepe repellat. Doloribus perferendis
            eveniet illum voluptates accusantium sunt magni ullam itaque
            veritatis obcaecati ratione, nostrum ab adipisci, tempore odio.
          </Col>
          <Col>
            <Row noGutters className='mb-2'>
              <Col xs='1'>
                <FontAwesomeIcon
                  icon='phone-square'
                  size='lg'
                  className='text-primary'
                />
              </Col>
              <Col>+1 (469) 999-9999</Col>
            </Row>
            <Row noGutters className='mb-2'>
              <Col xs='1'>
                <FontAwesomeIcon
                  icon='calendar-alt'
                  size='lg'
                  className='text-primary'
                />
              </Col>
              <Col>Monday to Friday 9AM-5PM</Col>
            </Row>
            <Row noGutters>
              <Col xs='1'>
                <FontAwesomeIcon
                  icon='map-marker-alt'
                  size='lg'
                  className='text-primary'
                />
              </Col>
              <Col>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus aliquam magni soluta aliquid esse delectus accusantium
                inventore.
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </>
  )
}

export default AboutUs

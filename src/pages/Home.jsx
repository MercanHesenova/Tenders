import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../assets/home.css'
const Home = () => {
  return (
    <>
      <Container >
        <Row>
          <Col md={6}>
            <div className="intro-info">
              <img src="src/assets/images/ttender - all tenders of Azerbaijan..png" alt="intro logo" />
              <p>We have collected all sources of commercial and public
              tenders for you</p>
              <a href="" className='btn '>Get started</a>
            </div>
          </Col>
          <Col md={6}>
            <div className="home-image">
              <img src="src/assets/images/light-desk.png" alt="home intro image" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
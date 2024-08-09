import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../assets/home.css'
import TenderList from '../components/TenderList'
const Home = () => {
  return (
    <>
      <Container >
        <Row>
          <Col md={6} className=' order-md-1 order-2'>
            <div className="intro-info">
              <img src="src/assets/images/ttender - all tenders of Azerbaijan..png" alt="intro logo" />
              <p>We have collected all sources of commercial and public
                tenders for you</p>
              <a href="" className='btn '>Get started</a>
            </div>
          </Col>
          <Col md={6} className='order-md-2 order-1'>
            <div className="home-image">
              <img src="src/assets/images/light-desk.png" alt="home intro image" />
            </div>
          </Col>
        </Row>
        <hr />
        <TenderList></TenderList>
      </Container>
      <section className='started-now mt-5'>
        <div className="started-text ">
            <h2 className=''>Ready to get started ?</h2>
            <p className=''>Explore ttender, or create an account instantly and place a tender. You can also contact us for assistance!</p>
            <button className='btn btn-outline-light'> Start now</button>
        </div>
      </section>
    </>
  )
}

export default Home
import React, { useContext } from 'react'
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/Context';

const TenderDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {data:tenders} = useContext(Context)
  let findTender = tenders.find(tender => tender.id == id)
  let date = findTender?.endDate.split('-').reverse().join('/')
  return (
    <>
      <Container>
        <Row>
          <Col md={8} className='mx-auto'>
            <Card className="p-3 my-5  blue-shadow">
              <Row className="align-items-center">
                <Col md={1}></Col>
                <Col md={6}>
                  <div className="text-muted">
                    <small>Tender: {findTender?.id} </small>
                  </div>
                  <h5 className="my-2">
                    <a href="#" className="tender-text text-decoration-none">
                      {findTender?.owner}
                    </a>
                  </h5>
                  <div className="">
                    {findTender?.subject}
                  </div>
                  
                  <div className="text-muted mt-2">
                    <small><i className="bi bi-calendar-check"></i>  {findTender?.createdDate}</small>
                  </div>
                </Col>
                <Col md={4} className="text-end">
                  <h4 className="my-1">
                    1500 <span className="currency-icon">₼</span>
                  </h4>
                  <div className="text-warning ">
                    <small> 
                      <i className="bi bi-exclamation-circle"></i> Tender deadline: {date}
                    </small>
                  </div>
                  <div className="text-muted mt-1">
                    <i className="bi bi-geo-alt"></i> {findTender?.address}
                  </div>
                  <div className="text-muted mt-1">
                    <small>
                      <Button className=" apply-button mt-2 " variant="outline-primary" onClick={()=> navigate(`/tender-apply/${findTender?.id}`)}>
                        <i className="bi bi-caret-right"></i> 
                        Apply
                      </Button>
                    </small>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TenderDetail
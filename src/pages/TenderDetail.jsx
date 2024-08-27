import React, { useContext } from 'react'
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/Context';

const TenderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: tenders } = useContext(Context)
  let findTender = tenders.find(tender => tender.id == id)
  let date = findTender?.endDate.split('-').reverse().join('/')
  return (
    <>
      <Container>
        <Row>
          <Col md={10} className='mx-auto '>
            <Card className="p-3 my-5  blue-shadow">
              <div className="text-muted">
                <small>Tender: {findTender?.id} </small>
              </div>
              <h5 className="my-3">
                <a href="#" className="tender-text text-decoration-none">
                  <span className='text-muted'>Tender Owner: </span>  {findTender?.owner}
                </a>
              </h5>
              <div className="my-2">
                <h6 className='text-muted d-inline'>Tender Subject:</h6> {findTender?.subject}
              </div>
              <h5 className="my-2"> 
                <span className='text-muted'>Tender Estimated Cost:</span> {findTender?.estimatedCost} <span className="currency-icon">₼</span>
              </h5>
              <div className="text-muted my-2">
                <small><i className="bi bi-calendar-check"></i> Created Date:  {findTender?.createdDate}</small>
              </div>
              <div className="text-warning my-2">
                <small>
                  <i className="bi bi-exclamation-circle"></i> Tender deadline: {date}
                </small>
              </div>
              <div className="text-muted my-2">
                <i className="bi bi-geo-alt"></i> Adress: {findTender?.address}
              </div>
              <div className="text-muted my-2">
                <small>
                  <Button className=" apply-button mt-2 " variant="outline-primary" onClick={() => navigate(`/tender-apply/${findTender?.id}`)}>
                    <i className="bi bi-caret-right"></i>
                    Apply
                  </Button>
                </small>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TenderDetail
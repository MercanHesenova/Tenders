import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Tender = ({tender}) => {
  console.log(tender);
  let date = tender?.endDate.split('-').reverse().join('/')

  return (
      <Card className="p-3 mb-3  blue-shadow">
        <Row className="align-items-center">
          <Col md={1}></Col>
          <Col md={6}>
            <div className="text-muted">
              <small>Tender: {tender?.id}</small>
            </div>
            <h5 className="my-2">
              <a href="#" className="tender-text text-decoration-none">
                {tender?.owner}
              </a>
            </h5>
            <div className="text-muted">
            <i className="bi bi-geo-alt"></i>{tender?.address}
            </div>
            <div className="text-muted mt-2">
              <small><i className="bi bi-calendar-check"></i>  {tender?.createdDate}</small>
            </div>
          </Col>
          <Col md={4} className="text-end">
            <h4 className="mb-1">
              {tender?.estimatedCost} <span className="currency-icon">₼</span>
            </h4>
            <div className="text-warning">
              <small>
                <i className="bi bi-exclamation-circle"></i> Application deadline: {date} 
              </small>
            </div>
            <div className="text-muted mt-1">
              <small>
              <i className="bi bi-caret-right"></i> Ətraflı
              </small>
            </div>
          </Col>
        </Row>
      </Card>
  )
}

export default Tender
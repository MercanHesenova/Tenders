import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';
const TenderItem = () => {
    return (
        <>
            <Card className="p-3 mb-3  blue-shadow">
                <Row className="align-items-center">
                    <Col md={1}></Col>
                    <Col md={6}>
                        <div className="text-muted">
                            <small>Tender: 192314154314</small>
                        </div>
                        <h5 className="my-2">
                            <a href="#" className="text-primary text-decoration-none">
                                Supply of petroleum products
                            </a>
                        </h5>
                        <div className="text-muted">
                            <small>Industries: Gasoline, Diesel fuel, Bunkering of ships</small>
                        </div>
                        <div className="text-muted mt-2">
                            <small>09.07.2022</small>
                        </div>
                    </Col>
                    <Col md={4} className="text-end">
                        <h4 className="mb-1">
                            310 567 <span className="currency-icon">₼</span>
                        </h4>
                        <div className="text-warning">
                            <small>
                                <i className="bi bi-exclamation-circle"></i> Application deadline: 09/02/2022 at 8:00 (9 days)
                            </small>
                        </div>
                        <div className="text-muted mt-1">
                            <small>
                                <i className="bi bi-geo-alt"></i> Baku
                            </small>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default TenderItem
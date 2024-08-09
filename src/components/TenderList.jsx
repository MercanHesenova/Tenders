import React from 'react'
import TenderItem from './TenderItem'
import { Form, Container, Button } from 'react-bootstrap';
const TenderList = () => {
    return (
        <>
            <Container className='mt-5'>
                <h2 className='text-center tender-h2 mb-5'>Tenders</h2>
                <Form className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Search tenders..." className='search'
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form>
                <TenderItem  />
                <TenderItem  />
                
            </Container>
        </>
    )
}

export default TenderList
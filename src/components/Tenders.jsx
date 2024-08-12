import React, { useContext } from 'react'; 
import { Form, Container, Button } from 'react-bootstrap';
import Tender from './Tender';
import Context from '../context/Context';
const Tenders = () => {
  const {tenders} = useContext(Context)
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
        {
          tenders.map((tender) =>(
            <div key={tender?.id}>
              <Tender  tender={tender}/>
            </div>
          ))
        }
      </Container>
    </>
  )
}

export default Tenders
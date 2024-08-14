import React, { useContext, useEffect, useState } from 'react'; 
import { Form, Container } from 'react-bootstrap';

import {Context} from '../context/Context';
import Tender from './Tender';

const Tenders = () => {
  const tenders = useContext(Context)
  const [search, setSearch] = useState('')
  const [filteredTenders, setFilteredTenders] = useState(tenders)

  useEffect(()=>{
    const results = tenders?.filter(tender =>
      tender?.owner.toLowerCase().includes(search.toLowerCase())|| tender?.address.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredTenders(results)
  }, [search,tenders])
  return (
    <>
      <Container className='mt-5'>
        <h2 className='text-center tender-h2 mb-5'>Tenders</h2>
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search tenders..." className='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
        {         
          filteredTenders?.map((tender) =>(
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
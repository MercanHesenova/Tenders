// Main Imports
import React, { useContext, useEffect, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

// Custom Imports
import { Context } from '../context/Context';
import Tender from './Tender';

// Asset Imports
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";

const Tenders = () => {
  const { data: tenders } = useContext(Context); // data obyektini kontekstdən çəkirik
  const [search, setSearch] = useState('');
  const [filteredTenders, setFilteredTenders] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const tendersPerPage = 5;

  useEffect(() => {
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day); // month is 0-based
    };

    // First, sort tenders by createdDate in descending order (most recent first)
    const sortedTenders = Array.isArray(tenders)
      ? tenders.sort((a, b) => parseDate(b.createdDate) - parseDate(a.createdDate))
      : [];

    // Then, filter the sorted tenders based on the search query
    const results = sortedTenders.filter(tender =>
      tender?.owner?.toLowerCase().includes(search.toLowerCase()) ||
      tender?.address?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTenders(results);
  }, [search, tenders]);

  const offset = currentPage * tendersPerPage;
  const currentTenders = Array.isArray(filteredTenders)
    ? filteredTenders.slice(offset, offset + tendersPerPage)
    : [];

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <Container className='mt-5'>
        <h2 className='text-center tender-h2 mb-5' id='tenders'>Tenders</h2>
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search tenders..." className='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
        {currentTenders?.map((tender) => (
          <Tender tender={tender} key={tender?.id} />
        ))}

        <ReactPaginate
          previousLabel={<BsCaretLeft />}
          nextLabel={<BsCaretRight />}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredTenders.length / tendersPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center mt-4'} // Stil sinfi
          pageClassName={'page-item'} // Bootstrap sinfi
          pageLinkClassName={'page-link custom-page-link'} // Custom stil sinfi
          previousClassName={'page-item'}
          previousLinkClassName={'page-link custom-page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link custom-page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link custom-page-link'}
          activeClassName={'active custom-active'} // Stil sinfi
          disabledClassName={'disabled'} // Stil sinfi
        />
      </Container>
    </>
  );
};

export default Tenders;

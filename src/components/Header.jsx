//Main Imports
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

//Library Imports
import { Navbar, Nav, Container} from 'react-bootstrap';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const localUserName = localStorage.getItem('userName');
    if (loggedIn) {
      setIsLoggedIn(true);
      setUserName(localUserName);
    }
    console.log(loggedIn);
    
  }, []);
  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/';
  };
  return (
    <>
       <Navbar bg="white" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-logo">
            <img src="./src/assets/images/logo.png" alt="brand logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="ml-auto">
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/tender-create">Tender Create</Nav.Link>
                  <Nav.Link as={Link} to="/created-tender">Created Tender List</Nav.Link>
                  <Nav.Link as={Link} to="/applied-tender">Applied Tender List</Nav.Link>
                  <Nav.Link className='text-muted'>{userName}</Nav.Link>
                  <Nav onClick={logOut} className="btn btn-outline-primary signup-btn" >Log out</Nav>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/sign-in">Log in</Nav.Link>
                  <Link to="/sign-up" className="btn btn-outline-primary signup-btn">Sign up</Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
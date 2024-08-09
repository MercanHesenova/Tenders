import React from 'react'
import { Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
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
              <Nav.Link as={Link} to="/sign-in">Log in</Nav.Link>
              <Link to="/sign-up" className="btn btn-outline-primary signup-btn">Sign up</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
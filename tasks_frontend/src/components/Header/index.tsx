import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import './styles.css'

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <div className="content" >
        <Navbar.Brand className="header-logo" href="/">Tasks</Navbar.Brand>
        <Nav className="header-nav">
          <Nav.Item as={Link} className="nav-link" to="/">Home</Nav.Item>
          <Nav.Item as={Link} className="nav-link" to="/tasks">Tasks</Nav.Item>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;
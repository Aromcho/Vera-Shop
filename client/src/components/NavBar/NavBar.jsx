import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { CartContext } from "../../context/CartContext.jsx";
import Swal from 'sweetalert2';
import BioCard from '../../pages/Admin/BioCard/BioCard.jsx';
import { FaUserCircle, FaShoppingCart, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

import './NavBar.css';

const NavBar = () => {
  const { cartItems, isAdmin, isAuthenticated, loginWithRedirect, logoutjwt } = useContext(CartContext);

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          {isAdmin ? (
            <h5 className='text-white m-1'>Hola Administrador</h5>
          ) : (
            <Link to="/cart">
              <Button variant="dark">
                <FaShoppingCart className="icon" />
                {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
              </Button>
            </Link>
          )}
          <Dropdown className="ms-1">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <FaUserCircle className="icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" variant="dark">
              <Dropdown.Item as="div">
                <BioCard />
                <div className='d-flex flex-column'>
                  {isAdmin && (
                    <Button className="w-100 mt-2" as={Link} to="/admin" variant="dark">
                      Panel de Administrador
                    </Button>
                  )}
                  <Button className="w-100 mt-2" variant="dark" onClick={logoutjwt}>
                    Cerrar sesión
                  </Button>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else {
      return (
        <div className="auth-buttons">
          <Button className="ms-1 auth-button" variant="dark" onClick={loginWithRedirect}>
            <p className='m-0'><FaSignInAlt className="icon" /> Ingresar </p>
          </Button>
          
          <Link to="/cart">
            <Button variant="dark">
              <FaShoppingCart className="icon" />
            </Button>
          </Link>
        </div>
      );
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img src="./img/logo.jpeg" alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products/real" className="nav-link">
              Tienda
            </Nav.Link>
          </Nav>
          {renderAuthButtons()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

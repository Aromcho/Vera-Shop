import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { CartContext } from "../../context/CartContext.jsx";
import Swal from 'sweetalert2';
import BioCard from '../../pages/Admin/BioCard/BioCard.jsx';
import { FaUserCircle, FaShoppingCart, FaSignInAlt, FaUserPlus, FaSearch } from 'react-icons/fa';

import './NavBar.css';

const NavBar = () => {
  const { cartItems, isAdmin, isAuthenticated, loginWithRedirect, logoutjwt } = useContext(CartContext);
  const [adminGreeting, setAdminGreeting] = useState('');
  const navigate = useNavigate();

  // Actualizar el saludo del administrador basado en isAdmin
  useEffect(() => {
    if (isAdmin) {
      setAdminGreeting('Hola Administrador');
    } else {
      setAdminGreeting('');
    }
  }, [isAdmin]);

  // Redirigir a la página de productos al hacer clic en el ícono de búsqueda
  const handleSearchClick = () => {
    navigate('/products/real');
  };

  const renderButtons = () => {
    if (isAdmin) {
      // Mostrar opciones para el administrador
      return (
        <>
          <h5 className='text-white m-1'>{adminGreeting}</h5>
          <Dropdown className="ms-1">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <FaUserCircle className="icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" variant="dark">
              <Dropdown.Item as="div">
                <BioCard />
                <div className='d-flex flex-column'>
                  <Button className="w-100 mt-2" as={Link} to="/admin" variant="dark">
                    Panel de Administrador
                  </Button>
                  <Button className="w-100 mt-2" variant="dark" onClick={logoutjwt}>
                    Cerrar sesión
                  </Button>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else if (isAuthenticated) {
      // Mostrar opciones para usuarios autenticados que no son administradores
      return (
        <>
          <Dropdown className="ms-1">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <FaUserCircle className="icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" variant="dark">
              <Dropdown.Item as="div">
                <BioCard />
                <div className='d-flex flex-column'>
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
      // Mostrar opciones para usuarios no autenticados
      return (
        <div className="auth-buttons">
          <Button className="ms-1 auth-button" variant="dark">
            <p className='m-0'>Ingresar </p>
          </Button>
        </div>
      );
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar fixed-top">
      <Container className="justify-content-between">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand as={Link} to="/" className="navbar-brand m-0">
            <img src="/img/logo.png" alt="Logo" className="logo m-0" />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <FaSearch className="search-icon" onClick={handleSearchClick} />
            <Link to="/cart" className="cart-link">
              <FaShoppingCart className="shopping-cart-icon" />
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
            </Link>
          </div>
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">{renderButtons()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext.jsx';
import OrderManagement from './OrderManagement/OrderManagement.jsx';
import ProductManagement from './ProductManagement/ProductManagement.jsx';
import UserManagement from './UserManagement/UserManagement.jsx';
import CartManagement from './CartManagement/CartManagement.jsx';
import './Admin.css';


const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('pedidos');
  const { isAdmin } = useContext(CartContext);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'pedidos':
        return <OrderManagement />;
      case 'productos':
        return <ProductManagement />;
      case 'usuarios':
        return <UserManagement />;
      case 'carritos':
        return <CartManagement />;
      default:
        return <OrderManagement />;
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center">
        <h1 className="text-danger">Acceso denegado</h1>
        <p>No tienes permiso para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <Container fluid className="bg-dark pt-5 h-100">
      <Col>
        <Row xs={12} md={3} className="p-0">
          <Navbar bg="dark" variant="dark" className="flex-column mt-5">
            <Nav className="flex-grid">
              {[
                { name: 'Pedidos', icon: 'cart-fill' },
                { name: 'Productos', icon: 'box-seam' },
                { name: 'Usuarios', icon: 'people-fill' },
                { name: 'Carritos', icon: 'cart4' }
              ].map((item, index) => (
                <Nav.Link key={index} onClick={() => setActiveComponent(item.name.toLowerCase())}>
                  <i className={`bi ${item.icon}`} style={{ marginRight: '8px' }}></i>
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar>
        </Row>
        <Row xs={12} md={9} className="p-3">
          <main style={{ flexGrow: 1 }}>
            
            {renderComponent()}
          </main>
        </Row>
      </Col>
    </Container>
  );
};

export default Admin;

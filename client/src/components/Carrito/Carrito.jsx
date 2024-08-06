import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext.jsx';
import "./Carrito.css";

const Cart = () => {
  const {
    cartItems,
    borrarProducto,
    fetchCartItems,
    calculateTotalPrice,
    total,
    borrarTodo,
    aumentarCantidad,
    disminuirCantidad
  } = useContext(CartContext);

  useEffect(() => {
    fetchCartItems();
    calculateTotalPrice();
  }, [fetchCartItems, calculateTotalPrice]);

  return (
    <Container className="cart-container">
      <h2 className="mb-4">Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card
              className="mb-3"
              key={item._id}
              style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            >
              <Row className="no-gutters">
                <Col md={4} className="p-3">
                  <Card.Img
                    variant="top"
                    src={item.product_id.photo}  // Asegúrate de que 'photo' es el nombre correcto
                    style={{ borderRadius: '5px' }}
                    alt={item.product_id.title}  // Agregar atributo alt para accesibilidad
                  />
                </Col>
                <Col
                  md={8}
                  className="d-flex flex-column justify-content-between"
                >
                  <Card.Body>
                    {item.product_id && (
                      <>
                        <Card.Title
                          style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                        >
                          {item.product_id.title}
                        </Card.Title>
                        <Card.Text
                          style={{ fontSize: '1rem', color: '#007bff' }}
                        >
                          Precio: ${item.product_id.price.toFixed(2)}
                        </Card.Text>
                        <Card.Text
                          style={{ fontSize: '1rem', color: '#007bff' }}
                        >
                          Talle: {item.size}
                        </Card.Text>
                        <Card.Text
                          style={{ fontSize: '1rem', color: '#007bff' }}
                        >
                          Color: {item.color}
                        </Card.Text>
                        <Card.Text
                          style={{ fontSize: '1rem', color: '#007bff' }}
                        >
                          Cantidad: {item.quantity}
                        </Card.Text>
                      </>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button
                          variant="outline-secondary"
                          onClick={() => disminuirCantidad(item._id)}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          onClick={() => aumentarCantidad(item._id)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="outline-danger"
                        onClick={() => borrarProducto(item._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ${total.toFixed(2)}</h4>
            <div>
              <Button variant="danger" onClick={() => borrarTodo()}>
                Vaciar carrito
              </Button>
              <Button as={Link} to="/checkout" variant="success" className="ml-2">
                Ir a pagar
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;

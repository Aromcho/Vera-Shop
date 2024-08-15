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
      <h2 className="mb-4 cart-title">Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">No hay productos en tu carrito.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card className="cart-item-card mb-3" key={item._id}>
              <Row className="no-gutters">
                <Col md={4} className="p-3">
                  <Card.Img
                    variant="top"
                    src={item.product_id.photo}
                    className="cart-item-image"
                    alt={item.product_id.title}
                  />
                </Col>
                <Col md={8} className="d-flex flex-column justify-content-between p-3">
                  <Card.Body>
                    {item.product_id && (
                      <>
                        <Card.Title className="cart-item-title">
                          {item.product_id.title}
                        </Card.Title>
                        <Card.Text className="cart-item-text">
                          Precio: ${item.product_id.price.toFixed(2)}
                        </Card.Text>
                        <Card.Text className="cart-item-text">
                          Talle: {item.size}
                        </Card.Text>
                        <Card.Text className="cart-item-text">
                          Color: {item.color}
                        </Card.Text>
                        <Card.Text className="cart-item-text">
                          Cantidad: {item.quantity}
                        </Card.Text>
                      </>
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="quantity-controls">
                        <Button
                          variant="outline-custom"
                          onClick={() => disminuirCantidad(item._id)}
                          className="quantity-button"
                        >
                          -
                        </Button>
                        <span className="mx-2 quantity-number">{item.quantity}</span>
                        <Button
                          variant="outline-custom"
                          onClick={() => aumentarCantidad(item._id)}
                          className="quantity-button"
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="outline-danger"
                        onClick={() => borrarProducto(item._id)}
                        className="remove-button"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <div className="total-container">
            <h4>Total: ${total.toFixed(2)}</h4>
            <div>
              <Button variant="custom-danger" onClick={() => borrarTodo()} className="total-button">
                Vaciar carrito
              </Button>
              <Button as={Link} to="/checkout" variant="custom-success" className="total-button">
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

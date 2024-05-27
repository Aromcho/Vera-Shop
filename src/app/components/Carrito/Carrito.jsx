import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Row, Col } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

const Cart = () => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Obtén el ID del usuario que está logueado
        const userResponse = await axios.get("/api/sessions/online");
        const userId = userResponse.data.user_id;

        // Obtén los productos en el carrito del usuario
        const cartResponse = await axios.get(`/api/cart?user_id=${userId}`);
        const cartItems = cartResponse.data.response;

        setCartItems(cartItems);
      } catch (error) {
        console.error("Error al obtener los productos del carrito", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <Button variant="dark" onClick={handleShow} className="me-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </Button>
      <Offcanvas
        className="bg-dark text-white"
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {Array.isArray(cartItems) &&
  cartItems.map((item) => (
    <Card className="mb-3" key={item._id}>
      <Row className="no-gutters">
        <Col md={4}>
          <Card.Img
            variant="top"
            src="https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png"
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            {item.product_id && (
              <>
                <Card.Title>{item.product_id.title}</Card.Title>
                <Card.Text>Precio: {item.product_id.price}</Card.Text>
              </>
            )}
            <Card.Text>Cantidad: {item.quantity}</Card.Text>
            {/* Añade más detalles del producto aquí */}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;

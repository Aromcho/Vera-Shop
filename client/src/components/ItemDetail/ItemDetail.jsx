import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Button, ButtonGroup, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CartContext } from "../../context/CartContext.jsx"; // Importar el CartContext

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(''); // Estado para la talla seleccionada
  const [selectedColor, setSelectedColor] = useState(''); // Estado para el color seleccionado
  const { addToCart } = useContext(CartContext); // Consumir el CartContext
  
  return (
    <Container className="my-5 text-white h-75">
      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src={product.photo}
            className="img-fluid rounded-3 card-custom"
            alt={product.title}
          />
        </Col>
        <Col md={6}>
          <div className="p-4 bg-dark rounded-3">
            <h1 className="display-5">{product.title}</h1>
            <p className="fst-italic">Categoría: {product.category}</p>
            <p>{product.description}</p>
            <div className="mb-3 d-flex">
              <Form.Group className='mx-2' controlId="sizeSelector">
                <Form.Control
                  as="select"
                  size='sm'
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Talles</option>
                  {product.size.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Badge>
                Stock: {product.stock}
              </Badge>
              <Form.Group className='mx-2' controlId="colorSelector">
                <Form.Control
                  as="select"
                  size='sm'
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">Colores</option>
                  {product.color.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            <Row className="d-flex justify-content-between">
              <Col >
                <ButtonGroup>
                  <Button variant="outline-primary" onClick={() => quantity > 1 ? setQuantity(quantity - 1) : null}>-</Button>
                  <span className="p-2 mx-2 border border-primary">{quantity}</span>
                  <Button variant="outline-primary" onClick={() => setQuantity(quantity + 1)}>+</Button>
                </ButtonGroup>
              </Col>
              <Col >
              <Button 
  variant="outline-primary" 
  onClick={() => addToCart(product, quantity, selectedSize, selectedColor)} 
  disabled={!selectedSize || !selectedColor}
>
  Añadir al carrito
</Button>
              </Col>
              <Col >
                <h2 className="text-end fw-light">${product.price.toFixed(2)}</h2>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Button as={Link} to="/products/real" variant="primary" className="mt-3 w-100">Volver a la lista</Button>
    </Container>
  );
};

export default ItemDetail;

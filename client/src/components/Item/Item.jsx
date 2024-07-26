import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({ product, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const quantity = 1;

  return (
    <Card className="h-100 text-black shadow">
      <div className="card-image-wrapper">
        <Button
          size="md"
          onClick={() => {
            if (selectedSize && selectedColor) {
              addToCart({ ...product, selectedSize, selectedColor }, quantity);
            } else {
              alert("Please select size and color");
            }
          }}
          className="add-to-cart-button btn-dark"
        >
          <i className="bi bi-cart-plus"></i>
        </Button>
        <Card.Img
          src={product.photo}
          alt={product.title}
        />
      </div>
      <Link
        className="text-decoration-none text-black"
        to={`/products/${product._id}`}
      >
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text> {product.category}</Card.Text>
          <Card.Text>Precio: ${product.price}</Card.Text>
          <Form.Group controlId="sizeSelector">
            <Form.Control
              as="select"
              size="sm"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Talles</option>
              {product.size.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="colorSelector">
            <Form.Control
              as="select"
              size="sm"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Colores</option>
              {product.color.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Item;

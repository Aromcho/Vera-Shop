import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Item.css';

const Item = ({ product, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const quantity = 1;

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <Card className="h-100 text-black shadow card-shadow">
      <div className="card-image-wrapper">
        
        <Card.Img
          src={product.photo}
          alt={product.title}
          className="img-rounded"
        />
      </div>
      <Link
        className="text-decoration-none text-black"
        to={`/products/${product._id}`}
      >
        <Card.Body>
            <Card.Title className="card-title-bold">{product.title}</Card.Title>
            <Card.Text className="price-text">$ {product.price}</Card.Text>
          <Card.Text className="card-text mb-2">{product.category}</Card.Text>
          <Button
          size="md"
          className="custom-button w-100">
          <p className="mb-0">Ver Detalles</p>
        </Button>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Item;

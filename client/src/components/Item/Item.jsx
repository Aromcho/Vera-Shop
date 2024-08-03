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
      <Link
        className="text-decoration-none text-black"
        to={`/products/${product._id}`}
      >
      <div className="card-image-wrapper">
        
        <Card.Img
          src={product.photo}
          alt={product.title}
          className="img-rounded"
        />
      </div>
       <Card.Body>
            <Card.Title className="card-title-bold">{product.title}</Card.Title>
            <Card.Text className="price-text">$ {product.price}</Card.Text>
          <Card.Text className="card-text mb-2">{product.category}</Card.Text>

        </Card.Body>
      </Link>
    </Card>
  );
};

export default Item;

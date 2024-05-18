import React from 'react';
import { Card } from 'react-bootstrap';

const Item = ({ product }) => {
  return (
    <Card className="item card-custom">
      <Card.Body>
        <link href={`/products/${product.id}`}><Card.Title>{product.title}</Card.Title></link> {/* Utiliza la propiedad 'id' del producto para construir la URL */}
        <Card.Text>
          <strong>Price:</strong> ${product.price}
        </Card.Text>
        <Card.Text>
          <strong>Description:</strong> {product.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Item;


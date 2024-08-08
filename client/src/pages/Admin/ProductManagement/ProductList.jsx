import React from 'react';
import { Button, Tooltip, OverlayTrigger, Card, Col, Row } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './ProductList.css';

const formatPrice = (price) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ProductList = ({ productos, handleEdit, handleDelete }) => {
  return (
    <Row className="pt-3 ">
      {productos.map((product) => (
        <Col xs={12} md={6} lg={12} key={product._id} className="mb-4">
          <Card className="d-flex flex-row">
            <Card.Body className='d-flex justify-content-around'>
              <div className='d-flex flex-column'>
                <img src={product.photo} alt={product.title} className='img-thumbnail mb-2 img-card-admin' />
              </div>
              <Card.Text>
                <Card.Title>{product.title}</Card.Title>
                <strong>Precio:</strong> ${formatPrice(String(product.price))}<br />
                <strong>Stock:</strong> {product.stock}
              </Card.Text>
              <div className="d-flex justify-content-between flex-column">
                <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                  <Button variant="outline-primary" size="lg" onClick={() => handleEdit(product)}>
                    <PencilSquare />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                  <Button variant="outline-danger" size="lg" onClick={() => handleDelete(product._id)}>
                    <Trash />
                  </Button>
                </OverlayTrigger>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;

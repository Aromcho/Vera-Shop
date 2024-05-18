import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import axios from 'axios';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProduct();
  }, [productId]);

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  if (!product) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="item-detail-container">
      <Row>
        <Col>
          <ItemDetail product={product} />
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetailContainer;
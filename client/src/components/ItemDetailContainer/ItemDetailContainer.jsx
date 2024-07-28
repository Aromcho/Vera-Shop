import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import axios from 'axios';
import { CartContext } from '../../context/CartContext.jsx';
import './ItemDetailContainer.css';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);

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
      <div className="loading-container text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Cargando producto...</p>
      </div>
    );
  }

  return (
    <Container className="item-detail-container pt-5">
      <ItemDetail product={product} addToCart={addToCart}/>
    </Container>
  );
}

export default ItemDetailContainer;

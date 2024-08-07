import React, { useState, useEffect } from 'react';
import { Container, Card, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./OrderTracking.css";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError('No se pudo encontrar el pedido.');
      }
    };

    fetchOrder();
  }, [orderId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!order) {
    return <p className="loading-message">Cargando...</p>;
  }

  return (
    <Container className='order-tracking-container' maxWidth="md">
      <Card className="order-tracking-card">
        <Typography variant="h5" component="h2" className="tracking-title">
          Seguimiento de Pedido
        </Typography>
        <div className="order-details">
          <Typography variant="body1" className="detail-item">
            <strong>Estado:</strong> {order.state}
          </Typography>
          <Typography variant="body1" className="detail-item">
            <strong>Cantidad de productos:</strong> {order.quantity}
          </Typography>
          <Typography variant="body1" className="detail-item">
            <strong>Total:</strong> ${order.ticket.toFixed(2)}
          </Typography>
          <Typography variant="body1" className="detail-item">
            <strong>Dirección:</strong> {order.address}
          </Typography>
          <Typography variant="body1" className="detail-item">
            <strong>Método de Pago:</strong> {order.paymentMethod}
          </Typography>
          <Typography variant="body1" className="detail-item">
            <strong>Método de Entrega:</strong> {order.deliveryMethod}
          </Typography>
        </div>
      </Card>
    </Container>
  );
};

export default OrderTracking;

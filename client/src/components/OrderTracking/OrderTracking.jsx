import React, { useState, useEffect } from 'react';
import { Container, Card, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CelebrationIcon from '@mui/icons-material/Celebration';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './OrderTracking.css';

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

  const translateState = (state) => {
    switch (state) {
      case 'reserver':
        return 'Reservado';
      case 'payed':
        return 'Pagado';
      case 'delivered':
        return 'Entregado';
      default:
        return state;
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!order) {
    return <p className="loading-message">Cargando...</p>;
  }

  return (
    <Container className="order-tracking-container" maxWidth="md">
      <Card className="order-tracking-card">
        <CelebrationIcon className="celebration-icon" />
        <Typography variant="h4" component="h2" className="tracking-title">
          ¡Gracias por tu compra!
        </Typography>

        <Typography variant="h6" component="h3" className="tracking-subtitle">
          Tu pedido ha sido procesado exitosamente.
        </Typography>

        <div className="order-details">
          <Typography variant="body1" className="detail-item">
            <strong>Estado:</strong> {translateState(order.state)}
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

        <Button
          variant="contained"
          color="success"
          startIcon={<WhatsAppIcon />}
          href={`https://wa.me/${order.phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          Consulta el estado de tu envío
        </Button>
      </Card>
    </Container>
  );
};

export default OrderTracking;

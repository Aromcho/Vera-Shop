import React, { useState, useEffect } from 'react';
import { Button, OverlayTrigger, Tooltip, Card, Col, Row, Container } from 'react-bootstrap';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (orderId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
          setOrders(orders.filter(order => order._id !== orderId));
          Swal.fire('Eliminado', 'La orden ha sido eliminada.', 'success');
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar la orden.', 'error');
        }
      }
    });
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Pedidos</h2>
      <Row>
        {error && <Col className="text-danger">{error}</Col>}
        {orders.length === 0 && !error && <Col>No se encontraron órdenes</Col>}
        {orders.map((order) => (
          <Col xs={12} md={6} lg={4} key={order._id} className="mb-4">
            <Card className="order-card">
              <Card.Body className="d-flex justify-content-between flex-column">
                <Card.Text>
                  <Card.Title>Pedido de {order.user_id ? order.user_id.name : 'Cliente desconocido'}</Card.Title>
                  <strong>Email:</strong> {order.user_id ? order.user_id.email : 'No disponible'}<br />
                  <strong>Teléfono:</strong> {order.phoneNumber}<br />
                  <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}<br />
                  <strong>Total:</strong> ${order.ticket.toFixed(2)}<br />
                  <strong>Estado:</strong> {order.state}<br />
                  <strong>Método de Pago:</strong> {order.paymentMethod}<br />
                  <strong>Método de Entrega:</strong> {order.deliveryMethod}<br />
                  {order.items && order.items.map((item, index) => (
                    <div key={index}>
                      <strong>Producto:</strong> {item.product_id.title}<br />
                      <strong>Talle:</strong> {item.size}<br />
                      <strong>Color:</strong> {item.color}<br />
                    </div>
                  ))}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <OverlayTrigger overlay={<Tooltip>Ver Detalles</Tooltip>}>
                    <Button variant="outline-secondary" size="lg" className="mx-1">
                      <Eye />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                    <Button variant="outline-primary" size="lg" className="mx-1">
                      <PencilSquare />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                    <Button
                      variant="outline-danger"
                      size="lg"
                      className="mx-1"
                      onClick={() => handleDelete(order._id)}
                    >
                      <Trash />
                    </Button>
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OrderManagement;

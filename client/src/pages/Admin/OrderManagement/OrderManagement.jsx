import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, OverlayTrigger, Container, Row, Col } from 'react-bootstrap';
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
      <h2 className="mb-4 text-white">Pedidos</h2>
      <Row className="justify-content-md-center">
        <Col xs={12}>
          {error && <div className="text-danger">{error}</div>}
          {orders.length === 0 && !error && <div>No se encontraron órdenes</div>}
          <Table striped bordered hover responsive="sm" className="order-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user_id ? `${order.user_id.name} (${order.user_id.email})` : 'Cliente desconocido'}</td>
                  <td>{order.fecha}</td>
                  <td>${order.total}</td>
                  <td>
                    <OverlayTrigger overlay={<Tooltip>Ver Detalles</Tooltip>}>
                      <Button variant="outline-secondary" size="sm" className="mx-1">
                        <Eye />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                      <Button variant="outline-primary" size="sm" className="mx-1">
                        <PencilSquare />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="mx-1"
                        onClick={() => handleDelete(order._id)}
                      >
                        <Trash />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderManagement;

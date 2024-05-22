import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container,Table, Row, Col, Image, Badge, Button } from 'react-bootstrap';


function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/order');
        console.log(response); // Imprime la respuesta completa de la API
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
            console.log(user_id)
          console.error('La API no devolvió un array de órdenes');
        }
      } catch (error) {
        console.error('Hubo un error al obtener las órdenes', error);
      }
    };
  
    fetchOrders();
  }, []);

  return (
    <Container>
    <h2 className="my-3">Órdenes existentes</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User ID</th>
          <th>Cantidad</th>
          {/* Aquí puedes agregar más campos si los necesitas */}
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order._id}>
            <td>{index + 1}</td>
            <td>{order.user_id.name}</td>
            <td>{order.quantity}</td>
            {/* Aquí puedes agregar más campos si los necesitas */}
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
  );
}

export default ViewOrders;
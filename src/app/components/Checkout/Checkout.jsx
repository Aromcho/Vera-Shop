import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Checkout.css';
import { Container, Form, Button } from 'react-bootstrap';

function Checkout() {
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ticket = {
      title: `Pedido de ${userId}`,
      description: `El usuario ${userId} ha realizado un pedido de ${quantity} artículos.`,
      // Aquí puedes agregar más campos si los necesitas
    };
    
    try {
      const response = await axios.post('/api/tickets', ticket);
      console.log(response.data);
    
      // Muestra una alerta de éxito cuando el ticket se crea con éxito
      Swal.fire(
        '¡Ticket creado!',
        'Tu ticket se ha creado con éxito en la base de datos.',
        'success'
      );
    } catch (error) {
      console.error('Hubo un error al crear el ticket', error);
    
      // Muestra una alerta de error si hay un problema al crear el ticket
      Swal.fire(
        'Error',
        'Hubo un problema al crear tu ticket en la base de datos.',
        'error'
      );
    }
  };
  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userId">
          <Form.Label>User ID:</Form.Label>
          <Form.Control type="text" value={userId} onChange={e => setUserId(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Cantidad:</Form.Label>
          <Form.Control type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar Pedido
        </Button>
      </Form>
    </Container>
  );
}

export default Checkout;
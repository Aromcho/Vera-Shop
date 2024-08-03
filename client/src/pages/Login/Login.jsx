import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post('/api/sessions/login', user);
      if (response.data.statusCode === 200) {
        const statusResponse = await axios.get('/api/sessions/online');
        if (statusResponse.data.role === 'admin') {
          window.location.replace('/admin');
        } else {
          window.location.replace('/');
        }
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al intentar iniciar sesión.',
        });
      }
    }
  };

  return (
    <Container className="my-5 text-white ">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mt-5 card-custom">
            <Card.Body className="bg-dark-custom">
              <Card.Title className="mb-4 text-white">Iniciar sesión</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-white">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-white">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="outline-light" size="lg" type="submit" className="w-100">
                  Iniciar sesión
                </Button>
              </Form>
              <Card.Text className="text-center mt-3 text-white-custom">
                <Link to="/user/register" className="custom-link">¿No tienes una cuenta? Regístrate</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

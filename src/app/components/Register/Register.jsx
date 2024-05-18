import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <Container className="my-5 text-white">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mt-4 card-custom">
            <Card.Body className="bg-dark-custom">
              <Card.Title className="mb-4 text-white-custom">Registrarse</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-white-custom">Email</Form.Label>
                  <Form.Control type="email" placeholder="Introduce tu email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-white-custom">Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                  <Form.Label className="text-white-custom">Confirmar contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Confirma tu contraseña" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 btn-custom">
                  Registrarse
                </Button>
              </Form>
              <Card.Text className="text-center mt-3 text-white-custom">
                <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
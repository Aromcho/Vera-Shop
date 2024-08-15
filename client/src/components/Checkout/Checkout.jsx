import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, ProgressBar } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Checkout.css';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [storePaymentOption, setStorePaymentOption] = useState('online');
  const { cartItems, total, fetchCartItems } = useContext(CartContext);
  const steps = ['Resumen de la compra', 'Detalles de envío', 'Confirmación'];
  const navigate = useNavigate();

  const handleDeliverySelection = (method) => {
    setDeliveryMethod(method);
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      try {
        const userResponse = await axios.get('/api/sessions/online');
        const userId = userResponse.data.user_id;

        const orderData = {
          user_id: userId,
          quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
          ticket: total,
          address: deliveryMethod === 'home' ? `${address}, ${city}, ${zipCode}` : 'Retiro en tienda',
          paymentMethod: paymentMethod,
          deliveryMethod: deliveryMethod,
          storePaymentOption: storePaymentOption,
          state: 'reserver',
        };

        const response = await axios.post('/api/orders', orderData);
        if (response.status === 201) {
          Swal.fire('¡Compra exitosa!', 'Tu orden ha sido creada con éxito.', 'success').then(() => {
            fetchCartItems();
            navigate(`/order-tracking/${response.data.order._id}`);
          });
        }
      } catch (error) {
        Swal.fire('¡Error!', 'Hubo un problema al crear la orden. Por favor, intenta de nuevo.', 'error');
      }
    } else {
      handleNext();
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card className="checkout-card ">
            <Card.Body>
              <Card.Title as="h5">Resumen de la compra</Card.Title>
              <ListGroup variant="flush">
                {cartItems.map((product) => (
                  <ListGroup.Item key={product._id}>
                    {product.product_id.title} - ${product.product_id.price}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="checkout-summary mt-3">
                <p>Total: ${total}</p>
                <p>Cantidad de productos: {cartItems.length}</p>
              </div>
              <div className="delivery-selection d-flex justify-content-around mt-4">
                <Button variant="custom" className="checkout-delivery-button" onClick={() => handleDeliverySelection('store')}>
                  <StoreIcon style={{ marginRight: '8px' }} />
                  Retirar en Tienda
                </Button>
                <Button variant="custom" className="checkout-delivery-button" onClick={() => handleDeliverySelection('home')}>
                  <LocalShippingIcon style={{ marginRight: '8px' }} />
                  Envío a Domicilio
                </Button>
              </div>
            </Card.Body>
          </Card>
        );
      case 1:
        return (
          <Card className="checkout-card">
            <Card.Body>
              <Card.Title as="h5">Detalles de la compra</Card.Title>
              <Form onSubmit={handleFormSubmit}>
                {deliveryMethod === 'home' ? (
                  <>
                    <h6>Envío a Domicilio</h6>
                    <Form.Group controlId="formName" className="mt-3">
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingresa tu nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formAddress" className="mt-3">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Dirección de envío"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formCity" className="mt-3">
                          <Form.Label>Ciudad</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ciudad"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formZipCode" className="mt-3">
                          <Form.Label>Código Postal</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Código Postal"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="formPaymentMethod" className="mt-3">
                      <Form.Label>Método de Pago</Form.Label>
                      <Form.Control
                        as="select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                      >
                        <option value="credit">Tarjeta de Crédito</option>
                        <option value="debit">Tarjeta de Débito</option>
                        <option value="cash">Efectivo</option>
                        <option value="mercadopago">MercadoPago</option>
                      </Form.Control>
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <h6>Retiro en Tienda</h6>
                    <p className="checkout-description">
                      Puedes retirar tu pedido en nuestra tienda ubicada en la Galería París. Por favor, selecciona cómo deseas realizar el pago.
                    </p>
                    <Form.Group controlId="formStorePaymentOption" className="mt-3">
                      <Form.Label>Opción de Pago</Form.Label>
                      <Form.Control
                        as="select"
                        value={storePaymentOption}
                        onChange={(e) => setStorePaymentOption(e.target.value)}
                        required
                      >
                        <option value="online">Pagar en Línea</option>
                        <option value="store">Pagar en Tienda</option>
                      </Form.Control>
                    </Form.Group>
                  </>
                )}
                <Button type="submit" variant="custom" className="mt-4">
                  {activeStep === steps.length - 1 ? 'Finalizar compra' : 'Siguiente'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        );
      case 2:
        return (
          <Card className="checkout-card">
            <Card.Body>
              <Card.Title as="h5">Confirmación</Card.Title>
              <p>Tu orden está casi lista para ser procesada.</p>
            </Card.Body>
          </Card>
        );
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Container className="checkout-container my-5 ">
      <ProgressBar now={(activeStep + 1) / steps.length * 100} className="mb-5 mt-5 progress-custom" />
      <div className="checkout-content d-flex justify-content-center flex-column">
        {getStepContent(activeStep)}
        {activeStep > 0 && (
          <div className="d-flex justify-content-between mt-4">
            <Button variant="custom" disabled={activeStep === 0} onClick={handleBack}>Atrás</Button>
            <Button variant="custom" onClick={handleFormSubmit}>
              {activeStep === steps.length - 1 ? 'Finalizar compra' : 'Siguiente'}
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Checkout;

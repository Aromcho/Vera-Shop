import React, { useState, useContext } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, TextField, Button, Stepper, Step, StepLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CartContext } from '../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import axios from 'axios';
import Swal from 'sweetalert2';
import './Checkout.css';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [storePaymentOption, setStorePaymentOption] = useState('online');
  const { cartItems, total, fetchCartItems } = useContext(CartContext);
  const steps = ['Resumen de la compra', 'Detalles de envío', 'Confirmación'];
  const navigate = useNavigate(); // Obtén la función navigate

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
          address: deliveryMethod === 'home' ? address : 'Retiro en tienda',
          paymentMethod: paymentMethod,
          deliveryMethod: deliveryMethod,
          storePaymentOption: storePaymentOption,
          state: 'reserver',
        };

        const response = await axios.post('/api/orders', orderData);
        if (response.status === 201) {
          Swal.fire('¡Compra exitosa!', 'Tu orden ha sido creada con éxito.', 'success').then(() => {
            fetchCartItems(); // Actualiza el carrito
            navigate(`/order-tracking/${response.data.order._id}`); // Redirige a OrderTracking
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
          <Card className="checkout-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="checkout-title">Resumen de la compra</Typography>
              <List>
                {cartItems.map((product) => (
                  <ListItem key={product._id}>
                    <ListItemText primary={product.product_id.title} secondary={`Precio: $${product.product_id.price}`} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="body1" className="checkout-total">Total: ${total}</Typography>
              <Typography variant="body1" className="checkout-total">Cantidad de productos: {cartItems.length}</Typography>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card className="checkout-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="checkout-title">Detalles de la compra</Typography>
              <form onSubmit={handleFormSubmit}>
                {deliveryMethod === 'home' && (
                  <TextField
                    label="Dirección de envío"
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                )}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Método de pago</InputLabel>
                  <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <MenuItem value="credit">Tarjeta de crédito</MenuItem>
                    <MenuItem value="debit">Tarjeta de débito</MenuItem>
                    <MenuItem value="cash">Efectivo</MenuItem>
                    <MenuItem value="mercadopago">MercadoPago</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Método de Entrega</InputLabel>
                  <Select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    required
                  >
                    <MenuItem value="home">Envío a Domicilio</MenuItem>
                    <MenuItem value="store">Retirar en Tienda</MenuItem>
                  </Select>
                </FormControl>
                {deliveryMethod === 'store' && (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Opción de Pago</InputLabel>
                    <Select
                      value={storePaymentOption}
                      onChange={(e) => setStorePaymentOption(e.target.value)}
                      required
                    >
                      <MenuItem value="online">Pagar en Línea</MenuItem>
                      <MenuItem value="store">Pagar en Tienda</MenuItem>
                    </Select>
                  </FormControl>
                )}
                <Button type="submit" variant="contained" color="primary" className="checkout-submit-button">
                  {activeStep === steps.length - 1 ? 'Finalizar compra' : 'Siguiente'}
                </Button>
              </form>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="checkout-card">
            <CardContent>
              <Typography variant="h5" component="h2" className="checkout-title">Confirmación</Typography>
              <Typography variant="body1" className="checkout-confirmation">Tu orden está casi lista para ser procesada.</Typography>
            </CardContent>
          </Card>
        );
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Container maxWidth="md" className="checkout-container">
      <Stepper activeStep={activeStep} alternativeLabel className="checkout-stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="checkout-content">
        {getStepContent(activeStep)}
        <Grid container spacing={2} justifyContent="flex-end" className="checkout-buttons">
          <Grid item>
            <Button disabled={activeStep === 0} onClick={handleBack}>Atrás</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              {activeStep === steps.length - 1 ? 'Finalizar compra' : 'Siguiente'}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Checkout;

import React, { useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CartContext } from "../../context/CartContext.jsx";
import { useAuth0 } from '@auth0/auth0-react';

const LoginAuth0 = () => {
  const { handleUserAuth } = useContext(CartContext);
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  console.log(JSON.stringify(user));
  // Función para manejar la creación o inicio de sesión de usuario
  

  useEffect(() => {
    if (isAuthenticated) {
      handleUserAuth();
    }
  }, [isAuthenticated, user]); // Ejecutar cuando el estado de autenticación o el usuario cambien

  if (isLoading) return <div>Cargando...</div>; // Manejo del estado de carga

  return (
    <Button onClick={() => loginWithRedirect()}>
      Iniciar sesión
    </Button>
  );
};

export default LoginAuth0;

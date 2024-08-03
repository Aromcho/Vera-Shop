import React, { useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import axios from 'axios';
import Swal from 'sweetalert2';
import { CartContext } from "../../context/CartContext.jsx";
import { useAuth0 } from '@auth0/auth0-react';

const LoginAuth0 = () => {
  const { handleUserAuth } = useContext(CartContext);
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate(); // Instancia de useNavigate

  useEffect(() => {
    // Redirigir al usuario a la URL de origen después de iniciar sesión
    if (isAuthenticated && user) {
      handleUserAuth();
      const returnTo = localStorage.getItem('returnTo'); // Obtén la URL de origen
      if (returnTo) {
        navigate(returnTo); // Navega a la URL de origen
        localStorage.removeItem('returnTo'); // Limpia el valor almacenado
      }
    }
  }, [isAuthenticated, user, handleUserAuth, navigate]); // Incluye navigate en las dependencias

  const handleLogin = () => {
    const currentUrl = window.location.pathname; // Obtén la URL actual
    localStorage.setItem('returnTo', currentUrl); // Guarda la URL de origen
    loginWithRedirect({
      appState: { returnTo: currentUrl }, // Pasa la URL de origen
    });
  };

  if (isLoading) return <div>Cargando...</div>; // Manejo del estado de carga

  return (
    <Button onClick={handleLogin}>
      Iniciar sesión
    </Button>
  );
};

export default LoginAuth0;

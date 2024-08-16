import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth0 } from '@auth0/auth0-react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const handleUserAuth = async () => {
      if (!isAuthenticated || !user) return;

      const userAuth0Register = {
        email: user.email,
        password: user.sub, // Usamos el 'sub' como identificador único
        photo: user.picture,
        name: user.name,
      };

      try {
        // Intentar registrar al usuario
        const registerResponse = await axios.post('/api/sessions/register', userAuth0Register);

        if (registerResponse.data.statusCode === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Registrado',
            text: 'Usuario registrado exitosamente. Redirigiendo...',
          });
        } else {
          await axios.post('/api/sessions/login', userAuth0Register);
        }
      } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al intentar iniciar sesión.',
        });
      }
    };

    if (isAuthenticated) {
      handleUserAuth();
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const statusResponse = await axios.get('/api/sessions/online');
        if (statusResponse.data.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error al verificar el estado del usuario', error);
        setIsAdmin(false);
      }
    };

    checkIfAdmin();
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    if (!Array.isArray(cartItems)) return;
    const total = cartItems.reduce((acc, item) => acc + item.product_id.price * item.quantity, 0);
    setTotal(total);
  };

  const borrarProducto = async (idProducto) => {
    try {
      const response = await axios.delete(`/api/cart/${idProducto}`);
      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.filter((producto) => producto._id !== idProducto));
      } else {
        console.error('Error al eliminar el producto del carrito');
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito', error);
    }
  };

  const borrarTodo = async () => {
    try {
      const userResponse = await axios.get('/api/sessions/online');
      const userId = userResponse.data.user_id;
      const response = await axios.delete(`/api/cart/all/${userId}`);
      if (response.status === 200) {
        setCartItems([]);
      } else {
        console.error('Error al eliminar los productos del carrito');
      }
    } catch (error) {
      console.error('Error al eliminar los productos del carrito', error);
    }
  };

  const logoutjwt = async () => {
    try {
      const response = await axios.post('/api/sessions/signout');
      logout();
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Sesión cerrada!',
          text: 'Has cerrado la sesión correctamente.',
          confirmButtonText: 'OK',
        });
        setCartItems([]);
      } else {
        console.error('Error al cerrar la sesión');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cerrar la sesión.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error al cerrar la sesión', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const userResponse = await axios.get('/api/sessions/online');
      const userId = userResponse.data.user_id;
      const cartResponse = await axios.get(`/api/cart?user_id=${userId}`);
      console.log('Cart items fetched:', cartResponse.data.response);
      
      // Verifica si `photo` está presente en cada producto
      const itemsWithPhotos = cartResponse.data.response.map(item => ({
        ...item,
        product_id: {
          ...item.product_id,
          photo: item.product_id.photo || '/path/to/default/image.jpg', // Fallback en caso de que la imagen no esté disponible
        }
      }));
  
      setCartItems(itemsWithPhotos || []);
    } catch (error) {
      console.error('Error al obtener los productos del carrito', error);
    }}

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  // CartContext.jsx
const addToCart = async (product, quantity, selectedSize, selectedColor) => {
  try {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Inicia sesión facil',
        text: 'Necesitas ingresar con google para añadir productos al carrito.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Guardar estado antes de redirigir
          localStorage.setItem('appState', JSON.stringify({
            returnTo: window.location.pathname,
            product,
            quantity,
            selectedSize,
            selectedColor,
          }));

          loginWithRedirect({
            appState: {
              returnTo: window.location.pathname,
            },
          });
        }
      });
      return;
    }

    const userResponse = await axios.get('/api/sessions/online');
    if (userResponse.status !== 200) {
      throw new Error('No se pudo verificar el estado del usuario.');
    }
    const userId = userResponse.data.user_id;
    const response = await axios.post('/api/cart/', {
      product_id: product._id,
      user_id: userId,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    if (response.status === 200) {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          _id: response.data._id,
          product_id: product,
          quantity,
          size: selectedSize,
          color: selectedColor,
        },
      ]);
      Swal.fire({
        icon: 'success',
        title: '¡Producto añadido al carrito!',
        text: `${product.title} se ha añadido a tu carrito.`,
        confirmButtonText: 'OK',
      });
    } else {
      throw new Error('No se pudo añadir el producto al carrito.');
    }
  } catch (error) {
    console.error('Error al agregar el producto al carrito', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al añadir al carrito',
      text: 'No se pudo añadir el producto al carrito. Por favor, inténtalo de nuevo.',
    });
  }
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        isAdmin,
        isAuthenticated,
        loginWithRedirect,
        logoutjwt,
        addToCart,
        calculateTotalPrice,
        borrarTodo,
        borrarProducto,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };

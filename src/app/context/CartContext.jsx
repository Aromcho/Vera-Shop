import { createContext, useState } from "react";

//Creamos un contexto de React llamado CartContext
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const añadirProductoAlCarrito = (productoNuevo) => {
    const condicion = estaEnElCarrito(productoNuevo.id);

    if (condicion) {
      //cambiar solamente la cantidad del producto
      const productosModificados = carrito.map((productoCarrito) => {
        if (productoCarrito.id === productoNuevo.id) {
          return {
            ...productoCarrito,
            cantidad: productoCarrito.cantidad + productoNuevo.cantidad,
          };
        } else {
          return productoCarrito;
        }
      });
      
      setCarrito(productosModificados);
    } else {
      //añadimos el producto nuevo
      setCarrito([...carrito, productoNuevo]);
    }
  };

  const estaEnElCarrito = (idProducto) => {
    const respuesta = carrito.some((producto) => producto.id === idProducto);
    return respuesta;
  };

  const cantidadTotal = () => {
    const cantidad = carrito.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );
    return cantidad;
  };

  const precioTotal = () => {
    const total = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    return total;
  };

  const borrarProducto = (idProducto) => {
    const productosFiltrados = carrito.filter(
      (producto) => producto.id !== idProducto
    );
    setCarrito(productosFiltrados);
  };

  const borrarTodo = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        añadirProductoAlCarrito,
        cantidadTotal,
        borrarTodo,
        precioTotal,
        borrarProducto,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
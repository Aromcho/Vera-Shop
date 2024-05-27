import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ItemDetail = ({ product }) => {
  const [cart, setCart] = useState([]);

 
  const addToCart = async (product) => {
    try {
      const userResponse = await axios.get("/api/sessions/online");
      const userId = userResponse.data.user_id;
      const response = await axios.post(`/api/cart/`, { product_id: product._id, user_id: userId });
      if (response.status === 200) {
        setCart([...cart, product]);
        Swal.fire({
          icon: 'success',
          title: '¡Producto añadido al carrito!',
          text: `${product.title} se ha añadido a tu carrito.`,
          confirmButtonText: 'OK'
        });

      } else {
        console.error('Error al agregar el producto al carrito');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al agregar el producto al carrito.',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al agregar el producto al carrito.',
        confirmButtonText: 'OK'
      });
    }
  };
  
  return (
    <Container className="my-5 text-white">
      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src='https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png' // Asegúrate de tener una propiedad 'image' en tu objeto 'product' que contenga la URL de la imagen
            className="img-fluid rounded-3 card-custom"
            alt={product.title}
          />
        </Col>
        <Col md={6}>
          <div className="p-4 bg-dark rounded-3">
            <h1 className="display-5">{product.title}</h1>
            <p className="fst-italic">Categoría: {product.category}</p>
            <p>{product.description}</p>
            <div className="mb-3">
              <Badge style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
                Stock: {product.stock}
              </Badge>
            </div>
            <Row className="align-items-center">
            <Button variant="outline-primary" className="col-4" onClick={() => addToCart(product)}>Añadir al carrito</Button>
              <h2 className="col-8 text-end fw-light">Precio: ${product.price}</h2>
            </Row>
          </div>
        </Col>
        
        <Button as={Link} to="/products/real" variant="primary" className="mt-3">Volver a la lista</Button>
      </Row>
    </Container>
  );
};

export default ItemDetail;
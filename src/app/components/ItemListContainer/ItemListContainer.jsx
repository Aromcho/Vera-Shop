import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Card } from 'react-bootstrap';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener productos
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product'); // Asegúrate de que esta ruta sea correcta
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); // Seteamos todos los productos obtenidos
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // La lista de dependencias está vacía para que se ejecute solo una vez al montar el componente

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  return (
    <section>
      <h1 className="text-center p-4">Lista de Productos</h1>
      <Container className="mt-4">
        <Row className="row-cols-1 row-cols-md-4 g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 bg-dark text-white">
                <Card.Img src="https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png" alt={product.title} />
                <Link className="text-decoration-none text-white" to={`/products/${product.id}`}>
                {product.name}
                
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>Categoría: {product.category}</Card.Text>
                    <Card.Text>Precio: ${product.price}</Card.Text>
                    <Card.Text>Stock: {product.stock}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ItemListContainer;


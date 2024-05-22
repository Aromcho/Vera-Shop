import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);

  const [nextPage, setNextPage] = useState(null);
const [prevPage, setPrevPage] = useState(null);

  const fetchProducts = async () => {
    try {
      let url = `/api/product/paginate?limit=15&page=${page}`;
      if (category) {
        url += `&category=${category}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.response);
      setNextPage(data.info.nextPage);
      setPrevPage(data.info.prevPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, page]);
  
  


  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  return (
    <>
      <Nav className="nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" id="pillNav2" role="tablist" style={{ '--bs-nav-link-color': 'var(--bs-white)', '--bs-nav-pills-link-active-color': 'var(--bs-primary)', '--bs-nav-pills-link-active-bg': 'var(--bs-white)' }}>
        <Nav.Item>
          <Link to="/products/real">
            <Nav.Link className="active rounded-5" id="home-tab2" data-bs-toggle="tab" role="tab" aria-selected="true">todos</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products/real/Ropa">
            <Nav.Link className="rounded-5" id="profile-tab2" data-bs-toggle="tab" role="tab" aria-selected="false">Ropa</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products/real/Calzado">
            <Nav.Link className="rounded-5" id="contact-tab2" data-bs-toggle="tab" role="tab" aria-selected="false">Calzado</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products/real/Accesorios">
            <Nav.Link className="rounded-5" id="contact-tab2" data-bs-toggle="tab" role="tab" aria-selected="false">Accesorios</Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
      <section>
        <h1 className="text-center p-4">Lista de Productos</h1>
        <Container className="mt-4">
          <Row className="row-cols-1 row-cols-md-4 g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <Card className="h-100 bg-dark text-white">
                  <Card.Img src="https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png" alt={product.title} />
                  <Link className="text-decoration-none text-white" to={`/products/${product.id}`}>
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
          <button onClick={() => setPage(prevPage)} disabled={!prevPage}>Anterior</button>
<button onClick={() => setPage(nextPage)} disabled={!nextPage}>Siguiente</button>
      </Container>
      </section>
    </>
  );
};

export default ItemListContainer;
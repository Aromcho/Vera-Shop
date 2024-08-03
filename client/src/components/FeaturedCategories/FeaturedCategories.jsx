import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './FeaturedCategories.css';

const FeaturedCategories = () => {
  return (
    <Container className="my-5 d-flex align-items-center justify-content-center flex-column">
      <Row className="category-row mb-3">
        <Col md={7} className="category-img">
          <img
            src="https://www.italiano-al-caffe.com/wp-content/uploads/2023/05/outfit-para-viajar-a-italia1.jpeg"
            alt="Hombres"
          />
        </Col>
        <Col md={5} className="category-text p-4 rounded">
          <h3>Invierno</h3>
          <p>Explora las últimas tendencias invierno.</p>
          <Link to="/products/real">
            <Button variant="outline-light" size="lg">
              Ver Más
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="category-reverse category-row mb-3">
        <Col md={5} className="category-text-2 p-4 rounded">
          <h3>Elegante</h3>
          <p>Descubre la moda femenina para toda ocasión.</p>
          <Link to="/products/real">
            <Button variant="outline-light" size="lg">
              Ver Más
            </Button>
          </Link>
        </Col>
        <Col md={7} className="category-img">
          <img
            src="https://album.mediaset.es/eimg/10000/2021/05/09/clipping_4kHzfm_4c97.jpg"
            alt="Mujeres"
          />
        </Col>
      </Row>
      <Row className="category-row mb-3">
        <Col md={7} className="category-img">
          <img
            src="https://e00-telva.uecdn.es/assets/multimedia/imagenes/2022/12/26/16720195986169.jpg"
            alt="Accesorios"
          />
        </Col>
        <Col md={5} className="category-text p-4 rounded">
          <h3>Accesorios</h3>
          <p>Complementa tu estilo con los mejores accesorios.</p>
          <Link to="/products/real">
            <Button variant="outline-light" size="lg">
              Ver Más
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedCategories;

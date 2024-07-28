import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Face.css';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import LocationSection from '../LocationSection/LocationSection.jsx';

const Face = () => {
  return (
    <div>
      {/* Sección Hero */}
      <div className="hero d-flex align-items-center justify-content-center flex-column">
        <div className="overlay w-100 d-flex align-items-center justify-content-center flex-column">
          <h1 className="banner display-3 text-white p-2">
            Dolores Pidré
          </h1>
          <p className="lead text-light ">
            Descubre la Esencia de la Moda Italiana.
          </p>

          <Link to="/products/real">
            <Button variant="outline-light" size="lg">
              Explora Nuestros Productos
            </Button>
          </Link>

          <div className="social-icons mt-3">
            <a href="https://www.instagram.com/dolorespidre/?hl=es" target="_blank" rel="noopener noreferrer">
              <Button variant="outline-light" size="lg" className="mx-2">
                <i className="bi bi-instagram"></i>
              </Button>
            </a>
            <a href="https://www.facebook.com/dolorespidre/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline-light" size="lg" className="mx-2">
                <i className="bi bi-facebook"></i>
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Sección de Categorías Destacadas */}
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
        <Row className="category-row mb-3 ">
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

      {/* Mejoras en la Sección de Productos Populares */}
      <Container className="my-5 popular-products-section">
        <h2 className="text-center mb-4 section-title">Productos</h2>
        <ItemListContainer />
      </Container>
      <Container className="my-5">
        <LocationSection />
      </Container>
      
      <div className="testimonials-section text-center my-5">
        <Container>
          <h2 className="mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <Row>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "¡La mejor tienda de ropa! Siempre encuentro lo que busco y
                  más."
                </p>
                <p className="testimonial-author">- Alex M.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "Increíble calidad y excelente servicio al cliente. ¡Muy
                  recomendado!"
                </p>
                <p className="testimonial-author">- Daniela R.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "Variedad y estilo en un solo lugar. Siempre me sorprenden con
                  sus colecciones."
                </p>
                <p className="testimonial-author">- Carlos S.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Flotador de WhatsApp */}
      <div className="floating-icons ">
        <a href="https://wa.me/5491149791377" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>
    </div>
  );
};

export default Face;

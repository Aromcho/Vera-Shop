import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Face.css';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import LocationSection from '../LocationSection/LocationSection.jsx';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories.jsx';
import ChatBubble from '../ChatBubble/ChatBubble';
import ChatModal from '../ChatModal/ChatModal';

const Face = () => {
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <div>
      {/* Sección Hero */}
      <div className="hero d-flex align-items-center justify-content-center flex-column">
        <div className="overlay w-100 d-flex align-items-center justify-content-center flex-column">
          <h1 className="banner display-3 text-white p-2">Vera Shop</h1>

          <div className="scrolling-text-container">
            <p className="scrolling-text mb-0">Disponible solo en nuestra tienda online </p>
          </div>

          <p className="lead text-light">Donde comienza tu mejor look.</p>

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
      <FeaturedCategories />

      {/* Seccion de ubicación */}
      <Container className="mb-5">
        <LocationSection />
      </Container>

      {/* Testimonios */}
      <div className="testimonials-section text-center my-5">
        <Container>
          <h2 className="mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <Row>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "¡La mejor tienda de ropa! Siempre encuentro lo que busco y más."
                </p>
                <p className="testimonial-author">- Alex M.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "Increíble calidad y excelente servicio al cliente. ¡Muy recomendado!"
                </p>
                <p className="testimonial-author">- Daniela R.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "Variedad y estilo en un solo lugar. Siempre me sorprenden con sus colecciones."
                </p>
                <p className="testimonial-author">- Carlos S.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Flotador de WhatsApp */}
      <div className="floating-icons">
        <a href="https://wa.me/5491165785043" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>

      {/* Burbuja de Chat */}
      <ChatBubble onClick={() => setShowChatModal(true)} />

      {/* Modal de Chat */}
      <ChatModal show={showChatModal} onHide={() => setShowChatModal(false)} />
    </div>
  );
};

export default Face;

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Footer.css'; // Importa el archivo de estilos CSS

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light text-center p-3">
            <Container>
                <Row>
                    <Col>
                        <p>© 2023 Mi Tienda de Ropa</p>
                    </Col>
                    <Col>
                        <Link to="/privacy-policy" className="text-light">
                            Política de Privacidad
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/contact" className="text-light">
                            Contacto
                        </Link>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Col xs="auto">
                        <a href="https://www.instagram.com/dolorespidre/?hl=es" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline-light" size="lg" className="mx-2">
                                <i className="bi bi-instagram"></i>
                            </Button>
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a href="https://www.facebook.com/dolorespidre/" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline-light" size="lg" className="mx-2">
                                <i className="bi bi-facebook"></i>
                            </Button>
                        </a>
                    </Col>
                    <Col xs="auto">
                        <Link to="/user/login">
                            <Button variant="outline-light" size="lg" className="mx-2">
                                <i className="bi bi-person"></i> Admin Login
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

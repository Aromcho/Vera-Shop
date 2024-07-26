import React, { useState, useEffect } from 'react';
import { Button, Tooltip, OverlayTrigger, Form, Modal, Card, Col, Row } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import './ProductManagement.css';
import UploadImage from './UploadImage'; // Importa el componente

const ProductManagement = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    photo: '',
    category: '',
    price: 0,
    stock: 0,
    size: [], // Añadir campos size y color
    color: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product');
        if (!response.data || response.data.statusCode !== 200) {
          throw new Error('Failed to fetch products');
        }
        setProductos(response.data.response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del nuevo producto antes de enviar:', newProduct); // Verifica los datos en la consola
    try {
      const response = await axios.post('/api/product', newProduct);
      console.log('Producto subido:', response.data);
      fetchProducts();
      setNewProduct({
        title: '',
        photo: '',
        category: '',
        price: 0,
        stock: 0,
        size: [], // Añadir campos size y color
        color: []
      });
      setShow(false);
    } catch (error) {
      console.error('Error al subir el producto:', error);
    }
  };

  const setPhotoUrl = (url) => {
    console.log('URL de la imagen establecida:', url); // Verifica la URL en la consola
    setNewProduct({ ...newProduct, photo: url });
  };

  return (
    <>
      <Button variant="success" onClick={() => setShow(true)}>
        Agregar Producto
      </Button>
      
      <Row className="pt-3">
        {productos.map((product) => (
          <Col xs={12} md={6} lg={12} key={product._id} className="mb-4">
            <Card className="d-flex flex-row">
              <Card.Body className='d-flex justify-content-around'>
              <img src={product.photo} alt={product.title} className='w-25' />
                <Card.Text>
                  
                  <Card.Title>{product.title}</Card.Title>
                  <strong>Precio:</strong> ${product.price}<br />
                  <strong>Stock:</strong> {product.stock}
                </Card.Text>
                <div className="d-flex justify-content-between flex-column">
                  <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                    <Button variant="outline-primary" size="lg">
                      <PencilSquare />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                    <Button variant="outline-danger" size="lg">
                      <Trash />
                    </Button>
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="title" value={newProduct.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="photo">
              <Form.Label>URL de la Imagen</Form.Label>
              <UploadImage setPhotoUrl={setPhotoUrl} /> {/* Usa el componente aquí */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" name="category" value={newProduct.category} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="price" value={newProduct.price} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={newProduct.stock} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Subir Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductManagement;

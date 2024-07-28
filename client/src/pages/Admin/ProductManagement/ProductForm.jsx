import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UploadImage from './UploadImage';

const ProductForm = ({ show, handleClose, handleSubmit, isEditing, newProduct, handleChange, handlePriceChange, handleSizeClick, handleColorClick, setPhotoUrl }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="title" value={newProduct.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="photo">
            <Form.Label>Foto Principal</Form.Label>
            <UploadImage setPhotoUrl={setPhotoUrl} photoField="photo" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="photo2">
            <Form.Label>Foto Secundaria 1</Form.Label>
            <UploadImage setPhotoUrl={setPhotoUrl} photoField="photo2" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="photo3">
            <Form.Label>Foto Secundaria 2</Form.Label>
            <UploadImage setPhotoUrl={setPhotoUrl} photoField="photo3" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="photo4">
            <Form.Label>Foto Secundaria 3</Form.Label>
            <UploadImage setPhotoUrl={setPhotoUrl} photoField="photo4" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoría</Form.Label>
            <Form.Control type="text" name="category" value={newProduct.category} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="text" name="price" value={newProduct.price} onChange={handlePriceChange} required placeholder="1.000.000" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={newProduct.stock} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="size">
            <Form.Label>Talle</Form.Label>
            <div className="d-flex flex-wrap">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <Button
                  key={size}
                  variant={newProduct.size.includes(size) ? "primary" : "outline-primary"}
                  onClick={() => handleSizeClick(size)}
                  className="m-1"
                >
                  {size}
                </Button>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="color">
            <Form.Label>Color</Form.Label>
            <div className="d-flex flex-wrap">
              {['Blanco', 'Negro', 'Rojo', 'Azul'].map((color) => (
                <Button
                  key={color}
                  variant={newProduct.color.includes(color) ? "primary" : "outline-primary"}
                  onClick={() => handleColorClick(color)}
                  className="m-1"
                >
                  {color}
                </Button>
              ))}
            </div>
          </Form.Group>

          <Button className='text-dark' variant="primary" type="submit" style={{ backgroundColor: "#F2D8A7", borderColor: "#F2D8A7" }}>
            {isEditing ? 'Editar Producto' : 'Subir Producto'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;

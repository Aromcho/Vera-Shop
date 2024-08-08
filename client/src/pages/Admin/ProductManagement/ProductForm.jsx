import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UploadImage from './UploadImage.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import { FaImage } from 'react-icons/fa';

const ProductForm = ({
  show,
  handleClose,
  handleSubmit,
  isEditing,
  newProduct,
  handleChange,
  handlePriceChange,
  handleSizeClick,
  handleColorClick,
  setPhotoUrl,
}) => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentPhotoField, setCurrentPhotoField] = useState(null);

  const handleImageChange = (photoField, imageUrl) => {
    setPhotoUrl(photoField, imageUrl);
    setShowGallery(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Imagen Principal */}
          <Form.Group className="mb-3" controlId="photo">
            <Form.Label>Foto Principal</Form.Label>
            {newProduct.photo ? (
              <div
                className="position-relative"
                style={{
                  width: '200px',
                  height: '200px',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ccc',
                  fontSize: '24px',
                  borderRadius: '10px',
                }}
              >
                <img
                  src={newProduct.photo}
                  alt="Current"
                  className="img-preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
                <Button
                  variant="danger"
                  className="position-absolute top-0 end-0"
                  onClick={() => setPhotoUrl('photo', null)}
                  style={{
                    width: '24px',
                    height: '24px',
                    fontSize: '12px',
                    padding: '0',
                  }}
                >
                  X
                </Button>
              </div>
            ) : (
              <UploadImage setPhotoUrl={setPhotoUrl} photoField="photo" />
            )}
            <Button
              variant="success"
              className='text-dark mt-1'
              onClick={() => {
                setCurrentPhotoField('photo');
                setShowGallery(true);
              }}
              style={{ backgroundColor: "#F2D8A7", borderColor: "#F2D8A7" }}
            >
              <FaImage /> galería
            </Button>
          </Form.Group>

          {/* Imagen Secundaria 1 */}

          <Form.Group className="mb-3" controlId="photo2">
            <Form.Label>Foto Secundaria 1</Form.Label>
            {newProduct.photo2 ? (
              <div
                className="position-relative"
                style={{
                  width: '200px',
                  height: '200px',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ccc',
                  fontSize: '24px',
                  borderRadius: '10px',
                }}
              >
                <img
                  src={newProduct.photo2}
                  alt="Current"
                  className="img-preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
                <Button
                  variant="danger"
                  className="position-absolute top-0 end-0"
                  onClick={() => setPhotoUrl('photo2', null)}
                  style={{
                    width: '24px',
                    height: '24px',
                    fontSize: '12px',
                    padding: '0',
                  }}
                >
                  X
                </Button>
              </div>
            ) : (
              <UploadImage setPhotoUrl={setPhotoUrl} photoField="photo2" />
            )}
            <Button
              variant="success"
              className='text-dark mt-1'
              onClick={() => {
                setCurrentPhotoField('photo2');
                setShowGallery(true);
              }}
              style={{ backgroundColor: "#F2D8A7", borderColor: "#F2D8A7" }}
            >
              <FaImage /> galería
            </Button>
          </Form.Group>

          {/* Imagen Secundaria 2 */}
          <Form.Group className="mb-3" controlId="photo3">
            <Form.Label>Foto Secundaria 2</Form.Label>
            {newProduct.photo3 ? (
              <div
                className="position-relative"
                style={{
                  width: '200px',
                  height: '200px',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ccc',
                  fontSize: '24px',
                  borderRadius: '10px',
                }}
              >
                <img
                  src={newProduct.photo3}
                  alt="Current"
                  className="img-preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
                <Button
                  variant="danger"
                  className="position-absolute top-0 end-0"
                  onClick={() => setPhotoUrl('photo3', null)}
                  style={{
                    width: '24px',
                    height: '24px',
                    fontSize: '12px',
                    padding: '0',
                  }}
                >
                  X
                </Button>
              </div>
            ) : (
              <UploadImage setPhotoUrl={setPhotoUrl} photoField="photo3" />
            )}
            <Button
              variant="success"
              className='text-dark mt-1'
              onClick={() => {
                setCurrentPhotoField('photo3');
                setShowGallery(true);
              }}
              style={{ backgroundColor: "#F2D8A7", borderColor: "#F2D8A7" }}
            >
              <FaImage /> galería
            </Button>
          </Form.Group>

          {/* Imagen Secundaria 3 */}
          <Form.Group className="mb-3" controlId="photo4">
            <Form.Label>Foto Secundaria 3</Form.Label>
            {newProduct.photo4 ? (
              <div
                className="position-relative"
                style={{
                  width: '200px',
                  height: '200px',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ccc',
                  fontSize: '24px',
                  borderRadius: '10px',
                }}
              >
                <img
                  src={newProduct.photo4}
                  alt="Current"
                  className="img-preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
                <Button
                  variant="danger"
                  className="position-absolute top-0 end-0"
                  onClick={() => setPhotoUrl('photo4', null)}
                  style={{
                    width: '24px',
                    height: '24px',
                    fontSize: '12px',
                    padding: '0',
                  }}
                >
                  X
                </Button>
              </div>
            ) : (
              <UploadImage setPhotoUrl={setPhotoUrl} photoField="photo4" />
            )}
            <Button
              variant="success"
              className='text-dark mt-1'
              onClick={() => {
                setCurrentPhotoField('photo4');
                setShowGallery(true);
              }}
              style={{ backgroundColor: "#F2D8A7", borderColor: "#F2D8A7" }}
            >
              <FaImage /> galería
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handlePriceChange}
              required
              placeholder="1.000.000"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="size">
            <Form.Label>Talle</Form.Label>
            <div className="d-flex flex-wrap">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <Button
                  key={size}
                  variant={newProduct.size.includes(size) ? 'primary' : 'outline-primary'}
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
                  variant={newProduct.color.includes(color) ? 'primary' : 'outline-primary'}
                  onClick={() => handleColorClick(color)}
                  className="m-1"
                >
                  {color}
                </Button>
              ))}
            </div>
          </Form.Group>

          <Button
            className="text-dark"
            variant="primary"
            type="submit"
            style={{ backgroundColor: '#F2D8A7', borderColor: '#F2D8A7' }}
          >
            {isEditing ? 'Guardar' : 'Subir Producto'}
          </Button>
        </Form>
      </Modal.Body>
      <ImageGallery
        show={showGallery}
        handleClose={() => setShowGallery(false)}
        onSelectImage={(imageUrl) => handleImageChange(currentPhotoField, imageUrl)}
      />
    </Modal>
  );
};

export default ProductForm;

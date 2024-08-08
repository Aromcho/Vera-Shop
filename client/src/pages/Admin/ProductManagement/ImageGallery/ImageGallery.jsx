import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ImageGallery = ({ show, handleClose, onSelectImage }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/product/images');
        console.log('Respuesta de imágenes:', response);
        const data = response.data;
        
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setImages([]); // Resetea a un array vacío si la respuesta no es un array
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setImages([]); // Resetea a un array vacío en caso de error
      }
    };

    if (show) {
      fetchImages();
    }
  }, [show]);

return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Galería de Imágenes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex flex-wrap">
                {images.map((image, index) => (
                    <div key={index} className="m-2">
                        <img
                            src={image}
                            alt={`img-${index}`}
                            className="img-thumbnail"
                            onClick={() => onSelectImage(image)}
                            style={{ width: '120px', height: 'auto', cursor: 'pointer' }}
                        />
                    </div>
                ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
        </Modal.Footer>
    </Modal>
);
};

export default ImageGallery;

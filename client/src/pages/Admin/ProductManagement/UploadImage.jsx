import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const UploadImage = ({ setPhotoUrl }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.url;
      console.log('URL de la imagen subida:', imageUrl); // Verifica la URL en la consola
      setPhotoUrl(imageUrl); // Asegúrate de que esta línea se está ejecutando
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <div>
      <Form.Control type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Subir Imagen</Button>
    </div>
  );
};

export default UploadImage;

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const UploadImage = ({ setPhotoUrl, photoField }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const formData = new FormData();
    formData.append(photoField, file);

    try {
      const response = await axios.post('/api/product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data[photoField];
      console.log(`URL de la imagen subida (${photoField}):`, imageUrl);
      setPhotoUrl(photoField, imageUrl);
      setPreview(URL.createObjectURL(file));
    } catch (error) {
      console.error(`Error al subir la imagen (${photoField}):`, error);
    }
  };

  return (
    <div>
      <Form.Label htmlFor={`imageUpload-${photoField}`} className="image-upload-label">
        <div className="image-upload-placeholder">
          {preview ? (
            <img src={preview} alt="Preview" className="img-preview" />
          ) : (
            <i className="bi bi-upload"></i>
          )}
        </div>
      </Form.Label>
      <Form.Control type="file" id={`imageUpload-${photoField}`} onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
};

export default UploadImage;

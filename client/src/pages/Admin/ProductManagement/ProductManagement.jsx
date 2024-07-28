import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './ProductManagement.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const ProductManagement = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    photo: '',
    photo2: '',
    photo3: '',
    photo4: '',
    category: '',
    price: '',
    stock: 0,
    size: [],
    color: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSizeClick = (size) => {
    setNewProduct((prevState) => ({
      ...prevState,
      size: prevState.size.includes(size) ? prevState.size.filter((s) => s !== size) : [...prevState.size, size]
    }));
  };

  const handleColorClick = (color) => {
    setNewProduct((prevState) => ({
      ...prevState,
      color: prevState.color.includes(color) ? prevState.color.filter((c) => c !== color) : [...prevState.color, color]
    }));
  };

  const formatPrice = (price) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const onlyNumbers = value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
    const formattedPrice = formatPrice(onlyNumbers);
    setNewProduct({ ...newProduct, price: formattedPrice });
    e.target.value = formattedPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      price: newProduct.price.replace(/\./g, '') // Eliminar los puntos antes de enviar
    };
    console.log('Datos del nuevo producto antes de enviar:', productData); // Verifica los datos en la consola
    try {
      if (isEditing) {
        const response = await axios.put(`/api/product/${editingProductId}`, productData);
        console.log('Producto editado:', response.data);
      } else {
        const response = await axios.post('/api/product', productData);
        console.log('Producto subido:', response.data);
      }
      fetchProducts();
      setNewProduct({
        title: '',
        photo: '',
        photo2: '',
        photo3: '',
        photo4: '',
        category: '',
        price: '',
        stock: 0,
        size: [],
        color: []
      });
      setShow(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Mostrar alerta por 3 segundos
    } catch (error) {
      console.error('Error al subir el producto:', error);
    }
  };

  const setPhotoUrl = (photoField, url) => {
    console.log(`URL de la imagen establecida (${photoField}):`, url);
    setNewProduct({ ...newProduct, [photoField]: url });
  };

  const handleEdit = (product) => {
    setNewProduct({
      title: product.title,
      photo: product.photo,
      photo2: product.photo2,
      photo3: product.photo3,
      photo4: product.photo4,
      category: product.category,
      price: formatPrice(String(product.price)),
      stock: product.stock,
      size: product.size,
      color: product.color
    });
    setIsEditing(true);
    setEditingProductId(product._id);
    setShow(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <>
      <Button className='text-dark' variant="success" onClick={() => { setShow(true); setIsEditing(false); }} style={{ backgroundColor: "#F2D8A7", borderColor: "#F2D8A7" }}>
        Agregar Producto
      </Button>

      <Alert show={showAlert} variant="success">
        Producto {isEditing ? 'editado' : 'subido'} exitosamente.
      </Alert>

      <ProductList productos={productos} handleEdit={handleEdit} handleDelete={handleDelete} />

      <ProductForm
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        newProduct={newProduct}
        handleChange={handleChange}
        handlePriceChange={handlePriceChange}
        handleSizeClick={handleSizeClick}
        handleColorClick={handleColorClick}
        setPhotoUrl={setPhotoUrl}
      />
    </>
  );
};

export default ProductManagement;

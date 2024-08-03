import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import ItemList from '../ItemList/ItemList.jsx';
import { Spinner } from 'react-bootstrap';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const { category: categoryParam } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(categoryParam);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setCategory(categoryParam);
    setPage(1); // Reset page to 1 when category changes
  }, [categoryParam]);

  const fetchProducts = async () => {
    try {
      let url = `/api/product/paginate?limit=15&page=${page}`;
      if (category) {
        url += `&category=${category}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.response);
      setNextPage(data.info.nextPage);
      setPrevPage(data.info.prevPage);
      setTotalPages(Math.ceil(data.info.total / 15));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, page]);

  if (loading) {
    return (
      <div className="loading-container text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  return (
    <ItemList
      setPage={setPage}
      page={page}
      totalPages={totalPages}
      prevPage={prevPage}
      nextPage={nextPage}
      products={products}
      addToCart={addToCart}
      category={category}
      setCategory={setCategory}
      initialProducts={products} // Pasar productos paginados como initialProducts
    />
  );
};

export default ItemListContainer;

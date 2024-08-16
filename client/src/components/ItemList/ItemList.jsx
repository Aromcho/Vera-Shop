import React, { useEffect, useState, useRef } from "react";
import { Search } from 'react-bootstrap-icons';
import {
  Container,
  ButtonGroup,
  Button,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Item from "../Item/Item.jsx";
import "./ItemList.css";
import debounce from "lodash/debounce";

const ItemList = ({
  page,
  addToCart,
  setPage,
  prevPage,
  nextPage,
  totalPages,
  category,
  setCategory,
  initialProducts, // Recibe los productos iniciales paginados
}) => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Estado para determinar si se está realizando una búsqueda

  useEffect(() => {
    setCategory(categoryParam);
    if (!isSearching) {
      fetchPaginatedProducts(category, page); // Llamar a fetchPaginatedProducts al cambiar de categoría o página
    }
  }, [categoryParam, setCategory, category, page, isSearching]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Función para obtener productos paginados desde el backend
  const fetchPaginatedProducts = async (category, page) => {
    try {
      let url = `/api/product/paginate?limit=15&page=${page}`;
      if (category) {
        url += `&category=${category}`;
      }

      const response = await axios.get(url);

      if (Array.isArray(response.data.response)) {
        setProducts(response.data.response);
      } else {
        console.error("La respuesta del servidor no es un array:", response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al obtener productos paginados:", error);
      setProducts([]);
    }
  };

  // Función para obtener productos desde el backend con debounce
  const fetchProducts = debounce(async (query) => {
    if (!query) {
      fetchPaginatedProducts(category, page); // Si no hay búsqueda, mostrar productos iniciales paginados
      setIsSearching(false);
      return;
    }

    try {
      // Utilizar el endpoint de búsqueda con el parámetro correcto
      const response = await axios.get(`/api/product/search?title=${query}`);

      if (Array.isArray(response.data)) {
        setProducts(response.data);
        setIsSearching(true);
      } else {
        console.error("La respuesta del servidor no es un array:", response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al buscar productos:", error);
      setProducts([]);
    }
  }, 300); // Debounce de 300ms

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setSearchQuery(""); // Limpiar la búsqueda al cambiar de categoría
    navigate(`/products/real/${newCategory || ""}`);
    fetchPaginatedProducts(newCategory, 1); // Obtener productos paginados de la nueva categoría
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchProducts(query); // Ejecutar búsqueda con debounce
  };

  return (
    <section className="d-flex flex-column mb-2">
      <div className="hero-list">
        <div className="overlay w-100 d-flex align-items-center justify-content-center flex-column">
          <h6 className="mt-5">Descubre la Esencia de la Moda Italiana.</h6>
          <Form className="w-100 mt-3" onSubmit={(e) => e.preventDefault()}>
      <div className="input-group search-bar">
        <FormControl
          type="text"
          placeholder="Buscar"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          ref={searchInputRef}
        />
        <Button
  variant="link"
  className="search-button"
  onClick={() => fetchProducts(searchQuery)}
>
  <Search />
</Button>
      </div>
    </Form>
        </div>
      </div>
      <Container className="p-1 mb-1">
        <Dropdown className="mb-4">
          <Dropdown.Toggle variant="outline-dark" size="sm" id="dropdown-basic">
            {category ? category : "Filtrar"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleCategoryChange(null)}>
              Todos
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Camperas Importadas")}>
              Camperas Importadas
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Blusas")}>
              Blusas
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Sweaters")}>
              Sweaters
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="container item-list">
          {products.length > 0 ? (
            products.map((product) => (
              <Item key={product._id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </Container>
      {!isSearching && ( // Mostrar paginación solo si no se está buscando
        <div className="d-flex justify-content-around mt-4">
          <Button onClick={() => setPage(prevPage)} disabled={!prevPage}>
            Anterior
          </Button>
          <ButtonGroup aria-label="First group">
            <Button variant="secondary">{page}</Button>{" "}
            <Button variant="secondary">{page + 1}</Button>{" "}
            <Button variant="secondary">{page + 2}</Button>{" "}
            <Button variant="secondary">{page + 3}</Button>
          </ButtonGroup>
          <Button onClick={() => setPage(nextPage)} disabled={!nextPage}>
            Siguiente
          </Button>
        </div>
      )}
    </section>
  );
};

export default ItemList;

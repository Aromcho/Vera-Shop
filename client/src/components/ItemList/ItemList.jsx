import React, { useEffect } from "react";
import { Nav, Container, ButtonGroup, Button, Dropdown, Form, FormControl } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../Item/Item.jsx";
import "./ItemList.css";

const ItemList = ({
  products,
  page,
  addToCart,
  setPage,
  prevPage,
  nextPage,
  totalPages,
  category,
  setCategory
}) => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam, setCategory]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    navigate(`/products/real/${newCategory || ""}`);
  };

  return (
    <section className="d-flex flex-column mb-2">
      <div className="hero-list">
        <div className="overlay w-100  d-flex align-items-center justify-content-center flex-column">
      <h6 className=" mt-5 ">Descubre la Esencia de la Moda Italiana.</h6>
        <Form inline className="w-50 mt-3">
          <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
          <Button variant="outline-dark">Buscar</Button>
        </Form>
      </div>
      
      </div>
      <Container className="p-1 mb-1">
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="outline-dark" size="sm" id="dropdown-basic">
          {category ? category : "Filtrar"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleCategoryChange(null)}>Todos</Dropdown.Item>
          <Dropdown.Item onClick={() => handleCategoryChange('Ropa')}>Ropa</Dropdown.Item>
          <Dropdown.Item onClick={() => handleCategoryChange('Calzado')}>Calzado</Dropdown.Item>
          <Dropdown.Item onClick={() => handleCategoryChange('Accesorios')}>Accesorios</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
        <div className="container item-list">
          {products.map((product) => (
            <Item key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </Container>
      <div className="d-flex justify-content-around mt-4">
        <Button onClick={() => setPage(prevPage)} disabled={!prevPage}>Anterior</Button>
        <ButtonGroup aria-label="First group">
          <Button variant="secondary">{page}</Button>{' '}
          <Button variant="secondary">{page + 1}</Button>{' '}
          <Button variant="secondary">{page + 2}</Button>{' '}
          <Button variant="secondary">{page + 3}</Button>
        </ButtonGroup>
        <Button onClick={() => setPage(nextPage)} disabled={!nextPage}>Siguiente</Button>
      </div>
    </section>
  );
};

export default ItemList;

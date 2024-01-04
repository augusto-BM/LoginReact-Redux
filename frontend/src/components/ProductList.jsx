//=============================== INTERFAZ TABLA PARA LISTAR PRODUCTOS ===========================

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {

  // *****************   METODOS PARA LISTAR LOS DATOS DE LA TABBLA PRODUCTOS ******************
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts(); //despues de eliminar volvera a listar los productos menos el eliminado  
  };
  // *********************************************************************************************
  return (
    <div>
      <h1 className="title">Productos</h1>
      <h2 className="subtitle">Lista de Productos</h2>
      <Link to="/products/add" className="button is-primary mb-2">
        Añadir nuevo producto
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nombre del producto</th>
            <th>Precio</th>
            <th>Creado por</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {/* BUCLE PARA RECORRER TODOS LOS PRODUCTOS Y LISTARLOS */}
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.user.name}</td>
              <td>
                <Link
                  to={`/products/edit/${product.uuid}`}
                  className="button is-small is-info"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  className="button is-small is-danger"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
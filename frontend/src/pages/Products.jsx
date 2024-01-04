//- AQUI LLAMAMOS AL COMPONENTE INTERFAZ PRODUCTLIST.JSX QUE ES PARA LISTAR PRODUCTOS en dashboard -------

import React, { useEffect } from "react";
import Layout from "./Layout";
import ProductList from "../components/ProductList";

/*  =================   NO PODEMOS ACCEDER SI NO HEMOS INICIADO SESSION   ========================= */ 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  // ==================================================================================================

  return (
    //En el layaout esta nuestro navbar y sidebar
    <Layout>
      {/* El productlist aparece al lado derecho del sidebar y el navbar aparece arriba de ellos dos*/}
      <ProductList />
    </Layout>
  );
};

export default Products;
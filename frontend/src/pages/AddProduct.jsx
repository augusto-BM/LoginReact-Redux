//-   AQUI LLAMAMOS AL COMPONENTE INTERFAZ FormAddProduct.JSX QUE ES PARA CREAR PRODUCTOS en dashboard ------

import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddProduct from "../components/FormAddProduct";

/*  =================   NO PODEMOS ACCEDER SI NO HEMOS INICIADO SESSION   ========================= */ 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddProduct = () => {
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
      {/* El FormAddProduct aparece al lado derecho del sidebar y el navbar aparece arriba de ellos dos*/}
      <FormAddProduct />
    </Layout>
  );
};

export default AddProduct;
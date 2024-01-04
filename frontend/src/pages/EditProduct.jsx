import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditProduct from "../components/FormEditProduct";

/*  =================   NO PODEMOS ACCEDER SI NO HEMOS INICIADO SESSION   ========================= */ 

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
//-   AQUI LLAMAMOS AL COMPONENTE INTERFAZ FormAddProduct.JSX QUE ES PARA CREAR PRODUCTOS en dashboard ------

const EditProduct = () => {
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
    //En el layout esta nuestro navbar y sidebar
    <Layout>
      {/* El FormEditProduct aparece al lado derecho del sidebar y el navbar aparece arriba de ellos dos*/}
      <FormEditProduct />
    </Layout>
  );
};

export default EditProduct;
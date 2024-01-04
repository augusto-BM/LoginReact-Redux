//=========================   AQUI LLAMAMOS AL LAYOUT.JSX QUE CONTIENE AL NAVBAR Y SIDEBAR ==================

import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";

/*  =================   NO PODEMOS ACCEDER SI NO HEMOS INICIADO SESSION   ========================= */ 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //tomamos los valores de la tienda de redux
  const { isError } = useSelector((state) => state.auth);

  //PARA DESPACHAR LOS DATOS CUANDO  INICIA SESION CORRECTAMENTE y se obtinen los datos y configuran automaticamente en las coockies 
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  //PARA VALIDAR LOS DATOS QUE HAYAN SIDO CORRECTOS
  useEffect(() => {
    //si existe un error te redirige automaticamente al inicia de sesion (redireccionar manualmente el link de inicia)
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
// ==================================================================================================

  return (
    //ESTE ES EL LAYOUT.JSX
    <Layout>
      {/* ESTE ES EL ARCHIVO WELCOME.JSX */}
      <Welcome />
    </Layout>
  );
};

export default Dashboard;
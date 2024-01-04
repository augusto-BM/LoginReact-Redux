//----   AQUI LLAMAMOS AL COMPONENTE INTERFAZ USERLIST.JSX QUE ES PARA LISTAR USUARIOS en dashboard   -----

import React, { useEffect } from "react";
import Layout from "./Layout";
import Userlist from "../components/Userlist";

/*  =================   NO PODEMOS ACCEDER SI NO HEMOS INICIADO SESSION   ========================= */ 

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    //SI EL ROL DEL USUARIO NO ES EL MISMO QUE EL DE ADMINISTRADOR (Si el trabajador selecciona usuarios se redirecciona a dashboard no tiene acceso a los usuarios)
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
    
  }, [isError, user, navigate]);
  // ==================================================================================================

  return (
    //En el layaout esta nuestro navbar y sidebar
    <Layout>
      {/* El userlist aparece al lado derecho del sidebar y el navbar aparece arriba de ellos dos*/}
      <Userlist />
    </Layout>
  );
};

export default Users;
//-   AQUI LLAMAMOS AL COMPONENTE INTERFAZ FormAddUser.JSX QUE ES PARA EDITAR USUARIOS en dashboard ------

import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditUser from "../components/FormEditUser";

/*  =================   NO PODEMOS ACCEDER SI NO HEMOS INICIADO SESSION   ========================= */ 

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditUser = () => {
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
    //SI EL ROL DEL USUARIO NO ES EL MISMO QUE EL DE ADMINISTRADOR(Si el trabajador selecciona usuarios se redirecciona a dashboard no tiene acceso a los usuarios)
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  // ==================================================================================================

  return (
    //En el layout esta nuestro navbar y sidebar
    <Layout>
      {/* El FormEditUser aparece al lado derecho del sidebar y el navbar aparece arriba de ellos dos*/}
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
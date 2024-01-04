//==========================   INTERFAZ BIENVENIDO  ==========================
//APARECE CUANDO EL USUARIO INGRESA AL DASHBOARD APARECE EL TITULO Y RECUPERA EL NOMBRE DEL USUARIO

import React from "react";

//ESTE useSelector sirve para recuperar el nombre de usuario
import { useSelector } from "react-redux";

const Welcome = () => {
  //llamamos el valor del usuario de manera global gracias al "useSelector"
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Bienvenido denuevo <strong>{user && user.name}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
// ======================================  INTERFAZ DE LOGIN   =====================================

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  //tomamos los valores de la tienda de redux (El valor de "auth" lo usamos en el onSubmit del form)
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    //Si el usuario se ha logueado con exito se redirige al dashboard
    if (user || isSuccess) {
      navigate("/dashboard");
    }  
    //luego se restablece denuevo el estado se reinicia
    dispatch(reset());
    //luego se agrega las dependencias del usuario
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">

              <form onSubmit={Auth} className="box">

                {/* ESTE ES EL MENSAJE DE ERROR QUE DA LOS VALORES DE LA TIENDA DE REDUX*/}
                {isError && <p className="has-text-centered">{message}</p>}

                <h1 className="title is-2">Inicia Sesion</h1>
                <div className="field">
                  <label className="label">Correo:</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Contraseña:</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {/* Si la carga es verdadera usamos el valor de la tienda de redux "isLoading" que indica que fue exitoso el inicio de sesion y se encuentra en la etapa de cargando los datos si es falso se queda en su estado inicial boton llamado "Iniciar Sesion" y tambien invoca el valor de la tienda de redux "isError" para mostrar cual fue el error  */}
                    {isLoading ? "Cargando..." : "Iniciar Sesion"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
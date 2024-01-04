//==========================   INTERFAZ SIDEBAR ==========================

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";


import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    //para cerrar sesion
    dispatch(LogOut());
    //para restablecer denuevo el valor del estado
    dispatch(reset());
    //Finalmente se redirige ala interfaz principal
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>
              <IoPricetag /> Productos
            </NavLink>
          </li>
        </ul>
        
        {/* Si su usuario es tipo administrador tiene acceso ala opcion del  menu donde estan las de cuentas de usuarios  */}
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Administrador</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Usuarios
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Configuraciones</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Cerrar Sesion
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
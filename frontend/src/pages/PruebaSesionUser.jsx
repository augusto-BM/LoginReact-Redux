import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const PruebaSesionUser = () => {
  return (
    <div>
        <NavLink to="/" className="navbar-item">
          <h1>Salir</h1>
        </NavLink>
    </div>
  )
}

export default PruebaSesionUser
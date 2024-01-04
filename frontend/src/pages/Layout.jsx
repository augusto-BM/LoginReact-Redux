//==========================  AQUI LLAMAMOS A LOS COMPONENTES NAVBAR Y SIDEBAR  ========================

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    //ESTE ES UN FRAGMENTO DE REACCION
    <React.Fragment>

      {/* ESTE ES EL NAVBAR */}
      <Navbar />

      {/* ESTE ES EL SIDEBAR */}
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <Sidebar />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
      
    </React.Fragment>
  );
};

export default Layout;
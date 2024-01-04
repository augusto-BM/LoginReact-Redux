// ============ ESTE ARCHIVO INDICA QUE EL PROYECTO ESTA INTEGRADO CON EL KIT DE HERRAMIENTAS DE REDUX ====
import { configureStore } from '@reduxjs/toolkit';
//Añadimos el reductor
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    //este es el reductor del authSlice que es la accion del componente para iniciar sesion 
    auth: authReducer
    //luego lo invocamos en components/login.jsx
  },
});
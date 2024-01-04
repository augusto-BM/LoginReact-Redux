import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import db from "./config/Database.js";

//Para que la sesion siga iniciada aunque el servidor se reinicie o el internet del usuario se vaya por un momento
import SequelizeStore from "connect-session-sequelize"; 

import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();


const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

//  ====== PARA EJECUTAR LAS SENTENCIAS SQL DE CREACION DE DATOS DE LA CARPETA MODELS (lOS DOS ARCHIVOS) ========
/* (async()=>{
await db.sync();
})(); */
//===============================================================================================================

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,

    //Vamos a almacenar los datos de la sesion iniciada aca temporalmente  session-sequelize
    store: store, 


    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

//========== Se crea la tabla de session-sequelize temporalmente mientras este logueado =========
//store.sync();
//===============================================================================================0

app.listen(process.env.APP_PORT, ()=> {
    console.log('Servidor esta corriendo en el puerto 5000...');
});
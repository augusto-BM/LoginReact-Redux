// ================  AQUI SE LLAMA TODOS LOS METODOS CREADOS DEL CONTROLADOR (User.js) ========================
 
import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

//LISTAR TODOS LOS USUARIOS
router.get('/users', verifyUser, adminOnly, getUsers);

//LISTAR UN USUARIO
router.get('/users/:id', verifyUser, adminOnly, getUserById);

//CREAR UN USUARIO
router.post('/users', verifyUser, adminOnly, createUser);

//EDITAR UN USUARIO
router.patch('/users/:id', verifyUser, adminOnly, updateUser);

//BORRAR UN USUARIO
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;
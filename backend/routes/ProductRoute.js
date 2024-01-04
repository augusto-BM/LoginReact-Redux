// ================  AQUI SE LLAMA TODOS LOS METODOS CREADOS DEL CONTROLADOR (Products.js) ========================

import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js";

//Solo los usuarios registrados tengan acceso a este producto(admin o trabajador)
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/products',verifyUser, getProducts);
router.get('/products/:id',verifyUser, getProductById);
router.post('/products',verifyUser, createProduct);
router.patch('/products/:id',verifyUser, updateProduct);
router.delete('/products/:id',verifyUser, deleteProduct);

export default router;
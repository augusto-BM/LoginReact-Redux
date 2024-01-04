//==============  ESTE ES EL CONTROLADOR DE PRODUCTOS QUE SE IMPORTA DESDE MODELO  ====================

import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

//LISTAR TODOS LOS PRODUCTOS (solicitud, respuesta)
export const getProducts = async (req, res) =>{
    try {
        let response;

        // "req.role" variable del middleware que creamos para validar que el usuario sea logueado (verifyUser)
        if(req.role === "admin"){
            //solo el administrador tiene acceso a el listado de todos los productos
            response = await Product.findAll({
                attributes:['uuid','name','price'],

                //incluimos el usuario que tiene acceso a los productos (saber quien esta obteniendo los productos)
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            //solo el trabajador tiene acceso a el listado de los productos que tiene relacion(ha creado el)
            response = await Product.findAll({
                attributes:['uuid','name','price'],

                //solo si su id de usuario(trabajador) tiene relacion con su id de productos
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//LISTAR UN PRODUCTO
export const getProductById = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
        if(req.role === "admin"){
            response = await Product.findOne({
                attributes:['uuid','name','price'],
                //Puede ver todos los productos creados (todos los productos con Id)
                where:{
                    id: product.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Product.findOne({
                attributes:['uuid','name','price'],

                //solo puede ver los productos que estan relacionado con su ID(productos creados por el trabajador)
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//CREAR UN PRODUCTO
export const createProduct = async(req, res) =>{
    const {name, price} = req.body;
    try {
        await Product.create({
            name: name,
            price: price,
            //req.userId es dato del middleware
            userId: req.userId
        });
        res.status(201).json({msg: "Producto creado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//EDITAR UN PRODUCTO
export const updateProduct = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});

        //SI SE ENCUENTRAN LOS DATOS
        const {name, price} = req.body;
        if(req.role === "admin"){
            await Product.update({name, price},{

                //El admin puede actualizar todos los productos los que tengan Id
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Acceso esta prohibido, solo administadores"});
            await Product.update({name, price},{

                //El trabajador solo puede actualizar los productos que el ha creado
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Producto actualizado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//BORRAR UN PRODUCTO
export const deleteProduct = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        const {name, price} = req.body;
        if(req.role === "admin"){
            await Product.destroy({
                
                //El admin puede eliminar todos los productos que tengan Id
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Acceso esta prohibido, solo administadores"});
            await Product.destroy({

                //El trabajador puede eliminar los productos que el ha creado que esta realcionado con su ID
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Produco eliminado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
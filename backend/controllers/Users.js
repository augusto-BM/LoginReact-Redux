// ==================  ESTE ES EL CONTROLADOR DE USUARIO QUE SE IMPORTA DESDE MODELO  ==================
import User from "../models/UserModel.js";

import argon2 from "argon2";  //PERMITE QUE LA CONTRASEÑA TENGA UN ENCRIPTADO DE TIPO HASH

//LISTAR TODOS LOS USUARIOS
export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['uuid','name','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//LISTAR UN USUARIO
export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes:['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//CREAR UN USUARIO
export const createUser = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Las contraseñas no coinciden"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Registro exitoso"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

//EDITAR UN USUARIO
export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "El usuario no existe"});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Las contraseñas no coinciden"});
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Usuario Actualizado"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

//BORRAR UN USUARIO
export const deleteUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "El usuario no existe"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Usuario eliminado"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
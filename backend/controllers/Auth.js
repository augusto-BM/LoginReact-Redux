//====================  FUNCIONES PARA INICIAR SESION Y CERRAR SESION  =======================

import User from "../models/UserModel.js";
import argon2 from "argon2";

//FUNCION PARA INICIAR SESION
export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no existe"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Contraseña incorrecta"});

    //Si la contraseña coincide entonces configuramos la sesion
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}
//FUNCION PARA OBTENER LA DATA DE LA SESION DEL USUARIO LOGUEADO
export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Tienes que iniciar sesion en tu cuenta de usuario!"});
    }

    //SI EXISTE UNA CUENTA DE SESION EN LA BASE DE DATOS
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no existe"});
    res.status(200).json(user);
}

//FUNCION PARA CERRAR SESION
export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "No se pudo cerrar sesion"});
        res.status(200).json({msg: "Ha cerrado la sesion"});
    });
}
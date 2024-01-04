import User from "../models/UserModel.js";

//FUNCION PARA VERIFICAR QUE ESXISTE EL USUARIO (no podemos acceder al usuario si no hemos iniciado sesion)
export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Tienes que iniciar sesion en tu cuenta de usuario!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no existe"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}

//FUNCION PARA QUE SOLO EL ADMINISTRADOR PUEDA TENER CONTROL DE EL DASHBOARD y no los trabajadores
//Al igual que no podemos hacer operaciones si no hemos inicido sesion como adm  (CRUD dashboard)
export const adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no existe"});
    if(user.role !== "admin") return res.status(403).json({msg: "Acceso prohibido, solo administradores"});
    next();
}
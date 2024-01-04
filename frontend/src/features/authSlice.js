import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//ESTADO INCIAL (valores de la tienda de redux)
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

//METODO PARA HACER UNA SOLICITUD A NUESTRA API DE INICIAR SESION
export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if(error.response){
            //thunkAPI es para el manejo de errores
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

//METODO PARA OBTENER EL INICIO DE SESION DEL USUARIO LOGUEADO
export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/me');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

//METODO PARA OBTENER EL CIERRE DE SESION DEL USUARIO DESLOGUEADO
export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete('http://localhost:5000/logout');
});

//Este sirve para resetear el estado
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    //Para manejar los createAsyncThunk sirve los extraReducers
    extraReducers:(builder) =>{
        //cambiamos el estado de la carga de datos cuando esta inciando sesion
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true;
        });
        //cuando ya cargo los datos vuelve a ser falso y la cargar de sesion se vuelve true y obtenemos con exito los datos del usuario
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        //Si cuando uno ocurre un error
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        //TENEMOS QUE PROTEGER EL VALOR DEL ESTADO EN EL DASHBOARD PARA QUE NADIE TENGA ACCESO A ELLOS MEDIANTE REDIRECCION MANUALMENTE DEL USUARIO A LOS COMPONENTES

        // Get User Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

//EXPORTAMOS FUNCIONES IMPORTANTE PARA EL STORE (App/store.js)

//Exportamos funcion de reinicio
export const {reset} = authSlice.actions;
//Exportamos funcion de Cuando es rechazado
export default authSlice.reducer;
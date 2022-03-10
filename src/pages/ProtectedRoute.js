import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
    let auth = false
 
    if(localStorage.getItem('user_id') != 0){
        auth = true
     
    }else{
        auth = false
      
    }
    

    // Si está autorizado, devuelve una salida que generará elementos secundarios
    // Si no, devuelve el elemento que navegará a la página de inicio de sesión

    return auth ? <Outlet/> : <Navigate to="/login" />;
}

export default PrivateRoute;
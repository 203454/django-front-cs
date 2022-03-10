import axios from 'axios';
import React, { useState } from 'react';
// import { Link, Outlet, useNavigate } from "react-router-dom";
import './login.css';

function Login() {


  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");


  var postData = {
    "username": `${nombre}`,
    "password": `${password}`,
  }


  const consumir_login = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/v1/v2/Login", postData, {
        Headers: { "Content-Type": "application/json", },
      })
      .then((response) => {

        console.log(response);
        localStorage.setItem('token', response.data['token']);
        localStorage.setItem('user_id', response.data['user_id']);
        alert("Inicio de sesion correcto")
      
        
      })
      .catch((error) => {
        alert("DATOS INCORRECTOS")
        console.log(error.response.data.password[0]);
        console.log(error.response.data.username[0]);
        
      });
  };



  return (
    <div className='contenedor'>

      <form className='form-login'>
        <div className='campos-cont'>
          <h2 className='titulo'>Iniciar sesion</h2>
          <label className='labels' htmlFor='usuario'>
            Usuario
          </label>
          <input className='controls' type="text" id='usuario' name='usuario' value={nombre} onChange={
            (e) => setNombre(e.target.value)
          }>
          </input>

          <label className='labels' htmlFor='password'>
            Contraseña
          </label>


          <input className='controls' type="text" id='password' name='password' value={password} onChange={
            (e) => setPassword(e.target.value)
          }>
          </input>

          <div className=''>
            <button className='buttons' onClick={consumir_login}>Iniciar sesion</button>
          </div>

          <p>No tienes una cuenta? Crea una</p>
        </div>
      </form>
    </div>

  );



}

export default Login;

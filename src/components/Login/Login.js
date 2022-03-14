import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { Link, Outlet, useNavigate } from "react-router-dom";
import './login.css';
import '../bulma.css'

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
    <div className='contenedor-login'>

      <form className='form-login'>
        <h2 className='titulo'>Iniciar sesion</h2>

        <div class="field">
          <label class="label">Usuario</label>
          <div class="control">
            <input class="input" type="text" placeholder="user" value={nombre} onChange={
              (e) => setNombre(e.target.value)} />
          </div>
        </div>

        <div class="field">
          <label class="label">Constraseña</label>
          <div class="control">
            <input class="input" type="password" placeholder="*******" value={password} onChange={
              (e) => setPassword(e.target.value)} />
          </div>
        </div>

        {/* <div className='campos-cont'> */}

        <p className='question-login'>No tienes una cuenta? <NavLink to='/register'> Crea una</NavLink> </p>
        <div class='control'>
          <button className='button is-primary' onClick={consumir_login}>Iniciar sesion</button>
        </div>
        {/* </div> */}


      </form>
    </div>

  );



}

export default Login;

import axios from 'axios';
import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import './register.css'

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  
  var postData = {
    "username": `${username}`,
    "password": `${password}`,
    "password2": `${password2}`,
    "email": `${email} `,
    "first_name": `${first_name} `,
    "last_name": `${last_name} `
  }
  console.log(postData)

  const consumir_register = () => {
    axios
      .post("http://localhost:8000/api/v1/register/createUser/", postData, {
        Headers: { "Content-Type": "application/json", },
      })
      .then((response) => {

        console.log(response);

        handleClick();

      })
      .catch((error) => {

        console.log(error.response.data.username[0])
        console.log(error.response.data.email[0])
        console.log(error.response.data.password[0])
      });
  };




  const handleClick = () => {
    navigate('/Login');
  };


  return (

    <div name='contenedor'>
      <form className='form-register'>
        <div className='campos-cont'>

          <h2 className="titulo">Formulario</h2>
          <label className='labels' htmlFor='username'>
            Usuario
          </label>
          <input className='controls' type="text" id='username' name='username' value={username} onChange={
            (e) => setUsername(e.target.value)
          }>
          </input>

          <label className='labels' htmlFor='password'>
          contraseña
          </label>
          <input className='controls' type="password" id='password' name='password' value={password} onChange={
            (e) => setPassword(e.target.value)
          }>
          </input>

          <label className='labels' htmlFor='password2'>
          confirmar contraseña
          </label>
          <input className='controls' type="password" id='password2' name='password2' value={password2} onChange={
            (e) => setPassword2(e.target.value)
          }>
          </input>


          <label className='labels' htmlFor='email'>
            email
          </label>
          <input className='controls' type="text" id='email' name='email' value={email} onChange={
            (e) => setEmail(e.target.value)
          }>
          </input>


          <label className='labels' htmlFor='first_name'>
            Nombre(s)
          </label>
          <input className='controls' type="text" id='first_name' name='first_name' value={first_name} onChange={
            (e) => setFirst_name(e.target.value)
          }>
          </input>


          <label className='labels' htmlFor='last_name'>
            Apellidos
          </label>
          <input className='controls' type="text" id='last_name' name='last_name' value={last_name} onChange={
            (e) => setLast_name(e.target.value)
          }>
          </input>
          <button className='buttons' onClick={consumir_register}>Registrarse</button>

        </div>
      </form>
    </div>

  )
}

export default Register;
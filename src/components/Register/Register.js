import axios from 'axios';
import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import './register.css'
import '../bulma.css'

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

        <h2 className="titulo">Registrarse</h2>

        <div class="field">
          <label class="label">Usuario</label>
          <div class="control">
            <input class="input" type="text" placeholder="user" value={username} onChange={
              (e) => setUsername(e.target.value)} />
          </div>
        </div>

        <div class="field">
          <label class="label">contraseña</label>
          <div class="control">
            <input class="input" type="password" placeholder="user" value={password} onChange={
              (e) => setPassword(e.target.value)
            } />
          </div>
        </div>

        <div class="field">
          <label class="label">confirmar contraseña</label>
          <div class="control">
            <input class="input" type="password" placeholder="user" value={password2} onChange={
              (e) => setPassword2(e.target.value)} />
          </div>
        </div>

        <div class="field">
          <label class="label">email</label>
          <div class="control">
            <input class="input" type="text" placeholder="example@domain.ex" value={email} onChange={
              (e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div class="field">
          <label class="label">Nombre(s)</label>
          <div class="control">
            <input class="input" type="text" placeholder="Ciro Eduardo" value={first_name} onChange={
              (e) => setFirst_name(e.target.value)} />
          </div>
        </div>

        <div class="field">
          <label class="label">Apellidos</label>
          <div class="control">
            <input class="input" type="text" placeholder="Gomez Diaz" value={last_name} onChange={
              (e) => setLast_name(e.target.value)} />
          </div>
        </div>

        <div class="field">
          <p class="control">
            <button class="button is-success" onClick={consumir_register}>
              Registrarse
            </button>
          </p>
        </div>
        
      </form>
    </div>

  )
}

export default Register;
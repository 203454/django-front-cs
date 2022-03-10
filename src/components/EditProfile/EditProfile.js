import React, { useState } from 'react';
import image_default from './imagen_default.png'
import './editProfile.css'
import axios from 'axios';

export default function EditProfile(props) {

  let { usuarioPersonalData, usuarioImageData } = props;



  const [username, setUsername] = useState(usuarioPersonalData.username);
  const [email, setEmail] = useState(usuarioPersonalData.email);
  const [first_name, setFirst_name] = useState(usuarioPersonalData.first_name);
  const [last_name, setLast_name] = useState(usuarioPersonalData.last_name);
  let token = localStorage.getItem('token');

  const data = {
    'username': username,
    'first_name': first_name,
    'last_name': last_name,
    'email': email
  }

  const consumir_updateUser = (e) => {

    axios
      .put("http://localhost:8000/api/v1/profile/data/user/detail/" + localStorage.getItem('user_id'), data,
        {
          headers: {

            'Authorization': 'Token ' + token,
          },
        })
      .then((response) => {

        console.log("Si se agrego: " + response)

      })
      .catch((error) => {
        console.log(error)
      });
  }

  const consumir_updateImage = () => {

  }

  return (

    <div className='cont-form-profile'>

      <form className='form-profile'>
        <div className='data-cont'>
          <label className='labels' htmlFor='username'>
            Usuario
          </label>
          <input className='controls' type="text" id='username' name='username' value={username} onChange={
            (e) => setUsername(e.target.value)
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

          <button onClick={consumir_updateUser}>Actualizar datos</button>
        </div>

        <div className='profile-cont'>
          <img src={usuarioImageData.img_profile != null ? usuarioImageData.img_profile : image_default} alt="" width="280px" height="300px"></img>
          {usuarioImageData.img_profile != null ?
            <div id="div_file">
              <label id="largeFile" for="file">
                <input type="file" id="file" />
              </label>
            </div>
            :
            <div id="div_file">
              <label id="largeFile" for="file">
                <input type="file" id="file" />
              </label>
            </div>

          }
        </div>


      </form>
    </div>

  );

}

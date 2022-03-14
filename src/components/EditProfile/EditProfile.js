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


  const uploadFile = () => {
    // e.preventDefault();

    let postData = new FormData();

    postData.append('user_id', localStorage.getItem('user_id'));
    postData.append('img_profile', document.getElementById('img').files[0]);

    axios.post("http://localhost:8000/api/v1/profile/dataProfile/", postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token ' + token,
      }
    }).then((response) => {
      console.log("Aqui esta mal: " + response.data);
    }).catch((error) => {
      console.log("Aqui esta mal:mal " + error.data);
    })
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

  const delete_image = (e) => {

    axios.delete("http://localhost:8000/api/v1/profile/dataProfile/" + usuarioImageData.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
      }
    }).then((response) => {
      console.log("Aqui esta mal: " + response.data);

    }).catch((error) => {
      console.log("Aqui esta mal:mal " + error.data);

    });

  }

  const change_image = (e) => {
    e.preventDefault();

    let postData = new FormData();

    postData.append('user_id', localStorage.getItem('user_id'));
    postData.append('img_profile', document.getElementById('img').files[0]);

    // console.log("datos enviados: " + postData.user_id)
    console.log(usuarioImageData.id)
    axios.put("http://localhost:8000/api/v1/profile/dataProfile/" + usuarioImageData.id, postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token ' + token,
      }
    }).then((response) => {
      console.log("Aqui esta mal: " + response.data);

    }).catch((error) => {
      console.log("Aqui esta mal:mal " + error.data);

    });
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

          <button class="button is-warning" onClick={consumir_updateUser}>Actualizar datos</button>
        </div>

        <div className='profile-cont'>
          <div className='contenedor-imagen'>
            <img className="profile-image" class="is-rounded" id="profile-pic" src={usuarioImageData.img_profile != null ? usuarioImageData.img_profile : image_default} width="300px" height="300px" ></img>
          </div>


          {usuarioImageData.img_profile != null ?
            <div className='contenedor_funtions'>

              <div id="div_file">

                <label id="largeFile" for="file">
                  <input type="file" id="img" />
                  <button class="button is-warning" onClick={change_image}>Cambiar foto de perfil</button>
                </label>

              </div>

              <div id='div_delete' className='boton_delete_pic'>
                <label id="largeFile" for="file">
                  <button class="button is-danger" id='consumir_delete_img' onClick={delete_image}>Borrar foto de perfil</button>
                </label>
              </div>


            </div>
            :
            <div id="div_file">
              <label id="largeFile" for="file">
                <input type="file" id="img" />
                <button className='button is-primary' onClick={uploadFile}>Subir una foto</button>
              </label>
            </div>

          }
        </div>


      </form>
    </div>

  );

}

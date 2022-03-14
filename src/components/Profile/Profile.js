import { NavLink } from "react-router-dom";
import './profile.css'
import image_default from './imagen_default.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, } from "react-router-dom";
import EditProfile from './../EditProfile/EditProfile'

function Profile() {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem('user_id', 0)
    navigate('/Login');
  };

  const defaultDataUser = {
    id: 'id no cargado',
    username: 'usuario no cargado',
    first_name: 'first_name no cargado',
    last_name: 'last_name no cargado',
    email: 'email no cargado',
  }

  const defaultProfile = {
    id: 'id img no cargado',
    img_profile: 'url no cargado',
    user_id: 'relacion con usuario no cargada'
  }

  const defaultEditProfile = {
    edit: false
  }

  let token = localStorage.getItem('token');

  const [usuarioPersonalData, setUsuarioPersonalData] = useState(defaultDataUser)
  const [usuarioImageData, setUsuarioImageData] = useState(defaultProfile)
  const [editProfile, setEditProfile] = useState(defaultEditProfile)

  //Esta conexion permite obtener los datos de un usuario 
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/profile/data/user/detail/" + localStorage.getItem('user_id'),
        {
          headers: {
            'Authorization': 'Token ' + token,
          },
        })
      .then((response) => {

        const gottenUser = {
          id: localStorage.getItem('user_id'),
          username: response.data.data.username,
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          email: response.data.data.email,
        }

        setUsuarioPersonalData(gottenUser)
        console.log("Si se agrego: " + gottenUser.username)

      })
      .catch((error) => {
        console.log(error)
      });
  }, [setUsuarioPersonalData]);



  const consumir_profileUser = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/v1/profile/dataProfile/1", {
        headers: {
          'Authorization': 'Token ' + token,
        },
      })
      .then((response) => {
        console.log(response.data);

      })
      .catch((error) => {
        console.log(error)
      });
  };

  //Esta conexion permite obtener la imgen de perfil del usuario
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/profile/data/user/detail/relation/" + localStorage.getItem('user_id'), {
        headers: {
          'Authorization': 'Token ' + token,
        },
      })
      .then((response) => {
        if (response.data.data != 'No hay datos') {

          const gottentProfile = {
            id: response.data.data.id,
            user_id: response.data.data.user_id,
            img_profile: 'http://localhost:8000' + response.data.data.img_profile,
          }
          setUsuarioImageData(gottentProfile)
        } else {

          const gottentProfileError = {
            id: null,
            user_id: null,
            img_profile: null,
          }
          setUsuarioImageData(gottentProfileError)

        }
      })
      .catch((error) => {
        console.log(error)
      });
  }, [setUsuarioImageData])


  return (
    editProfile.edit == false ?

      <div className="box" id="box-general">


        <div class="columns" id="columnas">

          <div class="column is-one-fifth" id="profile-picture">

            <img className="profile-image" class="is-rounded" id="profile-pic" src={usuarioImageData.img_profile != null ? usuarioImageData.img_profile : image_default} width="300px" height="300px" ></img>

          </div>

          <div class="column is-three-fifths" id="profile-data">
            <div class="box" id="profile-data-box">
              <p>Informacion del usuario:</p>
              <br></br>
              {/* <img className="profile-image" src={usuarioImageData.img_profile != null ? usuarioImageData.img_profile : image_default} width="300px" height="300px" ></img> */}
              <ul className="lista-data">

                <li><label className="lb"> Username: </label>{usuarioPersonalData.username}</li>
                <li><label className="lb"> Email: </label>{usuarioPersonalData.email}</li>
                <li><label className="lb"> Nombre(s): </label>{usuarioPersonalData.first_name}</li>
                <li><label className="lb"> Apellidos:  </label>{usuarioPersonalData.last_name}</li>


              </ul>
            </div>
          </div>

          <div class="column" id="profile-buttons">
            <div class="box" id="profile-buttons-box">  
              <ul className="botones-perfil">
                <li><button className="button is-warning" onClick={
                  (editar) => {
                    editar = {
                      edit: true
                    }
                    setEditProfile(editar)
                  }
                }>Editar perfil
                </button>
                </li>
                <li><a href="#"><button className="button is-danger" onClick={logOut} > Cerrar sesion</button></a></li>
              </ul>
            </div>
          </div>

        </div>

      </div>
      :

      <div className="box">
        <EditProfile usuarioPersonalData={usuarioPersonalData} usuarioImageData={usuarioImageData}></EditProfile>

        <button class="button is-primary" onClick={
          (editar) => {
            editar = {
              edit: false
            }
            setEditProfile(editar)
          }
        }>
          Cancelar
        </button>
      </div>

  );
}

export default Profile;

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

  const defaultDataUserEdit = {
    username: null,
    first_name: 'first_name no cargado',
    last_name: 'last_name no cargado',
    email: 'email no cargado',
  }


  const defaultEditProfile = {
    edit: false
  }


  let token = localStorage.getItem('token');

  const [usuarioPersonalData, setUsuarioPersonalData] = useState(defaultDataUser)
  const [usuarioImageData, setUsuarioImageData] = useState(defaultProfile)
  const [editProfile, setEditProfile] = useState(defaultEditProfile)


  const [editProfileData, setEditProfileData] = useState(defaultDataUserEdit)




  // const consumir_editarprofile = (e) => {
  //   e.preventDefault();
  //   var postData = {
  //     "img_profile": `${user_id}`,
  //     "user_id": `${img_profile}`,
  //   }

  //   axios
  //     .post("http://localhost:8000/api/v1/profile/ver/", postData, {
  //       Headers: { "Content-Type": "application/json", },
  //     })
  //     .then((response) => {

  //       console.log(response);

  //     })
  //     .catch((error) => {
  //       alert(error)


  //     });
  // };

  //cibsyni de los datos del usuario
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



  // const consumir_profileUser = (e) => {
  //   e.preventDefault();
  //   axios
  //     .get("http://localhost:8000/api/v1/profile/dataProfile/1", {
  //       headers: {
  //         'Authorization': 'Token ' + token,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);

  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     });
  // };


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/profile/data/user/detail/relation/" + localStorage.getItem('user_id'), {
        headers: {
          'Authorization': 'Token ' + token,
        },
      })
      .then((response) => {
        // console.log("response.data.data: " + response.data.data);

        if (response.data.data != 'No hay datos') {

          const gottentProfile = {
            id: response.data.data.id,
            user_id: response.data.data.user_id,
            img_profile: 'http://localhost:8000' + response.data.data.img_profile,
          }

          setUsuarioImageData(gottentProfile)
          // console.log("Respuesta de la imagen relacion: " + response.data.data.id)
          // console.log("Respuesta del objeto perfil creado: " + gottentProfile.img_profile)
        } else {

          const gottentProfileError = {
            id: null,
            user_id: null,
            img_profile: null,
          }

          setUsuarioImageData(gottentProfileError)
          //   console.log("OBJETO IMAGEN ERROR: " + gottentProfileError)
          // }

        }
      })
      .catch((error) => {
        console.log(error)
      });

  }, [setUsuarioImageData])


  return (
    editProfile.edit == false ?

      <div className="contenedor">
        <div className="contenedor-datos">
        <img className="profile-image" src={usuarioImageData.img_profile != null ? usuarioImageData.img_profile : image_default} width="300px" height="300px" ></img>
          <ul>
            <li><label className="lb"> Userid: </label> {usuarioPersonalData.id}</li>
            <li><label className="lb"> Username: </label>{usuarioPersonalData.username}</li>
            <li><label className="lb"> Email: </label>{usuarioPersonalData.email}</li>
            <li><label className="lb"> First_name: </label>{usuarioPersonalData.first_name}</li>
            <li><label className="lb"> Last_name: </label>{usuarioPersonalData.last_name}</li>
            <li><a className="cta" href="#"><button onClick={logOut} > Cerrar sesion</button></a></li>
            <li><button onClick={
              (editar) => {
                editar = {
                  edit: true
                }
                setEditProfile(editar)
              }
            }>Editar perfil
            </button></li>
          </ul>
        </div>
      </div>
      :

      <div className="">
       

        <EditProfile usuarioPersonalData={usuarioPersonalData} usuarioImageData={usuarioImageData}></EditProfile>

        <button onClick={
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

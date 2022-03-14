// import axios from 'axios';
// import React, { useState } from "react";

// function Form() {


//     // {
//     //     "username" : "robertoguzman3",
//     //     "password" : "Apple141189.",
//     //     "password2" : "Apple141189.",
//     //     "email" : "robertoguzman777@gmail.com",
//     //     "first_name" : "Roberto Eduardo",
//     //     "last_name" : "Guzman Ruiz." 
//     //  }


//     const [username, setUsername] = useState("usuario");
//     const [password, setPassword] = useState("password");
//     const [password2, setPassword2] = useState("password2");
//     const [email, setEmail] = useState("email");
//     const [first_name, setFirst_name] = useState("first_name");
//     const [last_name, setLast_name] = useState("first_name");

//     var postData = {
//         "username": `${username}`,
//         "password": `${password}`,
//         "password2": `${password2}`,
//         "email": `${email} `,
//         "first_name": `${first_name } `,
//         "last_name": `${last_name} `
//     }


//     const consumir_login = () => {
//         axios
//             .post("http://localhost:8000/api/v1/v1/Login", postData, {
//                 Headers: { "Content-Type": "application/json", },
//             })
//             .then((response) => {

//                 console.log(response);

//             })
//             .catch((error) => {
//                 console.log(error.response.data.password[0]);
//                 console.log(error.response.data.username[0]);
//             });
//     };


//     console.log(postData)




//     return (

//         <div>

//             <h2>Formulario</h2>
//             <form>

//                 <label htmlFor='username'>
//                 username
//                 </label>
//                 <input type="text" id='username' name='username' value={username} onChange={
//                     (e) => setUsername(e.target.value)
//                 }>
//                 </input>

//                 <label htmlFor='password'>
//                 password
//                 </label>
//                 <input type="password" id='password' name='password' value={password} onChange={
//                     (e) => setPassword(e.target.value)
//                 }>
//                 </input>

//                 <label htmlFor='password2'>
//                 password2
//                 </label>
//                 <input type="password" id='password2' name='password2' value={password2} onChange={
//                     (e) => setPassword2(e.target.value)
//                 }>
//                 </input>


//                 <label htmlFor='email'>
//                 email
//                 </label>
//                 <input type="text" id='email' name='email' value={email} onChange={
//                     (e) => setEmail(e.target.value)
//                 }>
//                 </input>


//                 <label htmlFor='first_name'>
//                 first_name
//                 </label>
//                 <input type="text" id='first_name' name='first_name' value={first_name} onChange={
//                     (e) => setFirst_name(e.target.value)
//                 }>
//                 </input>


//                 <label htmlFor='last_name'>
//                 last_name
//                 </label>
//                 <input type="text" id='last_name' name='last_name' value={last_name} onChange={
//                     (e) => setLast_name(e.target.value)
//                 }>
//                 </input>


//             </form>
//         </div>

//     )
// }

// export default Form;
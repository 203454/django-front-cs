// import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import NotFound from './NotFound'
import Register from '../components/Register/Register'
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import PrivateRoute from './ProtectedRoute';
import EditProfile from '../components/EditProfile/EditProfile';


function Rutas() {


    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={<PrivateRoute  />}>
                    <Route path='/profile' element={<ProfilePage />}></Route>
                    <Route path='/profile/editprofile' element={<EditProfile />}></Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;

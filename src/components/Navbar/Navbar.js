import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./NavbarStyle.css"
import ares from './ares.jpg'

function Navbar() {
   
    
    return(
    <header>
        <img className="logo-nav" src={ares} alt="logo" width="60px"></img>

        <nav>
            <ul className="nav_links">
                <li>
                    <NavLink className={(data) => data.isActive ? 'active' : 'notActive'} to='/'>Home</NavLink>
                </li>

                <li>
                    <NavLink className={(data) => data.isActive ? 'active' : 'notActive'} to='/login'>Login</NavLink>
                </li>

                <li>
                    <NavLink className={(data) => data.isActive ? 'active' : 'notActive'} to='/register'>Register</NavLink>
                </li>

                <li>
                    <NavLink className={(data) => data.isActive ? 'active' : 'notActive'} to='/profile'>Perfil</NavLink>
                </li>
          
            </ul>
        </nav>
        
    </header>

        
    );
}

export default Navbar;

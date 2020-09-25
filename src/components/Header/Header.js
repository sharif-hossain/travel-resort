import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { UserContext } from '../Main/Main';
import logo from '../../images/Logo.png'
const logoStyle = {height:'50px'}

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (

        <div className="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-white">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="/"><img style={logoStyle} src={logo} alt="logo"/></a>
  

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03 ">
  <form class="form-inline my-2 my-lg-0 ml-auto">
      <input class="form-control mr-sm-2" type="search" placeholder="Search your destination" aria-label="Search"/>
      
    </form>
    <ul className="navbar-nav  mt-2 mt-lg-0 ">
      <li class="nav-item active">
        <a class="nav-link" href="/">News <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Destination</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Blog</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Contact</a>
      </li>
    </ul>
    
    
  </div>
{
    loggedInUser.displayName ? <button className="btn btn-warning" onClick={() => setLoggedInUser({})}>{loggedInUser.displayName} [Logout]</button>
        : <Link to="/login">
            <button className="btn btn-warning">Login</button>
        </Link>
}
 </nav>
 </div>

    );
};

export default Header;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './LoginHeader.css'
import { UserContext } from '../Main/Main';
import logo from '../../images/Logo.png'

const LoginHeader = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg">
                <Link to="/">
                    <img src={logo} style={{ width: '120px', backgroundColor: 'white' }} alt="logo" className="mr-5" />
                </Link>

                <input type="text" className="input-form" placeholder="Search your Destination" />
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">News</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Destination</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Contact</Link>
                        </li>
                    </ul>
                </div>
                {
                    loggedInUser.displayName ? <button className="btn btn-warning" onClick={() => setLoggedInUser({})}>{loggedInUser.displayName}[Logout]</button>
                        : <Link to="/login">
                            <button className="btn btn-warning">Login</button>
                        </Link>
                }
            </nav>
        </div>
    );
};

export default LoginHeader;
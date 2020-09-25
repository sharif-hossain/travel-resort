
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../Main/Main';
import LoginHeader from '../Header/LoginHeader';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isLogIn, setIsLogin] = useState(true);
    const [newUser, setNewUser] = useState({
         firstName: '', 
         lastName: '',
         email: '',
         password: '', 
         confirmPassword: '' 
        });
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    
    const SignInWithGoogle = () => { 
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            setUserData(res);
        })
        .catch(function (error) {
            setError(error.message);
        });
    }

    const SignInWithFb = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then(res => {
            setUserData(res);
        })
        .catch(function (error) {
            setError(error.message);
        });
    }

    const setUserData = (result) => { 
        setLoggedInUser(result.user);
        history.replace(from);
    }

    const handleSubmit = (e) => {
        if (!isLogIn && newUser.email && newUser.password && newUser.confirmPassword) {
            if (password === confirmPassword) {
                firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
                    .then(res => {
                        userInfoUpdate(newUser.firstName);
                        newUser.displayName = newUser.firstName;
                        setLoggedInUser(newUser);
                        history.replace(from);
                    })
                    .catch(function (error) {
                        setError(error.message);
                    });
            } else {
                setError('Password & Confirm Password does not match');
            }
        } else if (isLogIn && newUser.email && newUser.password) {
            firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password)
                .then(res => {
                    setLoggedInUser(res.user);
                    history.replace(from);
                })
                .catch(function (error) {
                    setError(error.message);
                });
        }
        e.preventDefault();
    }

    const userInfoUpdate = name => { 
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
        .then(function () {
        //console.log()
        })
        .catch(function (error) {
            setError(error.message);
        });
    }

    const handleBlur = (e) => {
        let isValidForm = true;
        if (e.target.name === 'email') {
            isValidForm = /\S+@\S+\.\S+/.test(e.target.value);
            if (isValidForm) {
                setError('');
            } else {
                setError(' email address not valid');
            }
        }
        if (e.target.name === 'password') {
            const atLeastSix= e.target.value.length > 5;
            const onlyDigit = /\d{1}/.test(e.target.value);
            isValidForm =atLeastSix && onlyDigit;
            setPassword(e.target.value);
            if (isValidForm) {
                setError('');
            } else {
                setError('Password must need one digit and six length.');
            }
        }
        if (e.target.name === 'confirmPassword') {
            setConfirmPassword(e.target.value);
            if (password === confirmPassword) {
                isValidForm = true;
                setError('');
            } else {
                isValidForm = false;
                setError('Password & Confirm Password does not match');
            }
        }

        if (isValidForm) {
            const user = { ...newUser };
            user[e.target.name] = e.target.value;
            setNewUser(user);
        }
    }

    return (
        <div className="login">
            <div className="container">
                <LoginHeader />
                <div className="login-form">
                    <div className="m-2">
                        {error && <p className="alert alert-danger m-3">{error}</p>}
                        {
                            isLogIn ? <form className="mt-3 " onSubmit={handleSubmit} >
                                <h4 className="ml-3" >Login</h4>
                                <input name="email" onBlur={handleBlur} className="form-control m-3" required type="email" placeholder="email" />
                                <input name="password" onBlur={handleBlur} className="form-control m-3" required type="password" placeholder="password" />
                                <button type="submit" className="btn btn-warning form-control m-3 btn-width" >Log In</button>
                            </form>
                                : <form className="mt-3 " onSubmit={handleSubmit} >
                                    <h4 className="ml-3 " > Create an account</h4>
                                    <input name="firstName" onBlur={handleBlur} className="form-control m-3" required type="firstName" placeholder="first name" />
                                    <input name="lastName" onBlur={handleBlur} className="form-control m-3" required type="lastName" placeholder="last name" />
                                    <input name="email" onBlur={handleBlur} className="form-control m-3" required type="email" placeholder="email" />
                                    <input name="password" onBlur={handleBlur} className="form-control m-3" required type="password" placeholder="password" />
                                    <input name="confirmPassword" onBlur={handleBlur} onChange={handleBlur} className="form-control m-3" required type="password" placeholder="confirm password" />
                                    <button type="submit" className="btn btn-warning form-control ml-3 btn-width" >Sign Up</button>
                                </form>
                        }
                        {
                            isLogIn ? <p className="text-center mt-2">Don't have an account? <strong className="login-tag text-warning" onClick={() => setIsLogin(false)}>Create an account</strong> </p>
                                : <p className="text-center mt-2" >Already have an account? <strong className="login-tag text-warning" onClick={() => setIsLogin(true)}>Login</strong> </p>
                        }
                    </div>
                </div>
                <div className="login-form-social">
                    <div className="d-flex flex-row mt-3" >
                        <hr className="w-50 mr-1" />Or<hr className="w-50 ml-1" />
                    </div>
                    <div className="form-control social-btn ml-3 m-2" onClick={SignInWithGoogle}>
                        <div className="d-flex">
                          
                            <div className="ml-5"> Continue with Google</div>
                        </div>
                    </div>
                    <div className="form-control social-btn ml-3 m-2" onClick={SignInWithFb}>
                        <div className="d-flex">
                            
                            <div className="ml-5">Continue with Facebook</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
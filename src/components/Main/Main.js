import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from '../Header/Header';
import Booking from '../Booking/Booking';
import BookingDetail from '../BookingDetail/BookingDetail';
import Login from '../Login/Login';
import Search from '../Search/Search';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import NotFound from '../NotFound/NotFound';
import './Main.css';
import background from '../../images/Rectangle 1.png'
var bgStyle = {
    width: "100%",
    height: "100%",
    backgroundPosition: 'center',
    backgroundImage: "url(" +  background  + ")"
  };

export const UserContext = createContext();

const Main = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <div className="bg-image" style ={bgStyle}>
            <UserContext.Provider value={[loggedInUser, setLoggedInUser] }>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Header />
                            <Booking />
                        </Route>
                        <Route path="/booking">
                            <Header />
                            <Booking />
                        </Route>
                        <Route path="/bookingDetail/:id">
                            <Header />
                            <BookingDetail />
                        </Route>
                        <PrivateRoute path="/search/:id">
                            <Search />
                        </PrivateRoute>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="*">
                            <Header />
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            </UserContext.Provider>
        </div>
    );
};

export default Main;
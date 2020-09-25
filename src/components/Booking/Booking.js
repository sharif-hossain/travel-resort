import React, { useState } from 'react';
import Destination from '../Destination/Destination';
import fakeData from '../../data/fakeData'
import './Booking.css';
import { useHistory } from 'react-router-dom';


const Booking = () => {
    const destinationInfo = fakeData;
    const [resortId, setResortId] = useState(1);
    let history = useHistory();

    const updateInfo = (id, title, description) => {
        setResortId(id);
    
    }
    const handleClick = () => {
        history.push(`/bookingDetail/${resortId}`);
    }

    return (
        <main>
            <div className=" row d-flex ">
                <div className=" col-md-4 ml-2 mt-5">
                    <h1 className="title">Cox's Bazar</h1>
                    
                    <p style={{color:'white'}}>Cox's Bazar (Bengali: কক্সবাজার, pronounced [kɔksbadʒaɾ]) is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it is infamous for the largest refugee camp in the world. It is located 150 km (93 mi) south of the divisional headquarter city of Chittagong.</p>
                    <button className="btn btn-warning mt-3" onClick={handleClick}>Booking  <span className="fas fa-arrow-right"></span></button>
                </div>
                <div className=" col-md-7 mt-5">
                    {
                       destinationInfo.map(item => <Destination updateInfo={updateInfo} key={item.id} item={item}  />)
                    }
                </div>
            </div>
            
        </main>
       
    );
};

export default Booking;
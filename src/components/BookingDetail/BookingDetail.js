import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import fakeData from '../../data/fakeData';
import NotFound from '../NotFound/NotFound';
import './BookingDetail.css';


const BookingDetail = () => {
    const { id } = useParams();
    const [resort, setResort] = useState({});
    let history = useHistory();

    useEffect(() => { 
        const resortId = fakeData.find(item => item.id === parseInt(id));
        setResort(resortId);
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${id}`);
    }

    return (
        <div className="container">
            {
                resort ? <div className="row mt-5">
                    <div className="col-md-6">
                        <h1 className="place-title">{resort.title}</h1>
                        <p className="place-desc">{resort.description}</p>
                    </div>
                    
                    <div className="col-md-6">
                        
                        <form class="bookingForm" onSubmit={handleSubmit}>
                            <label for="">Origin</label>
                            <input class="input" name="origin" placeholder="dhaka" required/>
                                <label for="">Destination</label>
                                <input class="input" name="destination" required="" placeholder='sundarban'/>
                                <label for="">From</label>
                                <input class="input" name="from" required type="date"/>
                                <label for="">To</label>
                                <input class="input" name="to" required type="date"/>
                                            <br/>
                             <a href="/search/sundarban">
                             <input type="submit" class="button" placeholder="Start Booking"/>
                            </a>
                        </form>
                    </div>
                </div>
                    : <NotFound />
            }

        </div>
    );
};

export default BookingDetail;
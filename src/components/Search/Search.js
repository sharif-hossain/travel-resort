import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import locationDetail from '../../data/resortData';
import locationData from '../../data/fakeData';
import LoginHeader from '../Header/LoginHeader';
import SearchResult from './SearchResult';
import NotFound from '../NotFound/NotFound';
import './Search.css';


const Search = () => {
    const { id } = useParams();
    const [locationName, setLocationName] = useState('');
    const [location, setLocation] = useState([]);
    

    useEffect(() => {
        const detail = locationDetail.filter(item => item.locationId === parseInt(id));
        setLocation(detail);

        if (detail.length) {
            const location = locationData.find(item => item.id === parseInt(id));
            setLocationName(location.title);

        }
    }, [id]);

    return (
        <div className="search">
            <div className="container">
                <LoginHeader />
                {
                    location.length ? <div className="row">
                        <div className="col-md-7 mt-3">
                            <p className="ml-4 mt-4 line-height"><small> well come you in dreamland</small></p>
                            <h4 className="ml-4"> Stay in {location.length && locationName}</h4>
                            {
                                location.map(item => <SearchResult key={item.id} resort={item} />)
                            }
                        </div>
                    </div>
                        : <NotFound />
                }
            </div>

        </div>
    );
};

export default Search;
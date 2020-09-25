import React from 'react';
import './Search.css'

const SearchResult = (props) => {
    const { title, rating, bookingPrice, url, description } = props.resort;
    return (
        <div className="row font">
            <div className="col-md-6">
                <img src={url} alt={title} className="img img-fluid m-2 search-img" />
            </div>
            <div className="col-md-6">
                <h4>{title}</h4>
                <p>4 guests 2 bedrooms 2 beds 2 baths</p>
                <p>{description}</p>
                <div className="d-flex">
                    <div className="d-flex">
                        <span className="fa fa-star checked mr-1"></span>
                        <p>{rating}</p>
                    </div>
                    <div className="ml-5">
                        <h5>${bookingPrice} <small>night</small></h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
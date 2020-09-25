import React from 'react';
import { useHistory } from 'react-router-dom';
import './Destination.css';

const Destination = (props) => {
    const { id, title, img, description } = props.item;
    let history = useHistory();

    const handleClick = () => {
        history.push(`/bookingDetail/${id}`);
    }

    return (
        
<div class="card d-inline-block mx-2" onMouseEnter={() => props.updateInfo  (id, title, description)} onClick={handleClick}> 
  <img class="card-img image" src={img} alt=""/>
  <div class="card-img-overlay">
    <h2 class="card-title">{title}</h2>
  </div>
</div>
    );
};

export default Destination;
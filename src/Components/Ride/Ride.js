import React from 'react';
import './Ride.css';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

const Ride = (props) => {
    const { name, IMGURL } = props.ride;
    return (
        <>
            <Link to={`/destination/${name}`}>
                <div className="Ride">
                    <img src={IMGURL} alt={name} />
                    <h3>{name}</h3>
                </div>
            </Link>
        </>
    );
};

export default Ride;
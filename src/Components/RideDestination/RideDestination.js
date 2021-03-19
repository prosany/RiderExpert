import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './RideDestination.css';
import data from '../../data/data.json';

const RideDestination = () => {
    const [avaRide, setAvaRide] = useState({});
    const {ride} = useParams();
    useEffect(() => {
        const rideInfo = data.filter(rider => rider.name === ride);
        // console.log(rideInfo);
        setAvaRide(rideInfo);
    }, [ride]);

    console.log("Hi >", avaRide[0].Category)
    return (
        <div>
            {/* {
                avaRide[0].Category.map(category => <li>{category.CategoryName}</li>)
            } */}
        </div>
    );
};

export default RideDestination;
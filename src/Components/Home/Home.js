import React, { useEffect, useState } from 'react';
import Data from '../../data/data.json';
import Ride from '../Ride/Ride';
import './Home.css';

const Home = () => {
    const [database, setDatabase] = useState([]);
    useEffect(() => {
        setDatabase(Data)
    }, []);
    // console.log("This", database[0].name)
    return (
        <>
            <div className="poster">
                <div className="container">
                    <div className="SelectRide">
                    {
                        database.map(ride => <Ride key={ride.id} ride={ride}></Ride>)
                    }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
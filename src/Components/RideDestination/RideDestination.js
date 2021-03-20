import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './RideDestination.css';
import data from '../../data/data.json';
import Locations from '../Locations/Locations';
import mapImage from '../../media/Map.png';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const RideDestination = () => {
    const [avaRide, setAvaRide] = useState([]);
    const { ride } = useParams();
    useEffect(() => {
        const rideInfo = data.find(rider => rider.name === ride);
        setAvaRide(rideInfo);
    }, [ride]);

    const [pickPlace, setPickPlace] = useState({
        from: '',
        to: ''
    });
    const handaleBlur = (e) => {
        const serachLoaction = { ...pickPlace };
        serachLoaction[e.target.name] = e.target.value;
        setPickPlace(serachLoaction);
    };
    const [searchClicked, setSearchClicked] = useState(true);
    console.log(pickPlace)

    const { Category } = avaRide;

    return (
        <div className="RideD">
            <div className="container">
                <div className="LeftDesti">
                    {
                        searchClicked ? <div className="DestSerach">
                            <label htmlFor="pickFrom">PICK FROM</label><br />
                            <input type="text" name="from" id="pickFrom" onBlur={handaleBlur} placeholder="Pick From" /><br />
                            <label htmlFor="pickTo">PICK TO</label><br />
                            <input type="text" name="to" onBlur={handaleBlur} id="pickTo" placeholder="Pick To" /><br />
                            <button onClick={() => setSearchClicked(!searchClicked)} id="pickSearch">Search Ride</button>
                        </div> : <Locations category={Category} key={Category.id} pickPlace={pickPlace}></Locations>
                    }
                </div>
                <div className="RightDestiGoolgeMap">
                    <img src={mapImage} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default RideDestination;
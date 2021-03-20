import React from 'react';
import './Locations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Locations = (props) => {
    const userFriends = <FontAwesomeIcon icon={faUserFriends} />
    console.log(props)
    return (
        <div>
            <div className="availableRide">
                <div className="destination">
                    <div className="leftD">
                        <h6>From</h6>
                        <p>{props.pickPlace.from}</p>
                    </div>
                    <div className="rightD">
                        <h6>|</h6>
                    </div>
                    <div className="rightD">
                        <h6>To</h6>
                        <p>{props.pickPlace.to}</p>
                    </div>
                </div>
                {
                    props.category.map(category =>
                        <div className="rideInfo">
                            <div className="rideImg">
                                <img src={category.RideImage} alt={category.CategoryName} />
                            </div>
                            <div className="rideType">
                                {category.CategoryName}
                            </div>
                            <div className="rideSeat">
                                <span>{userFriends}</span>{category.Seat}
                            </div>
                            <div className="ridePrice">
                                <span className="taka">৳</span> {category.Price}
                            </div>
                        </div>)
                }
            </div>

        </div>
    );
};

export default Locations;
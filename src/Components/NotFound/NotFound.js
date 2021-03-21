import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div>
            <div className="errorPage">
                <h2>404</h2>
                <h3>Page You Requested Was Not Found or Maybe Deleted</h3>
            </div>
        </div>
    );
};

export default NotFound;
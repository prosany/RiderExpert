import React, { useContext } from 'react';
import './Header.css';
import Logo from '../../media/logo.svg';
import { UserContext } from '../../App';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo">
                        <Link to="/"><img src={Logo} alt="Logo" /></Link>
                    </div>
                    <nav>
                        <ul>
                            <li className="hideOnMobile"><Link to="/">Home</Link></li>
                            <li><Link to="/destination">Destination</Link></li>
                            <li className="hideOnMobile"><Link to="/blog">Blog</Link></li>
                            <li className="hideOnMobile"><Link to="/contact-us">Contact</Link></li>
                            {
                                loggedInUser.email ? <li><Link to="/">{loggedInUser.displayName}</Link></li> : <li><Link to="/login"><span className="logIn">Login</span></Link></li>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
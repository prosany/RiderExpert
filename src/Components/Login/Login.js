import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Firebase/Firebase.config';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";


const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
    
    const handleGoogleSignIn = () => {
        var google = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(google)
            .then((result) => {
                setUser(result.user);
                console.log(result);
                setLoggedInUser(result.user);
                history.replace(from);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage)
            });
    };


    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
            <div className="Login-system">
                <div className="Login-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="email" type="text" defaultValue="test" ref={register} /><br />
                        <input name="password" type="password" ref={register({ required: true })} />
                        {errors.password && <span>This field is required</span>}
                        <br />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <p>{user.displayName}</p>
                <button onClick={handleGoogleSignIn}>Google Sign In</button>
            </div>
        </>
    );
};

export default Login;
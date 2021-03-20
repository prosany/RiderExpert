import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Firebase/Firebase.config';
import {
    BrowserRouter as Router,
    useHistory,
    useLocation
} from "react-router-dom";
import GoolgeIcon from "../../media/social-icon/google.svg";
import GitHubIcon from "../../media/social-icon/github.svg";

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

    // SignIn With Google
    const handleGoogleSignIn = () => {
        const google = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(google)
            .then((result) => {
                setUser(result.user);
                // console.log(result);
                setLoggedInUser(result.user);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    };

    // SignIn With GitHub
    const handleGithubSignIn = () => {
        const github = new firebase.auth.GithubAuthProvider();
        firebase
            .auth()
            .signInWithPopup(github)
            .then((result) => {
                setUser(result.user);
                // console.log(result);
                setLoggedInUser(result.user);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }


    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        // SignIn With Custom Email and Password
        const handleEmailSignIn = (email, password) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    setUser(userCredential.user);
                    // console.log(result);
                    setLoggedInUser(userCredential.user);
                    history.replace(from);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                });
        }
    };
    return (
        <>
            <div className="Login-system">
                <div className="Login-form">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email">Email Address</label><br/>
                        <input name="email" id="email" type="text" autoComplete="off" /><br />
                        <label htmlFor="password">Password</label><br/>
                        <input name="password" id="password" type="password" ref={register({ required: true })} /> <br/>
                        {errors.password && <span>This field is required</span>}
                        <br />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <p>{user.displayName}</p>
                <p className="moreOptions">Or</p>
                <div className="socialSignIn">
                    <button className="GoogleSignIn-Btn" onClick={handleGoogleSignIn}><img src={GoolgeIcon} alt=""/> Continue with Google</button><br/>
                    <button className="GitHubSignIn-Btn" onClick={handleGithubSignIn}><img src={GitHubIcon} alt=""/> Continue with GitHub</button>
                </div>
            </div>
        </>
    );
};

export default Login;
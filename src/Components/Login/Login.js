import React, { useContext, useState, useRef } from 'react';
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

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success: false,
        updateUser: false
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    // SignIn With Google
    const handleGoogleSignIn = async () => {
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
    const handleGithubSignIn = async () => {
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

    // Handle Registration
    const { register, handleSubmit, errors, watch } = useForm();
    const password = useRef({});
    password.current = watch('password', '');

    // Update User Name On Firebase Database
    const updateUser = (name) => {
        const user = firebase.auth().currentUser;
        user
            .updateProfile({
                displayName: name,
            })
            .then(function () {
                console.log('user Information Updated');
                setLoggedInUser(user);
                history.replace(from);
            })
            .catch(function (error) {
                console.log(error);
                var errorMessage = error.message;
                setUser({
                    error: errorMessage,
                });
            });
    };
    // On Submit Handler
    const onSubmit = (data) => {
        const { email, password, name } = data;
        // console.log('clicked');
        if (isSignedIn) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser);
                    updateUser(name);
                    history.replace(from);
                    console.log(res);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    setUser({
                        error: errorMessage,
                    });
                    console.log(errorMessage);
                });
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((res) => {
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser);
                    setLoggedInUser(res.user);
                    history.replace(from);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage);
                });
        }
    };
    
    return (
        <>
            <div className="Login-system">
                <div className="Login-form">
                    {user.error && <p style={{ color: 'red' }}>{user.error}</p>}
                    {user.success && (<p style={{ color: 'green' }}>User {isSignedIn ? 'Created' : 'Logged In'} Successfully</p>)}

                    <div className="custom__form">
                        <h1>{isSignedIn ? 'Sign Up' : 'Log In'}</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {isSignedIn && (
                                <>
                                    <label htmlFor="UserName" id="lft">Your Name</label><br />
                                    <input name="name" id="UserName" ref={register({ required: true })} />
                                    <br />
                                    {errors.name && (<span style={{ color: 'red' }}>Please Enter Your Name</span>)}
                                </>
                            )}
                            <label htmlFor="email">Email Address</label><br />
                            <input name="email" id="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
                            {errors.email && (<span style={{ color: 'red' }}>Please Enter Your Email</span>)}
                            <br />
                            <label htmlFor="password">Password</label><br />
                            <input name="password" id="password" type="password" ref={register({ pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, })} />
                            {errors.password && (
                                <p style={{ color: 'red' }}>
                                    Password must contain at least 1 number, 1 uppercase, 1 lowercase letter and at least 8 or more characters
                                </p>
                            )}
                            {isSignedIn && (
                                <>
                                    <br />
                                    <label htmlFor="ConfirmPassword">Confirm Password</label><br />
                                    <input name="confirmPassword" id="confirmPassword" type="password" ref={register({
                                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, validate: (value) => value === password.current || 'The passwords do not match',
                                    })} />
                                    {errors.confirmPassword && (<p>{errors.confirmPassword?.message}</p>)}
                                    {errors.confirmPassword && (<p style={{ color: 'red' }}>Password Not Matched</p>)}
                                </>
                            )}
                            {!isSignedIn && (
                                <div className="Rem-Frg">
                                    <span>
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check" id="check" className="check">Remember me</label>
                                    </span>
                                    <span className="forgot-pass">Forgot Password?</span>
                                </div>
                            )}
                            <input className="btn-submit" type="submit" value={isSignedIn ? 'Sign Up' : 'Log In'} />
                        </form>

                        <p className="Login-Reg-Link">
                            {isSignedIn ? 'Already Have an Account?' : 'Don,t Have an Account? '}{' '}
                            <span className="pointer" onClick={() => setIsSignedIn(!isSignedIn)}>
                                {isSignedIn ? 'Log In' : 'Create Account'}
                            </span>
                        </p>
                    </div>
                </div>
                <p>{user.displayName}</p>
                <p className="moreOptions">Or</p>
                <div className="socialSignIn">
                    <button className="GoogleSignIn-Btn" onClick={handleGoogleSignIn}><img src={GoolgeIcon} alt="" /> Continue with Google</button><br />
                    <button className="GitHubSignIn-Btn" onClick={handleGithubSignIn}><img src={GitHubIcon} alt="" /> Continue with GitHub</button>
                </div>
            </div>
        </>
    );
};

export default Login;
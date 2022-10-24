import styles from "./Registration.module.css";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/userSlice";
import {REGISTER_URL} from "../../backPathes";

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [errorResponse, setErrorResponse] = useState(null);
    const [formData, setFormData] = useState({
        login: null,
        password: null,
        repeatedPassword: null,
        email: null
    });
    const [isRegister, setIsRegister] = useState(false);
    const [formError, setFormError] = useState({
        loginError: "",
        passwordError: "",
        repeatedPasswordError: "",
        emailError: ""
    });

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        console.log("Handle submit");
        let {login, password, email, repeatedPassword} = formData;
        if (login === null || login.length < 1) {
            console.log(login);
            setFormError(prevState => ({...prevState, loginError: "Login cannot be empty"}));
        }
        if (password === null || password.length < 1) {
            setFormError(prevState => ({...prevState, passwordError: "Password cannot be empty"}));
        }
        if (email === null || email.length < 1) {
            setFormError(prevState => ({...prevState, emailError: "Email cannot be empty"}));
        }
        if (repeatedPassword === null || repeatedPassword.length < 1) {
            setFormError(prevState => ({...prevState, repeatedPasswordError: "Please repeat password!"}));
        }
        if (login && password && email) {
            if (password === repeatedPassword) {
                sendRegistrationRequest(login, password, repeatedPassword, email);
            } else {
                setFormError(prevState => ({
                    ...prevState,
                    repeatedPasswordError: "The password doesn't match!"
                }));
            }
        } else {
            console.log("Error")
        }
    }

    const eventHandler = (event) => {
        let name = event.target.name;
        console.log(name)
        setErrorResponse(null);
        setFormError(prevState => ({...prevState, [name + "Error"]: null}));
        setFormData(prevState => ({...prevState, [name]: event.target.value}));
    }

    const sendRegistrationRequest = (login, password, repeatedPassword, email) => {
        setLoading(true);
        let bodyFormData = new FormData();
        bodyFormData.append("username", login)
        bodyFormData.append("password", password)
        bodyFormData.append("password2", repeatedPassword)
        bodyFormData.append("email", email)
        axios.post(REGISTER_URL, bodyFormData,
            {
                headers: {"Content-Type": "multipart/form-data"}
            })
            .then(response => {
                setLoading(false);
                console.log(response);
                if (response.status === 201 && response.data?.username) {
                    console.log(response.data)
                    let {email, username} = response.data;
                    dispatch(setUser({email, username}));
                    setIsRegister(true);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                if (err.response.data?.username) {
                    setFormError(prevState => ({...prevState, loginError: err.response.data.username}))
                }
                if (err.response.data?.password) {
                    setFormError(prevState => ({...prevState, passwordError: err.response.data.password}))
                }
                if (err.response.data?.email) {
                    setFormError(prevState => ({...prevState, emailError: err.response.data.email}))
                }
                if (err.response?.data || err.response.data === undefined || err.response.data.length < 1) {
                    setErrorResponse("Registration error! Try again later (-_-)")
                }
            });
    };

    const registerForm = (
        <form onSubmit={handleSubmit} className={styles.Form}>
            <span className={styles.FormTitle}>Sign Up</span>
            <div className={styles.Row}>
                <label className={styles.TextField}>Username:</label>
                <input type="text"
                       placeholder="Enter login"
                       className="form-control"
                       name="login"
                       onChange={eventHandler}/>
                <span className={styles.Error}>{formError.loginError}</span>
            </div>
            <div className={styles.Row}>
                <label className={styles.TextField}>Password:</label>
                <input type="password"
                       placeholder="Enter password"
                       className="form-control"
                       name="password"
                       onChange={eventHandler}/>
                <span className={styles.Error}>{formError.passwordError}</span>
            </div>
            <div className={styles.Row}>
                <label className={styles.TextField}>Repeat password:</label>
                <input type="password"
                       placeholder="Repeat password"
                       className="form-control"
                       name="repeatedPassword"
                       onChange={eventHandler}/>
                <span className={styles.Error}>{formError.repeatedPasswordError}</span>
            </div>
            <div className={styles.Row}>
                <label className={styles.TextField}>Email address:</label>
                <input type="email"
                       placeholder="Enter email"
                       className="form-control"
                       name="email"
                       onChange={eventHandler}/>
                <span className={styles.Error}>{formError.emailError}</span>
            </div>
            <div className={styles.ErrorResponse}>
                {errorResponse}
            </div>
            <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleSubmit : null}>
                {isLoading ? 'Loading…' : 'Sign Up'}
            </Button>
            <div className={styles.AuthLink}>
                Already registered? <Link to={"/login"}>Sign In</Link>
            </div>
        </form>
    );

    const successAuth = (
        <div className={styles.SuccessWindow}>
            <div className={styles.SuccessAnimation}>
                <svg className={styles.Checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className={styles.CheckmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                    <path className={styles.CheckmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
            <span className={styles.SuccessText}>Registration completed successfully!!!</span>
            <Button type="submit"
                    variant="outline-success"
                    onClick={() => navigate("/login")}>
                Continue
            </Button>
        </div>
    );

    return (
        <div className={styles.RegistrationPage}>
            {isRegister ? successAuth : registerForm}
        </div>
    );
}

export default Registration;
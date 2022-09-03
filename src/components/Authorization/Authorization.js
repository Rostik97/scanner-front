import styles from './Authorization.module.css'
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/userSlice";
import {AUTH_URL} from "../../backPathes";

const Authorization = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [loginError, setLoginError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [errorResponse, setErrorResponse] = useState(null);


    const handleSubmit = event => {
        if (event) event.preventDefault();
        console.log("Handle submit");
        if (login === null || login.length < 1) {
            setLoginError("Login cannot be empty")
        }
        if (password === null || password.length < 1) {
            setPasswordError("Password cannot be empty")
        }
        if (login && password) {
            sendAuthRequest(login, password)
        } else {
            console.log("Error")
        }
    }

    const sendAuthRequest = (login, password) => {
        setLoading(true);
        let bodyFormData = new FormData();
        bodyFormData.append("username", login)
        bodyFormData.append("password", password)
        axios.post(AUTH_URL, bodyFormData,
            {
                headers: {"Content-Type": "multipart/form-data"}
            })
            .then(response => {
                console.log(response)
                const token = response.data.access;
                dispatch(setUser({token}))
                setLoading(false);
                navigate("/")
            })
            .catch(err => {
                if (err.response.status === 401) {
                    const msg = err.response.data?.detail ? err.response.data.detail : "Authorization error!";
                    setErrorResponse(msg)
                } else if (err.response?.data || err.response.data === undefined || err.response.data.length < 1) {
                    setErrorResponse("Authorization error! Try again later (-_-)")
                }
                console.log(err)
                setLoading(false);
            });
    }

    const loginHandler = (event) => {
        setErrorResponse(null);
        setLoginError(null);
        setLogin(event.target.value);
    }

    const passHandler = (event) => {
        setErrorResponse(null);
        setPasswordError(null);
        setPassword(event.target.value);
    }

    return (
        <div className={styles.AuthPage}>
            <form onSubmit={handleSubmit} className={styles.Form}>
                <span className={styles.FormTitle}>Sign In</span>
                <div className={styles.Row}>
                    <label className={styles.TextField}>Username:</label>
                    <input type="text"
                           placeholder="Enter login"
                           className="form-control"
                           onChange={loginHandler}/>
                    <span className={styles.Error}>{loginError}</span>
                </div>
                <div className={styles.Row}>
                    <label className={styles.TextField}>Password:</label>
                    <input type="password"
                           placeholder="Enter password"
                           className="form-control"
                           onChange={passHandler}/>
                    <span className={styles.Error}>{passwordError}</span>
                </div>
                <div className={styles.ErrorResponse}>
                    {errorResponse}
                </div>
                <Button type="submit"
                        variant="primary"
                        disabled={loading}
                        onSubmit={handleSubmit}>
                    {
                        loading ?
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"/> :
                            <span>Sign in</span>
                    }
                </Button>
                <div className={styles.RegistrationLink}>
                    Not registered yet? <Link to={"/register"}>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Authorization;
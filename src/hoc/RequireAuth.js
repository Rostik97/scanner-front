import React, {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../useAuth";


const RequireAuth = ({children}) => {
    const {isAuth} = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuth()) {
            console.log("User not auth!")
            navigate("/login", {state: {from: {pathname: location}}});
        } else {
            console.log("User authorized!")
        }
    }, [isAuth, location, navigate])

    return children ? children : <Outlet/>;
};

export {RequireAuth};
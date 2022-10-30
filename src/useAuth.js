import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "./store/userSlice";
import {useNavigate} from "react-router-dom";

export function useAuth() {
    const {email, token, userName} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = () => {
        return token ? true : localStorage.getItem("token");
    }

    const logOut = () => {
        dispatch(removeUser());
        navigate("/");
    }

    return {
        isAuth,
        logOut,
        email,
        userName,
        token
    };
}
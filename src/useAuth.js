import {useSelector} from "react-redux";


export function useAuth() {
    const {email, token, id, userName} = useSelector(state => state.user);

    const isAuth = () => {
        //TODO
        return token ? true : localStorage.getItem("token");
    }

    return {
        isAuth,
        email,
        userName,
        token: localStorage.getItem("token"),
        id
    };
}
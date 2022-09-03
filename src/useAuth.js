import {useSelector} from "react-redux";


export function useAuth() {
    const {email, token, id} = useSelector(state => state.user);

    const isAuth = () => {
        return token ? true : localStorage.getItem("token");
    }

    return {
        isAuth,
        email,
        token: localStorage.getItem("token"),
        id
    };
}
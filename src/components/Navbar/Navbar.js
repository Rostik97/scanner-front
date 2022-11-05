import styles from "./Navbar.module.css"
import {Link, NavLink} from "react-router-dom";
import Logo from "./image.svg";
import React from "react";
import {ReactComponent as LogOutIcon} from './log_out.svg';
import {useAuth} from "../../useAuth";

const Navbar = () => {

    const {logOut} = useAuth();

    return (<div className={styles.Container}>
        <Link to="/">
            <img src={Logo} alt="Logo"/>
        </Link>
        <div className={styles.Menu}>
            <NavLink to="/">
                <div>HOME</div>
            </NavLink>
            <NavLink to="/personal">
                <div>PERSONAL</div>
            </NavLink>
            <NavLink to="/products">
                <div>PRODUCTS</div>
            </NavLink>
            <LogOutIcon onClick={logOut} className={styles.LogOutIcon}/>
        </div>
    </div>)
}

export default Navbar;
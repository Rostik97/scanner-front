import styles from "./Navbar.module.css"
import {Link, NavLink} from "react-router-dom";
import Logo from "./image.svg";
import React from "react";
// import LogOutIcon from './log_out.svg'
import { ReactComponent as LogOutIcon } from './log_out.svg';

const Navbar = () => {
    return (
        <div className={styles.Container}>
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
                {/*<img className={styles.LogOutIcon} src={LogOutIcon} alt="LogOut"/>*/}
                <div className={styles.LogOutIcon}>
                    <LogOutIcon fill="black" width='25' height='25'/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
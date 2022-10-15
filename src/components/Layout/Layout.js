import {Outlet} from "react-router-dom";
import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.css";

const Layout = () => {
    return (
        <>
            <Navbar/>
            <div className={styles.Content}>
                <Outlet/>
            </div>
        </>

    )
}
export default Layout;
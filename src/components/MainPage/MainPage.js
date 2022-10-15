import React from "react";
import styles from "./MainPage.module.css"
import Logo from "./img.svg"
import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div className={styles.Main}>
            <img className={styles.Img} src={Logo} alt="website logo"/>
            <div className={styles.Actions}>
                <Link to="/personal">
                    <div className={styles.Button}>
                        Personal
                    </div>
                </Link>
                <Link to="/products">
                    <div className={styles.Button}>
                        Products
                    </div>
                </Link>
            </div>
        </div>
    );

}
export default MainPage;
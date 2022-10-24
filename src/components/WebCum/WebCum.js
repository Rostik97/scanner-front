import styles from "./WebCum.module.css"
import React, {useState} from "react";
import {useAuth} from "../../useAuth";
import {useNavigate} from "react-router-dom";
import Preview from "../Preview/Preview";
import ScanComponent from "../Scan/ScanComponent";
import TotalPrice from "../TotalPrice/TotalPrice";

const WebCum = () => {
    const [showPreview, setShowPreview] = useState(true);
    const [resultValue, setResultValue] = useState(null);
    const {isAuth, token} = useAuth();
    const navigate = useNavigate();
    const closePreview = () => setShowPreview(false);

    if (!isAuth()) {
        navigate("/login")
    }

    return (
        <div className={styles.Content}>
            {
                showPreview && <Preview handleClose={closePreview}/>
            }
            <ScanComponent setResultValue={setResultValue} token={token}/>
            <TotalPrice resultValue={resultValue}/>
        </div>

    )
}

export default WebCum;
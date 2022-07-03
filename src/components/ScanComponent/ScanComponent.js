import React, {useState} from "react";
import styles from "./ScanComponent.module.css"
import axios from "axios";

const ScanComponent = (props) => {

    const [scannedObject, setScannedObject] = useState()
    const {setResultValue} = props;

    const getScanned = () => {
        axios.get("http://127.0.0.1:8000/")
            .then(response => {
                setResultValue(response.data)
                const data = response.data.map(obj => {
                    return (
                        <div key={obj.id}>
                            {obj.name} - {obj.price}$
                        </div>
                    )
                });
                console.log(data)
                setScannedObject(data)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={styles.ProductList}>
            <div className={styles.ResultWindow}>
                {scannedObject ? <div>{scannedObject}</div> : <p>Нажмите, чтобы сканировать....</p>}
            </div>
            <button onClick={getScanned} className="btn btn-primary btn-lg">
                SCAN
            </button>
        </div>
    )
}


export default ScanComponent
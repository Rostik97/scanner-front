import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./ScanComponent.module.css"
import axios from "axios";
import Webcam from "react-webcam";
import {UPLOAD_URL} from "../../backPathes";
import {videoConstraints} from "../../cameraResolution";

const ScanComponent = (props) => {

    const [scannedObject, setScannedObject] = useState(null);
    const webcamRef = useRef();
    const [image, setImage] = useState(null);
    const {setResultValue} = props;

    useEffect(() => {
        console.log(scannedObject)
    }, [scannedObject])

    const handleCaptureScreenshot = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        }, [webcamRef]
    );

    const resetCapture = () => {
        setImage(null);
        setResultValue(null)
        setScannedObject(null)
    }


    const sendData = () => {
        const formData = new FormData();
        const blob = dataURItoBlob(image);
        // Update the formData object
        formData.append("image", blob, "test.jpg");
        // Details of the uploaded file
        axios.post(UPLOAD_URL, formData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }).then(response => {
            const resultProducts = response.data;
            setScannedObject(resultProducts)
            setResultValue(resultProducts)
        }).catch(e => console.log(e));
    }

    const dataURItoBlob = (dataURI) => {
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    }

    return (
        <div className={styles.ProductList}>
            <div className={styles.ResultWindow}>
                {
                    scannedObject && <div>
                        {
                            scannedObject.products &&
                            scannedObject.products.length > 0 ?
                                (
                                    <h2>Scanned list</h2> && scannedObject.products.map((product, index) => {
                                        return (
                                            <div key={index}>
                                                <p>Name: {product.name}</p>
                                                <p>Price: {product.price}</p>
                                            </div>
                                        )
                                    })
                                )
                                : <div>
                                    No matches found =(
                                </div>
                        }
                    </div>
                }
                {
                    !scannedObject && (image ? <img src={image} alt="screenshot"/>
                        : <Webcam screenshotFormat="image/jpeg"
                                  ref={webcamRef}
                                  videoConstraints={videoConstraints}
                                  width={480}
                                  height={480}
                                  audio={false}/>)
                }
            </div>
            {
                !image &&
                <button onClick={handleCaptureScreenshot} className={`btn btn-outline-primary ${styles.Button}`}>
                    SCAN
                </button>
            }
            {
                image &&
                <>
                    <button onClick={sendData} className={`btn btn-outline-success ${styles.Button}`}>
                        SEND PHOTO
                    </button>
                    <button onClick={resetCapture} className={`btn btn-outline-danger ${styles.Button}`}>
                        RESET
                    </button>
                </>
            }

        </div>
    )
}


export default ScanComponent
import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./ScanComponent.module.css"
import axios from "axios";
import Webcam from "react-webcam";
import {UPLOAD_URL} from "../../backPathes";
import {videoConstraints} from "../../cameraResolution";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeUser} from "../../store/userSlice";

const ScanComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [scannedObject, setScannedObject] = useState(null);
    const webcamRef = useRef();
    const [image, setImage] = useState(null);
    const {setResultValue, token} = props;

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
        setLoading(true);
        const formData = new FormData();
        const blob = dataURItoBlob(image);
        // Update the formData object
        formData.append("image", blob, "test.jpg");
        // Details of the uploaded file
        axios.post(UPLOAD_URL, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const resultProducts = response.data;
            setScannedObject(resultProducts);
            setResultValue(resultProducts);
            setLoading(false)
        }).catch(e => {
            console.log(e)
            if (e.response.status === 401) {
                dispatch(removeUser());
                navigate("/login");
            }
            setLoading(false);
        });
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
                    (scannedObject && !isLoading) && <div>
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
                    (!scannedObject && !isLoading) && (
                        image ? <img src={image} alt="screenshot"/>
                            : <Webcam screenshotFormat="image/jpeg"
                                      ref={webcamRef}
                                      videoConstraints={videoConstraints}
                                      width={550}
                                      height={550}
                                      audio={false}/>
                    )
                }
                {
                    isLoading && <Spinner animation="border" variant="primary"/>
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
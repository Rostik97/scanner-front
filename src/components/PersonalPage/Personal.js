import React, {useEffect, useRef, useState} from "react";
import {videoConstraints} from "../../cameraResolution";
import Webcam from "react-webcam";
import styles from "./Personal.module.css";
import ResultPersonalPhoto from "./ResultPersonalPhoto";
import axios from "axios";
import {FACE_SCAN_URL} from "../../backPathes";
import {removeUser} from "../../store/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../../useAuth";
import {Spinner} from "react-bootstrap";

const Personal = () => {
    const controller = new AbortController();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userName, token} = useAuth();
    const [imgs, setImgs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [countStyle, setCountStyle] = useState('More');
    const [photosStyle, setPhotosStyle] = useState('ResultPhotos');
    const [resultSendPhoto, setResultSendPhoto] = useState(null);
    const webcamRef = useRef();

    useEffect(() => {
        if (imgs.length === 10) {
            setCountStyle("Success");
            setPhotosStyle('ResultPhotosSuccess');
        }
    }, [imgs]);

    const handleCaptureScreenshot = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgs(prevState => {
            console.log(prevState);
            if (prevState.length < 10) {
                return [...prevState, imageSrc]
            } else {
                return prevState;
            }
        });
    };

    const resetPhotos = () => {
        setResultSendPhoto(null);
        setImgs([]);
        setCountStyle("More");
        setPhotosStyle('ResultPhotos');
        setLoading(false);
        controller.abort();
    }

    const sendPhotos = async () => {
        setLoading(true);
        const requests = (formData, token) => axios.post(FACE_SCAN_URL, formData, {
            signal: controller.signal,
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': `Bearer ${token}`
            }
        });
        const promises = imgs.map((img) => {
            let formData = getFormData(img);
            return requests(formData, token);
        });
        await Promise.all(promises)
            .then(response => {
                console.log(response);
                if (response.length === 10 && response.every(response => response.status === 200)) {
                    setResultSendPhoto(`Success!! 
                    Wait for a while. 
                    Stupid machine need time to process your photo...`);
                } else {
                    setResultSendPhoto("Something happened, not all photos has been sent =(");
                }
            }).catch(e => {
                if (e.response.status === 401) {
                    dispatch(removeUser());
                    navigate("/login");
                }
            });
        setLoading(false);
    };

    function getFormData(image) {
        if (image === null || image === undefined) {
            throw new Error("Empty image");
        }
        const formData = new FormData();
        const blob = dataURItoBlob(image);
        formData.append("image", blob, `${userName}.jpg`);
        console.log("Form data object: ", formData);
        return formData;
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
        <div className={styles.PersonalPage}>
            <div className={styles.Camera}>
                <div className={styles.CameraTitle}>
                    <div>
                        Make 10 your own different photos, please
                    </div>
                    <div className={styles[countStyle]}>{imgs.length}/10</div>
                </div>
                {
                    loading
                        ?
                        <div className={styles.Spinner}>
                            <Spinner animation="border" size="bg" variant="primary"/>
                        </div>
                        : (resultSendPhoto ? <div className={styles.SuccessMsg}>{resultSendPhoto}</div>
                            : <Webcam screenshotFormat="image/jpeg"
                                      mirrored="false"
                                      ref={webcamRef}
                                      videoConstraints={videoConstraints}
                                      height={480}
                                      width={850}
                                      audio={false}/>)

                }
                <button onClick={handleCaptureScreenshot} className={`btn btn-outline-primary ${styles.Button}`}>
                    MAKE PHOTO
                </button>
                <button onClick={resetPhotos} className={`btn btn-outline-danger ${styles.Button}`}>
                    RESET
                </button>
                {
                    imgs.length === 10 && <button onClick={sendPhotos}
                                                  className={`btn btn-outline-success ${styles.Button}`}>
                        SEND PHOTOS
                    </button>
                }
            </div>
            <div className={styles[photosStyle]}>
                <ResultPersonalPhoto imgs={imgs}/>
            </div>
        </div>
    )
}

export default Personal;
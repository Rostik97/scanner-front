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

const Personal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userName, token} = useAuth();
    const [imgs, setImgs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [countStyle, setCountStyle] = useState('More');
    const [photosStyle, setPhotosStyle] = useState('ResultPhotos')
    const webcamRef = useRef();
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
        setImgs([]);
        setCountStyle("More");
        setPhotosStyle('ResultPhotos');
    }

    useEffect(() => {
        if (imgs.length === 10) {
            setCountStyle("Success");
            setPhotosStyle('ResultPhotosSuccess');
        }
    }, [imgs]);

    const sendPhotos = () => {
        setLoading(true);
        imgs.forEach(img => sendPhoto(img));
    };

    const sendPhoto = (image) => {
        const formData = new FormData();
        const blob = dataURItoBlob(image);
        // Update the formData object
        formData.append("image", blob, `${userName}.jpg`);
        // Details of the uploaded file
        axios.post(FACE_SCAN_URL, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const resultProducts = response.data;
            console.log(resultProducts);
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
        <div className={styles.PersonalPage}>
            <div className={styles.Camera}>
                <div className={styles.CameraTitle}>
                    <div>
                        Make 10 your own different photos, please
                    </div>
                    <div className={styles[countStyle]}>{imgs.length}/10</div>
                </div>
                <Webcam screenshotFormat="image/jpeg"
                        mirrored="false"
                        ref={webcamRef}
                        videoConstraints={videoConstraints}
                        height={480}
                        width={850}
                        audio={false}/>
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
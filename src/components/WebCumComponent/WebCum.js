// import React, {useState} from 'react';
// import axios from "axios";
// import {UPLOAD_URL} from "../../backPathes";
// import styles from "./WebCum.module.css"
// import Webcam from 'react-webcam';
//
// const WebCum = () => {
//     const [dataUri, setDataUri] = useState('');
//     const [image, setImage] = useState([]);
//
//     const cameraWidth = 360;
//     const cameraHeight = 360;
//     const aspectRatio = cameraWidth / cameraHeight;
//
//     const videoConstraints = {
//         width: {
//             min: cameraWidth
//         },
//         height: {
//             min: cameraHeight
//         },
//         aspectRatio
//     };
//     // const handleTakePhoto = (dataUri) => {
//     //     console.log(dataUri);
//     //     // setImages((arr) => [...arr, dataUri])
//     //     console.log(images);
//     // }
//
//     // const sendData = () => {
//     //     // Create an object of formData
//     //     const formData = new FormData();
//     //     console.log(images);
//     //
//     //     // Update the formData object
//     //     formData.append(
//     //         "file",
//     //         dataURItoBlob(images[0]),
//     //         dataUri.name
//     //     );
//     //     // Details of the uploaded file
//     //     console.log(dataUri);
//     //     axios.post(UPLOAD_URL, formData, {
//     //         headers: {
//     //             'Content-Type': "multipart/form-data"
//     //         }
//     //     })
//     //         .then(response => {
//     //             console.log(response.data)
//     //         }).catch(e => console.log(e));
//     // }
//
//     function dataURItoBlob(dataURI) {
//         let binary = atob(dataURI.split(',')[1]);
//         let array = [];
//         for (let i = 0; i < binary.length; i++) {
//             array.push(binary.charCodeAt(i));
//         }
//         return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
//     }
//
//     return (
//         <div className={styles.CameraContent}>
//             <Webcam videoConstraints={videoConstraints} width={cameraWidth} height={cameraHeight} audio={false}/>
//
//         </div>
//     );
// }
//
// export default WebCum;
//
//
// // class App extends React.Component {
// //     constructor (props, context) {
// //         super(props, context);
// //         this.cameraPhoto = null;
// //         this.videoRef = React.createRef();
// //         this.state = {
// //             dataUri: ''
// //         }
// //     }
// //
// //     componentDidMount () {
// //         // We need to instantiate CameraPhoto inside componentDidMount because we
// //         // need the refs.video to get the videoElement so the component has to be
// //         // mounted.
// //         this.cameraPhoto = new CameraPhoto(this.videoRef.current);
// //     }
// //
// //     startCamera (idealFacingMode, idealResolution) {
// //         this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
// //             .then(() => {
// //                 console.log('camera is started !');
// //             })
// //             .catch((error) => {
// //                 console.error('Camera not started!', error);
// //             });
// //     }
// //
// //     startCameraMaxResolution (idealFacingMode) {
// //         this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
// //             .then(() => {
// //                 console.log('camera is started !');
// //             })
// //             .catch((error) => {
// //                 console.error('Camera not started!', error);
// //             });
// //     }
// //
// //     takePhoto () {
// //         const config = {
// //             sizeFactor: 1
// //         };
// //
// //         let dataUri = this.cameraPhoto.getDataUri(config);
// //         this.setState({ dataUri });
// //     }
// //
// //     stopCamera () {
// //         this.cameraPhoto.stopCamera()
// //             .then(() => {
// //                 console.log('Camera stoped!');
// //             })
// //             .catch((error) => {
// //                 console.log('No camera to stop!:', error);
// //             });
// //     }
// //
// //     render () {
// //         return (
// //             <div>
// //                 <button onClick={ () => {
// //                     let facingMode = FACING_MODES.ENVIRONMENT;
// //                     let idealResolution = { width: 640, height: 480 };
// //                     this.startCamera(facingMode, idealResolution);
// //                 }}> Start environment facingMode resolution ideal 640 by 480 </button>
// //
// //                 <button onClick={ () => {
// //                     let facingMode = FACING_MODES.USER;
// //                     this.startCamera(facingMode, {});
// //                 }}> Start user facingMode resolution default </button>
// //
// //                 <button onClick={ () => {
// //                     let facingMode = FACING_MODES.USER;
// //                     this.startCameraMaxResolution(facingMode);
// //                 }}> Start user facingMode resolution maximum </button>
// //
// //                 <button onClick={ () => {
// //                     this.takePhoto();
// //                 }}> Take photo </button>
// //
// //                 <button onClick={ () => {
// //                     this.stopCamera();
// //                 }}> Stop </button>
// //
// //                 <video
// //                     ref={this.videoRef}
// //                     autoPlay="true"
// //                 />
// //                 <img
// //                     alt="imgCamera"
// //                     src={this.state.dataUri}
// //                 />
// //             </div>
// //         );
// //     }

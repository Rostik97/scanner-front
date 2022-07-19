const cameraWidth = 720;
const cameraHeight = 720;
const aspectRatio = cameraWidth / cameraHeight;

export const videoConstraints = {
    width: {
        min: cameraWidth
    },
    height: {
        min: cameraHeight
    },
    aspectRatio
};
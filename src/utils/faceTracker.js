/**
 * Face Tracker utility using MediaPipe Face Detection
 */

let faceDetection;
let isInitialized = false;
let currentFace = null;

export async function initFaceTracker() {
    if (isInitialized) return;

    faceDetection = new window.FaceDetection({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
        }
    });

    faceDetection.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5
    });

    faceDetection.onResults((results) => {
        if (results.detections && results.detections.length > 0) {
            // Take the largest (closest) face
            currentFace = results.detections[0];
        } else {
            currentFace = null;
        }
    });

    isInitialized = true;
}

export async function processVideo(video) {
    if (!faceDetection || !isInitialized) return;
    try {
        await faceDetection.send({ image: video });
    } catch (err) {
        console.warn("Face Detection Send Error:", err);
    }
}

export function getTrackingData(canvasW, canvasH) {
    if (!currentFace) return null;

    const bbox = currentFace.boundingBox;

    // In "selfie" view, the video is mirrored.
    // MediaPipe gives normalized X where 0 is left of the RAW video.
    // On our mirrored canvas, the user's "left" side (X=0 in raw) is shown on the RIGHT.
    // So we flip the X: (1 - xCenter)
    const cx = (1 - bbox.xCenter) * canvasW;
    const cy = bbox.yCenter * canvasH;
    const w = bbox.width * canvasW;
    const h = bbox.height * canvasH;

    const landmarks = currentFace.landmarks;
    // Landmark indices for MediaPipe Face Detection:
    // 0: Right Eye (user's perspective, right side of screen)
    // 1: Left Eye (user's perspective, left side of screen)
    // 2: Nose Tip
    // 3: Mouth Center
    // 4: Right Ear
    // 5: Left Ear
    const mappedLandmarks = landmarks ? landmarks.map(l => ({
        x: (1 - l.x) * canvasW,
        y: l.y * canvasH
    })) : null;

    return {
        cx,
        cy,
        w,
        h,
        landmarks: mappedLandmarks,
        bbox: {
            x: cx - w / 2,
            y: cy - h / 2,
            w, h
        }
    };
}

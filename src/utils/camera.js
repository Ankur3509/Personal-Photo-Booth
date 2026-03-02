export async function getCamera() {
    const constraints = {
        video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
    } catch (err) {
        if (err.name === 'NotAllowedError') {
            throw new Error("Camera permission denied. Please allow access and reload.");
        }
        throw err;
    }
}

export function stopCamera(stream) {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

export function countdown(seconds, onTick, onComplete) {
    let count = seconds;
    onTick(count);

    const timer = setInterval(() => {
        count--;
        if (count <= 0) {
            clearInterval(timer);
            onComplete();
        } else {
            onTick(count);
        }
    }, 1000);

    return timer;
}

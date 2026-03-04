export async function getCamera() {
    // Detect mobile and request appropriate resolution
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const constraints = {
        video: {
            facingMode: "user",
            width: { ideal: isMobile ? 720 : 1280 },
            height: { ideal: isMobile ? 1280 : 720 }
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

/** Detect if current device is mobile */
export function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
}

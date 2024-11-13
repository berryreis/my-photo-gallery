document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = Array.from(document.querySelectorAll(".image-item")); // Convert NodeList to Array for easier indexing
    const preview = document.querySelector(".preview");
    const previewImg = document.getElementById("preview-img");
    const imageInfo = document.getElementById("image-info");
    const cameraInfo = document.getElementById("camera-info");
    const lensInfo = document.getElementById("lens-info");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    let currentIndex = -1; // Track currently previewed image
    let hoverTimeout;
    const exifCache = new Map();

    // Define the updatePreviewWithExif function first
    const updatePreviewWithExif = (imgSrc) => {
        const exifData = exifCache.get(imgSrc);
        cameraInfo.textContent = `Camera: ${exifData.make} ${exifData.model}`;
        lensInfo.textContent = `Focal Length: ${exifData.focalLength} | Aperture: ${exifData.aperture} | Exposure Time: ${exifData.exposureTime} | ISO: ${exifData.iso}`;
    };

    const showPreview = (index) => {
        currentIndex = index;
        const item = galleryItems[index];
        
        clearTimeout(hoverTimeout);

        const imgSrc = item.querySelector("img").src;
        previewImg.src = imgSrc;
        imageInfo.textContent = item.getAttribute("data-image") || "Image Info Unavailable";
        cameraInfo.textContent = `Camera: ${item.getAttribute("data-camera") || "Unknown"}`;
        lensInfo.textContent = `Lens: ${item.getAttribute("data-lens") || "Unknown"}`;

        preview.style.visibility = "visible";
        preview.style.opacity = "1";

        if (!exifCache.has(imgSrc)) {
            EXIF.getData(item.querySelector("img"), function() {
                const exifData = EXIF.getAllTags(this);

                console.log(exifData);  // This will print the EXIF data in the browser console

                let make = exifData.Make || "Unknown Make";
                let model = exifData.Model || "Unknown Model";

                if (model.startsWith(make)) {
                    model = model.replace(make, "").trim();  
                }

                const focalLength = exifData.FocalLength || item.getAttribute("data-lens") || "Unknown Focal Length";
                const aperture = exifData.FNumber || "Unknown Aperture";
                const iso = exifData.ISOSpeedRatings || "Unknown ISO";
                
                let exposureTime = exifData.ExposureTime;

if (typeof exposureTime === "number") {
    if (exposureTime < 1) {
        const denominator = Math.round(1 / exposureTime);
        exposureTime = `1/${denominator}`;
    }
} else if (typeof exposureTime === "string" && exposureTime.match(/^1\/\d+$/)) {
    // If it's already in "1/x" format, keep it as is.
    // No need to change the exposureTime value here.
} else if (!exposureTime) {
    exposureTime = "Unknown Exposure";
}

                exifCache.set(imgSrc, { make, model, focalLength, aperture, iso, exposureTime });
                updatePreviewWithExif(imgSrc);
            });
        } else {
            updatePreviewWithExif(imgSrc);
        }
    };

    const hidePreview = () => {
        hoverTimeout = setTimeout(() => {
            preview.style.visibility = "hidden";
            preview.style.opacity = "0";
        }, 100);
    };

    // Event listeners for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener("mouseenter", () => showPreview(index));
        item.addEventListener("mouseleave", hidePreview);
    });

    // Keep preview visible when hovering over it
    preview.addEventListener("mouseenter", () => clearTimeout(hoverTimeout));
    preview.addEventListener("mouseleave", hidePreview);

    // Navigation functions
    const showNextImage = () => {
        if (currentIndex < galleryItems.length - 1) {
            showPreview(currentIndex + 1);
        } else {
            showPreview(0); // Wrap to first image
        }
    };

    const showPreviousImage = () => {
        if (currentIndex > 0) {
            showPreview(currentIndex - 1);
        } else {
            showPreview(galleryItems.length - 1); // Wrap to last image
        }
    };

    // Event listeners for navigation arrows
    rightArrow.addEventListener("click", showNextImage);
    leftArrow.addEventListener("click", showPreviousImage);

    // Keyboard event listener for arrow keys
    document.addEventListener("keydown", function(event) {
        if (preview.style.visibility === "visible") { // Only if the preview is open
            if (event.key === "ArrowRight") {
                showNextImage();
            } else if (event.key === "ArrowLeft") {
                showPreviousImage();
            }
        }
    });
});

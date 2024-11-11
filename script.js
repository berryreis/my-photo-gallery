document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".image-item");
    const preview = document.querySelector(".preview");
    const previewImg = document.getElementById("preview-img");
    const imageInfo = document.getElementById("image-info");
    const cameraInfo = document.getElementById("camera-info");
    const lensInfo = document.getElementById("lens-info");
    let hoverTimeout;

    // Cache EXIF data to avoid redundant processing
    const exifCache = new Map();

    // Function to show the preview
    const showPreview = (item) => {
        // Display preview immediately without delay
        clearTimeout(hoverTimeout);

        item.classList.add("hovered");

        // Set image source and text data from attributes
        const imgSrc = item.querySelector("img").src;
        previewImg.src = imgSrc;
        imageInfo.textContent = item.getAttribute("data-image") || "Image Info Unavailable";
        cameraInfo.textContent = `Camera: ${item.getAttribute("data-camera") || "Unknown"}`;
        lensInfo.textContent = `Lens: ${item.getAttribute("data-lens") || "Unknown"}`;

        preview.style.visibility = "visible";
        preview.style.opacity = "1";

        // Load EXIF data if not cached
        if (!exifCache.has(imgSrc)) {
            EXIF.getData(item.querySelector("img"), function() {
                const make = EXIF.getTag(this, "Make") || "Unknown Make";
                const model = EXIF.getTag(this, "Model") || "Unknown Model";
                const focalLength = EXIF.getTag(this, "FocalLength") || item.getAttribute("data-lens") || "Unknown Focal Length";
                const aperture = EXIF.getTag(this, "FNumber") || "Unknown Aperture";
                const iso = EXIF.getTag(this, "ISOSpeedRatings") || "Unknown ISO";
                const exposureTime = EXIF.getTag(this, "ExposureTime") || "Unknown Exposure";

                // Cache and update EXIF data in preview
                exifCache.set(imgSrc, { make, model, focalLength, aperture, iso, exposureTime });
                updatePreviewWithExif(imgSrc);
            });
        } else {
            updatePreviewWithExif(imgSrc); // Use cached data if available
        }
    };

    // Function to update the preview with EXIF data
    const updatePreviewWithExif = (imgSrc) => {
        const exifData = exifCache.get(imgSrc);
        cameraInfo.textContent = `Camera: ${exifData.make} ${exifData.model}`;
        lensInfo.textContent = `Focal Length: ${exifData.focalLength} | Aperture: ${exifData.aperture} | Exposure Time: ${exifData.exposureTime} | ISO: ${exifData.iso}`;
    };

    // Function to hide the preview
    const hidePreview = () => {
        hoverTimeout = setTimeout(() => {
            preview.style.visibility = "hidden";
            preview.style.opacity = "0";
        }, 100); // Reduced timeout for quicker responsiveness
    };

    // Add event listeners to each image item
    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", () => showPreview(item));
        item.addEventListener("mouseleave", hidePreview);
    });

    // Keep preview visible when hovering over it
    preview.addEventListener("mouseenter", () => clearTimeout(hoverTimeout));
    preview.addEventListener("mouseleave", hidePreview);
});

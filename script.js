document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".image-item");
    const preview = document.querySelector(".preview");
    const previewImg = document.getElementById("preview-img");
    const imageInfo = document.getElementById("image-info");
    const cameraInfo = document.getElementById("camera-info");
    const lensInfo = document.getElementById("lens-info");
    let hoverTimeout;

    // Function to show the preview
    const showPreview = (item) => {
        clearTimeout(hoverTimeout);

        hoverTimeout = setTimeout(() => {
            item.classList.add("hovered");

            const imgSrc = item.querySelector("img").src;
            previewImg.src = imgSrc;

            imageInfo.textContent = item.getAttribute("data-image") || "Image Info Unavailable";
            cameraInfo.textContent = `Camera: ${item.getAttribute("data-camera") || "Unknown"}`;
            lensInfo.textContent = `Lens: ${item.getAttribute("data-lens") || "Unknown"}`;

            preview.style.visibility = "visible";
            preview.style.opacity = "1";

            EXIF.getData(item.querySelector("img"), function() {
                const make = EXIF.getTag(this, "Make") || "Unknown Make";
                const model = EXIF.getTag(this, "Model") || "Unknown Model";
                const focalLength = EXIF.getTag(this, "FocalLength") || item.getAttribute("data-lens") || "Unknown Focal Length";
                const aperture = EXIF.getTag(this, "FNumber") || "Unknown Aperture";
                const iso = EXIF.getTag(this, "ISOSpeedRatings") || "Unknown ISO";
                const exposureTime = EXIF.getTag(this, "ExposureTime") || "Unknown Exposure";

                cameraInfo.textContent = `Camera: ${make} ${model}`;
                lensInfo.textContent = `Focal Length: ${focalLength} | Aperture: ${aperture} | Exposure Time: ${exposureTime} | ISO: ${iso}`;
            });
        }, 300);
    };

    // Function to hide the preview
    const hidePreview = () => {
        hoverTimeout = setTimeout(() => {
            preview.style.visibility = "hidden";
            preview.style.opacity = "0";
        }, 200);
    };

    // Add event listeners to each image item
    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            showPreview(item);
        });

        item.addEventListener("mouseleave", function () {
            hidePreview();
        });
    });

    // Add event listeners to the preview itself to prevent immediate hiding when moving over it
    preview.addEventListener("mouseenter", function () {
        clearTimeout(hoverTimeout); // Keep the preview visible
    });

    preview.addEventListener("mouseleave", function () {
        hidePreview(); // Hide preview only when leaving the preview area
    });
});

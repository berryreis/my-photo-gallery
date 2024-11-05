document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".image-item");
    const preview = document.querySelector(".preview");
    const previewImg = document.getElementById("preview-img");
    const cameraInfo = document.getElementById("camera-info");
    const lensInfo = document.getElementById("lens-info");

    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            // Set preview image source and details
            const imgSrc = item.querySelector("img").src;
            previewImg.src = imgSrc;
            cameraInfo.textContent = `Camera: ${item.getAttribute("data-camera")}`;
            lensInfo.textContent = `Lens: ${item.getAttribute("data-lens")}`;

            // Show the preview section with details at the bottom
            preview.style.visibility = "visible";
            preview.style.opacity = "1";
        });

        item.addEventListener("mouseleave", function () {
            // Hide the preview section when no image is hovered
            preview.style.visibility = "hidden";
            preview.style.opacity = "0";
        });
    });
});

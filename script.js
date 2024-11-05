document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".image-item");
    const previewImg = document.getElementById("preview-img");
    const cameraInfo = document.getElementById("camera-info");
    const lensInfo = document.getElementById("lens-info");

    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            // Set preview image source
            const imgSrc = item.querySelector("img").src;
            previewImg.src = imgSrc;

            // Set image details
            const camera = item.getAttribute("data-camera");
            const lens = item.getAttribute("data-lens");
            cameraInfo.textContent = `Camera: ${camera}`;
            lensInfo.textContent = `Lens: ${lens}`;
        });
    });
});

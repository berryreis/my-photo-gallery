document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".image-item");
    const preview = document.querySelector(".preview");
    const previewImg = document.getElementById("preview-img");
    const imageInfo = document.getElementById("image-ingo");
    const cameraInfo = document.getElementById("camera-info");
    const lensInfo = document.getElementById("lens-info");

    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            // Hide the thumbnail by adding a class
            item.classList.add("hovered");

            // Set preview image source and details
            const imgSrc = item.querySelector("img").src;
            previewImg.src = imgSrc;

            imageInfo.textContent = `${item.getAttribute("data-image")}`;
            cameraInfo.textContent = `Camera: ${item.getAttribute("data-camera")}`;
            lensInfo.textContent = `${item.getAttribute("data-lens")}`;

            // Show the preview section with details in the center
            preview.style.visibility = "visible";
            preview.style.opacity = "1";
        });

        item.addEventListener("mouseleave", function () {
            // Remove the 'hovered' class to show the thumbnail again
            item.classList.remove("hovered");

            // Hide the preview section when no image is hovered
            preview.style.visibility = "hidden";
            preview.style.opacity = "0";
        });
    });
});

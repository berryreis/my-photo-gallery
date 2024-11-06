document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".image-item");
    const preview = document.querySelector(".preview");
    const previewImg = document.getElementById("preview-img");
    const imageInfo = document.getElementById("image-info");
    const cameraInfo = document.getElementById("camera-info");
    const lensInfo = document.getElementById("lens-info");

    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            // Apply class for hover effect
            item.classList.add("hovered");

            // Set preview content and display it
            const imgSrc = item.querySelector("img").src;
            previewImg.src = imgSrc;

            imageInfo.textContent = item.getAttribute("data-image") || "Image Info";
            cameraInfo.textContent = `Camera: ${item.getAttribute("data-camera") || "N/A"}`;
            lensInfo.textContent = `Lens: ${item.getAttribute("data-lens") || "N/A"}`;

            // Make preview visible
            preview.style.visibility = "visible";
            preview.style.opacity = "1";
        });

        item.addEventListener("mouseleave", function () {
            // Remove hover effect class
            item.classList.remove("hovered");

            // Hide the preview with a slight delay to avoid flicker
            setTimeout(() => {
                preview.style.visibility = "hidden";
                preview.style.opacity = "0";
            }, 100); // delay to ensure smooth transition
        });
    });
});

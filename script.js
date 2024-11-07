document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".image-item");
    const preview = document.querySelector(".preview");
    const previewImg = document.getElementById("preview-img");
    const imageInfo = document.getElementById("image-info");
    const cameraInfo = document.getElementById("camera-info");
    const lensInfo = document.getElementById("lens-info");

    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            
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
            }, 300); 
        });
    

        item.addEventListener("mouseleave", function () {
            clearTimeout(hoverTimeout); 

            item.classList.remove("hovered");
            preview.style.visibility = "hidden";
            preview.style.opacity = "0";
    });
});
});


document.addEventListener('DOMContentLoaded', function() {
    const imageItems = document.querySelectorAll('.image-item');
    const previewContainer = document.getElementById('hover-preview');
    const previewImg = document.getElementById('preview-img');
    const imageInfo = document.getElementById('image-info');
    const cameraInfo = document.getElementById('camera-info');
    const lensInfo = document.getElementById('lens-info');

    function displayExifData(imageElement) {
        // Set image source and data-image title
        previewImg.src = imageElement.querySelector('img').src;
        imageInfo.textContent = imageElement.getAttribute('data-image') || "Untitled";

        // Fetch and display EXIF data
        EXIF.getData(imageElement.querySelector('img'), function() {
            const exifData = EXIF.getAllTags(this);
            const make = exifData.Make || "Unknown Camera Make";
            const model = exifData.Model || "Unknown Model";
            const focalLength = exifData.FocalLength || "Unknown Focal Length";
            const iso = exifData.ISOSpeedRatings || "Unknown ISO";
            const exposure = exifData.ExposureTime || "Unknown Exposure Time";

            cameraInfo.textContent = `Camera: ${make} ${model}`;
            lensInfo.textContent = `Focal Length: ${focalLength}, ISO: ${iso}, Exposure: ${exposure}`;
        });
    }

    imageItems.forEach(imageItem => {
        const image = imageItem.querySelector('img');

        imageItem.addEventListener('mouseover', () => {
            previewContainer.style.display = 'block';
            displayExifData(imageItem);
        });

        imageItem.addEventListener('mousemove', (event) => {
            // Position the preview near the cursor
            previewContainer.style.top = `${event.pageY + 20}px`;
            previewContainer.style.left = `${event.pageX + 20}px`;
        });

        imageItem.addEventListener('mouseout', () => {
            previewContainer.style.display = 'none';
        });
    });
});

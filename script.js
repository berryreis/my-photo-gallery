// Array to hold all image elements
const images = Array.from(document.querySelectorAll('.image-item img'));

// Preview elements
const preview = document.querySelector('.preview');
const previewImg = document.getElementById('preview-img');
const imageInfo = document.getElementById('image-info');
const cameraInfo = document.getElementById('camera-info');
const lensInfo = document.getElementById('lens-info');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Track current index for navigation
let currentIndex = 0;

// Function to update the preview content
function updatePreview(index) {
    const imgElement = images[index];
    previewImg.src = imgElement.src;

    // Fetching image data from `data-image`, `data-camera`, and `data-lens` attributes of the parent `div`
    const parentDiv = imgElement.closest('.image-item');
    imageInfo.textContent = parentDiv.getAttribute('data-image') || 'No information available';
    cameraInfo.textContent = parentDiv.getAttribute('data-camera') || '';
    lensInfo.textContent = parentDiv.getAttribute('data-lens') || '';

    // Display the preview
    preview.style.display = 'flex';
}

// Function to handle left arrow click (previous image)
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updatePreview(currentIndex);
});

// Function to handle right arrow click (next image)
rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updatePreview(currentIndex);
});

// Event listener for each image to open preview when clicked
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        updatePreview(currentIndex);
    });
});

// Optional: Close preview on clicking outside of the image
preview.addEventListener('click', (event) => {
    if (event.target === preview) {
        preview.style.display = 'none';
    }
});

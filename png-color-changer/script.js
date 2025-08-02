// Global variables
let originalImageData = null;
let originalCanvas = document.getElementById('originalCanvas');
let modifiedCanvas = document.getElementById('modifiedCanvas');
let originalCtx = originalCanvas.getContext('2d');
let modifiedCtx = modifiedCanvas.getContext('2d');

// File upload handling
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');

uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// Color input synchronization
document.getElementById('fromColor').addEventListener('change', (e) => {
    document.getElementById('fromColorHex').value = e.target.value;
});
document.getElementById('fromColorHex').addEventListener('change', (e) => {
    document.getElementById('fromColor').value = e.target.value;
});
document.getElementById('toColor').addEventListener('change', (e) => {
    document.getElementById('toColorHex').value = e.target.value;
});
document.getElementById('toColorHex').addEventListener('change', (e) => {
    document.getElementById('toColor').value = e.target.value;
});

function handleFile(file) {
    if (!file.type.match('image.*')) {
        alert('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Set canvas size
            originalCanvas.width = img.width;
            originalCanvas.height = img.height;
            modifiedCanvas.width = img.width;
            modifiedCanvas.height = img.height;

            // Draw original image
            originalCtx.drawImage(img, 0, 0);
            originalImageData = originalCtx.getImageData(0, 0, img.width, img.height);
            
            // Initialize modified canvas with original
            modifiedCtx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function setColors(fromColor, toColor) {
    document.getElementById('fromColor').value = fromColor;
    document.getElementById('fromColorHex').value = fromColor;
    document.getElementById('toColor').value = toColor;
    document.getElementById('toColorHex').value = toColor;
}

// Initialize with default colors
setColors('#000000', '#13493f');
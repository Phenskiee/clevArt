const dropArea = document.getElementById("drop-area")
const inputFile = document.getElementById("input-file")
const imageView = document.getElementById("image-view")

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
    let imageLink = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage = `url(${imageLink})`;
    imageView.textContent =  "";
    imageView.style.border = 0;
}

dropArea.addEventListener("dragover", function(e) {
    e.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", function(e) {
    e.preventDefault();
    dropArea.classList.add("dragleave");
});

dropArea.addEventListener("drop", function(e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
});

// // Intercept form submission and handle it manually
// const form = document.getElementById("drop-area");
// form.addEventListener("submit", function(e) {
//     e.preventDefault(); // Prevent default form submission behavior

//     // Send AJAX request to handle form submission
//     const formData = new FormData(form);
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "/predict");
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             // Parse JSON response
//             const response = JSON.parse(xhr.responseText);
//             // Update UI with prediction and class probabilities
//             document.getElementById("prediction").textContent = response.prediction;
//             const progressBar = document.getElementById("progress-bar");
//             progressBar.innerHTML = ""; // Clear previous content
//             response.class_probabilities.forEach(([class_name, probability]) => {
//                 const progress = document.createElement("div");
//                 progress.className = "progress-bar";
//                 progress.innerHTML = `<div class="progress">${class_name} - ${probability.toFixed(2)}%</div>`;
//                 progressBar.appendChild(progress);
//             });
//         } else {
//             console.error("Request failed:", xhr.statusText);
//         }
//     };
//     xhr.onerror = function() {
//         console.error("Request failed:", xhr.statusText);
//     };
//     xhr.send(formData);
// });
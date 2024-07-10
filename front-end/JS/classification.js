function dragOverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    document.getElementById('dropZone').classList.add('hover');
}

function dragEnterHandler(event) {
    event.preventDefault();
    document.getElementById('dropZone').classList.add('hover');
}

function dragLeaveHandler(event) {
    event.preventDefault();
    document.getElementById('dropZone').classList.remove('hover');
}

function dropHandler(event) {
    event.preventDefault();
    document.getElementById('dropZone').classList.remove('hover');
    var files = event.dataTransfer.files;
    if (files.length > 0) {
        var file = files[0];
        if (file.type.startsWith('image/')) {
            displayImage(file);
        }
    }
}

function clearImage() {
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('uploadForm').style.display = 'none';
    document.getElementById('imageInput').value = '';
    document.getElementById('previewImg').setAttribute('src', '#');
}

function fileSelected(event) {
    var files = event.target.files;
    if (files.length > 0) {
        var file = files[0];
        if (file.type.startsWith('image/')) {
            displayImage(file);
        }
    }
}

function displayImage(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('previewImg').setAttribute('src', e.target.result);
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('uploadForm').style.display = 'block';
    }
    reader.readAsDataURL(file);
}
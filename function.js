function displayImage() {
    var input = document.getElementById('imageInput');
    var image = document.getElementById('displayedImage');

    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        image.src = e.target.result;
    };

    reader.readAsDataURL(file);
}
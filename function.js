    
function testImage(){
    var input = document.getElementById('imageInput');
    var image = document.getElementById('displayedImage');

    if (input.files && input.files[0]) {
        var file = input.files[0];

        displayImage(file);
    }
}

function displayImage(file){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        var data = e.target.result;
        document.getElementById('displayedImage').src = data;
        displayImageDimensions(file);
    }
}

function displayImageDimensions (file){
    var img = new Image();
    img.src = URL.createObjectURL(file)
    img.onload = function() {
        var width = img.width;
        var height = img.height;
        if (width != 512 || height != 512){
            alert('Image dimensions should be 512*512')
        }
    }

    
}
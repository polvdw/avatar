    
var input, image, file;
    
function testImage() {

    if (!input || !image) {
        input = document.getElementById('imageInput');
        image = document.getElementById('displayedImage');
        var file = input.files[0];
    }
    
    sizeImage(18)

    /////////////////////////////////////////////////////////

    // Display image //

    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function(e) {
        image.src = e.target.result; 
    }

}

function sizeImage(number) {

    console.log(18)

}
var file, data;
var circleRadius = 256; // threshold chosen arbitrary


function testImage(){
    var input = document.getElementById('imageInput');
    var image = document.getElementById('displayedImage');

    if (input.files && input.files[0]) {
        file = input.files[0];

        displayImage(file);
    }
}

function displayImage(file){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        data = e.target.result;
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
            alert('Image dimensions should be 512*512');
        }
        pixelCircle(img);
    }
}

function pixelCircle(img){
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var imageData = ctx.getImageData(0, 0, img.width, img.height);
    data = imageData.data;

    var centerX = img.width / 2;
    var centerY = img.height / 2;

    var countNTpixOut = 0

    for (let i = 0; i<data.length; i+=4){

        var nonTrasparentpixel = data[i+3] !== 0;
        
        var x = (i/4) % img.width;
        var y = Math.floor((i/4)/img.width);
        var distanceToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

        if (nonTrasparentpixel && distanceToCenter > circleRadius){
            countNTpixOut += 1;
        }
    }

    var ntPixOutpercentage = (countNTpixOut / (data.length / 4)) * 100;
    ntPixOutpercentage = ntPixOutpercentage.toFixed(2);
    if (countNTpixOut > 0){
        alert("You have " + ntPixOutpercentage + "% of non transparent pixel out of a " + circleRadius + " radius circle.");
    }
    
    colorMoodDetection();

}

function colorMoodDetection(){

    var totalBrightness = 0;
    var totalSaturation = 0;

    for (let i=0; i < data.length; i+=4){

        red = data[i];
        green = data[i+1];
        blue = data[i+2];

        // Convert RGB to HSL
        var max = Math.max(red, green, blue);
        var min = Math.min(red, green, blue);
        var lightness = max / 255; //http://voc500.be/textes/coulumsat.asp#:~:text=Par%20exemple%2C%20la%20luminosit%C3%A9%20du,255%2F255%20%3D%20100%20%25.

        //Saturation
        var saturation = 0;
        if (lightness > 0 && lightness < 1){
        saturation = (max - min) / max 
        }

        totalBrightness += lightness;
        totalSaturation += saturation;

    }

    
    averageBrightness = totalBrightness / (data.length/4);
    averageSaturation = totalSaturation / (data.length/4);

    if (averageBrightness < 0.05) {
        alert("Your image is too sad for an avatar ... Try something more bright !");
    }

    displayAvatar();
}

function displayAvatar(){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        var data = e.target.result;
        var img = new Image();
        img.src = data;

        img.onload = function(){
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            
            canvas.width = circleRadius * 2;
            canvas.height = circleRadius * 2;
            
            ctx.beginPath();
            ctx.arc(circleRadius, circleRadius,circleRadius,0, 2*Math.PI);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 512, 512);

            document.getElementById("displayedAvatar").src = canvas.toDataURL();
        }
    }
}

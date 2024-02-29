let imageDetails, imageBase64, imagePixels;
const CIRCLERADIUS = 256;

function testInput(inputElement) {
    if (inputElement.files && inputElement.files[0]){
        imageDetails = inputElement.files[0];
        console.log("testInput");
        displayImage(imageDetails);
        }
}

function displayImage(imageDetails) {

    // Create a FileReader object
    console.log("displayImage");
    const reader = new FileReader();
    reader.readAsDataURL(imageDetails);

    // Once the file is read, file data are given as a source to the displayedImage balise
    // to display the image in the UI.
    reader.onload = function (readerResults){
        imageBase64 = readerResults.target.result;
        document.getElementById("displayedImage").src = imageBase64;
        checkImageDimensions(imageDetails);
    }
}

function checkImageDimensions(imageDetails) {

    console.log("checkImageDimensions");

    // Create an image object
    const imgObject = new Image();
    imgObject.src = URL.createObjectURL(imageDetails);

    // Once the image is created, we fetch the width and the weight to create an alert
    // in case they are different from 512*512.
    imgObject.onload = function() {
        const width = imgObject.width;
        const height = imgObject.height;
        if (width != 512 || height != 512){
            alert('Image dimensions should be 512*512');
        }
        checkNtpCircle(imgObject, width, height, CIRCLERADIUS);
    }
}

function checkNtpCircle(imgObject, width, height, CIRCLERADIUS){

    console.log("checkNtpCircle");

    // Create a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Draw the image on the canvas
    ctx.drawImage(imgObject, 0, 0, width, height);

    // Get the image data (pixels information)
    const canvasImgDetails = ctx.getImageData(0, 0, width, height);
    imagePixels = canvasImgDetails.data;

    const centerX = width / 2;
    const centerY = height / 2;

    const circleRadiusSquared = CIRCLERADIUS * CIRCLERADIUS;

    // For each pixel :
    // Check if it is transparent
    // Compute its distance to center
    for (let i = 0; i<imagePixels.length; i+=4){
        if (imagePixels[i+3] !== 0) {
            const x = (i/4) % width;
            const y = Math.floor((i/4)/width);
            const distanceToCenterSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2);
            if (distanceToCenterSquared > circleRadiusSquared) {
                alert("You have at least 1 non transparent pixel out of the limited circle for the badge.");
                break;
            }
        }
    }

    detectColorMood(imagePixels);

}

function detectColorMood(imagePixels){
    console.log("detectColorMood");

    let totalBrightness = 0;
    let totalIntensity = 0;
    let countNtPix = 0;

    // Compute the lightness and intensity of the image taking into account only the non transparent pixel
    for (let i=0; i < imagePixels.length; i+=4){

        const transparency = imagePixels[i+3];
        
        if(transparency !== 0){

            // Each pixel has 4 values in data : red, green, blue and trasparency.
            const red = imagePixels[i];
            const green = imagePixels[i+1];
            const blue = imagePixels[i+2];

            const max = Math.max(red, green, blue);
            const min = Math.min(red, green, blue);

            const lightness = max / 255;
            const intensity = (red + green + blue) / 3;

            totalBrightness += lightness;
            totalIntensity += intensity;
            countNtPix += 1;

        }

    }

    const averageBrightness = totalBrightness / countNtPix;
    const averageIntensity = totalIntensity / countNtPix;

    // If the image has an average intensity < 100 or an average brightness < 0.5 :
    // it is considered as a "sad" image.
    if (averageIntensity < 100 || averageBrightness < 0.5) {
        alert("Your image is too sad for a badge ... Try something brighter !");
    }

    displayAvatar(imageBase64, CIRCLERADIUS);

}

function displayAvatar(imageBase64, CIRCLERADIUS) {

    console.log("displayAvatar");

    const img = new Image();
    img.src = imageBase64;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = CIRCLERADIUS * 2;
    canvas.height = CIRCLERADIUS * 2;

    ctx.beginPath();
    ctx.arc(CIRCLERADIUS, CIRCLERADIUS, CIRCLERADIUS, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, CIRCLERADIUS * 2, CIRCLERADIUS * 2);

    ctx.strokeStyle = 'rgb(86,61,45)';
    ctx.lineWidth = 20;
    ctx.stroke();

    document.getElementById('displayedAvatar').src = canvas.toDataURL();
}


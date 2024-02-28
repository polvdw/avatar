let imageDetails, imagePixels, imageBase64;
const circleRadius = 256; // threshold chosen as the half of 512 px.

function testImage(){
    const userInput = document.getElementById('imageInput');
    // console.log(userInput);

    // If the user upload files, the first one is stored in file variable.    
    if (userInput.files && userInput.files[0]) {
        imageDetails = userInput.files[0];
        displayImage(imageDetails);
    }
}

function displayImage(imageDetails){

    // Create a FileReader object
    const reader = new FileReader();
    reader.readAsDataURL(imageDetails);

    // Once the file is read, file data are given as a source to the displayedImage balise
    // to display the image in the UI.
    reader.onload = function (e) {
        imageBase64 = e.target.result;
        document.getElementById('displayedImage').src = imageBase64;
        checkImageDimensions(imageDetails);
    };
}

function checkImageDimensions (imageDetails){

    // Create an image object with the URL correponding to the file as a source.
    const img = new Image();
    img.src = URL.createObjectURL(imageDetails);

    // Once the image is created, we fetch the width and the weight to create an alert
    // in case they are different from 512*512.
    img.onload = function() {
        var width = img.width;
        var height = img.height;
        if (width != 512 || height != 512){
            alert('Image dimensions should be 512*512');
        }
        checkNtpCircle(img);
    };
}

function checkNtpCircle(img){

    // Create a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Get the image data (pixels information)
    const canvasImgDetails = ctx.getImageData(0, 0, img.width, img.height);
    imagePixels = canvasImgDetails.data;

    const centerX = img.width / 2;
    const centerY = img.height / 2;

    let countNtpOut = 0;
    const circleRadiusSquared = circleRadius * circleRadius;

    // For each pixel :
    // Check if it is transparent
    // Compute its distance to center
    for (let i = 0; i<imagePixels.length; i+=4){
        if (imagePixels[i+3] !== 0) {
            const x = (i/4) % img.width;
            const y = Math.floor((i/4)/img.width);
            const distanceToCenterSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2);
            if (distanceToCenterSquared > circleRadiusSquared) {
                alert("You have at least 1 non transparent pixel out of the limited circle for the badge.");
                break;
            }
        }
    }

    detectColorMood();

}

        /*
        const nonTrasparentpixel = imagePixels[i+3] !== 0;
        const x = (i/4) % img.width;
        const y = Math.floor((i/4)/img.width);
        const distanceToCenterSquared = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2);

        // If it is transparent and its distance to center > circle radius = 256 :
        // update the count of nontransparent pixel.
        if (nonTrasparentpixel && distanceToCenterSquared > circleRadiusSquared){
            countNtpOut += 1;
        }
    }
        */

    // Compute the % and display it in the alert
    /*
    const ntpOutPercent = ((countNtpOut / (imagePixels.length / 4)) * 100).toFixed(2);
    if (countNtpOut > 0){
        alert("You have " + ntpOutPercent + "% of non transparent pixel out of the limited circle for the badge.");
    }
    */

    // detectColorMood();

// }

function detectColorMood(){

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

    displayAvatar();
}

function displayAvatar(){

        const img = new Image();
        img.src = imageBase64;

        // Creation of canvas with the dimension of the desired circle
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = circleRadius * 2;
        canvas.height = circleRadius * 2;
        
        // Create the circle on the canvas that will limit the drawing of the image.
        ctx.beginPath();
        ctx.arc(circleRadius, circleRadius,circleRadius,0, 2*Math.PI);
        ctx.closePath();
        ctx.clip();

        // Draw the image on the circle canvas
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, circleRadius * 2, circleRadius * 2);
        
        // Make the border brown and thick
        ctx.strokeStyle = 'rgb(86,61,45)';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Display it on the UI
        document.getElementById("displayedAvatar").src = canvas.toDataURL();
}

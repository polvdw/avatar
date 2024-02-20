let file, data;
const circleRadius = 256; // threshold chosen arbitrary


function testImage(){
    const input = document.getElementById('imageInput');

    if (input.files && input.files[0]) {
        file = input.files[0];
        displayImage(file);
    }
}

function displayImage(file){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        const dataFile = e.target.result;
        document.getElementById('displayedImage').src = dataFile;
        checkImageDimensions(file);
    };
}

function checkImageDimensions (file){
    const img = new Image();
    img.src = URL.createObjectURL(file);
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
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    data = imageData.data;

    const centerX = img.width / 2;
    const centerY = img.height / 2;

    let countNtpOut = 0;

    for (let i = 0; i<data.length; i+=4){
        const nonTrasparentpixel = data[i+3] !== 0;
        const x = (i/4) % img.width;
        const y = Math.floor((i/4)/img.width);
        const distanceToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

        if (nonTrasparentpixel && distanceToCenter > circleRadius){
            countNtpOut += 1;
        }
    }

    const ntpOutPercent = ((countNtpOut / (data.length / 4)) * 100).toFixed(2);
    // ntpOutPercent = ntpOutPercent.toFixed(2);
    if (countNtpOut > 0){
        alert("You have " + ntpOutPercent + "% of non transparent pixel out of the limited circle for the avatar.");
    }
    
    detectColorMood();

}

function detectColorMood(){

    let totalBrightness = 0;
    let totalSaturation = 0;
    let totalIntensity = 0;
    let countNtPix = 0;

    for (let i=0; i < data.length; i+=4){

        const transparency = data[i+3];

        // Convert RGB to HSL
        if(transparency !== 0){

            const red = data[i];
            const green = data[i+1];
            const blue = data[i+2];

            const max = Math.max(red, green, blue);
            const min = Math.min(red, green, blue);
            const lightness = max / 255; //http://voc500.be/textes/coulumsat.asp#:~:text=Par%20exemple%2C%20la%20luminosit%C3%A9%20du,255%2F255%20%3D%20100%20%25.

            // Saturation
            let saturation = 0;
            if (lightness > 0 && lightness < 1){
            saturation = (max - min) / max;
            }

            const intensity = (red + green + blue) / 3;

            totalBrightness += lightness;
            totalSaturation += saturation;
            totalIntensity += intensity;
            countNtPix += 1;

        }

    }

    const averageBrightness = totalBrightness / countNtPix;
    const averageSaturation = totalSaturation / countNtPix;
    const averageIntensity = totalIntensity / countNtPix;

    if (averageIntensity < 100 || averageBrightness < 0.5) {
        alert("Your image is too sad for an avatar ... Try something more bright !");
    }
    // console.log("average Brightness = " + averageBrightness);
    // console.log("average Saturation = " + averageSaturation);
    // console.log("Average intensity = " + averageIntensity);
    // console.log("pix nt = " + countNtPix);

    displayAvatar();
}

function displayAvatar(){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        const data = e.target.result;
        const img = new Image();
        img.src = data;

        img.onload = function(){
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = circleRadius * 2;
            canvas.height = circleRadius * 2;
            
            ctx.beginPath();
            ctx.arc(circleRadius, circleRadius,circleRadius,0, 2*Math.PI);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, circleRadius * 2, circleRadius * 2);

            document.getElementById("displayedAvatar").src = canvas.toDataURL();
        };
    };
}

# Instructions to run the badge creator

Hello and welcome to the Badge Creator tutorial 🎮

To run this badge creator code, you need to follow a few simple and quick steps:

1. Download the index.html and function.js files and put them in the **same folder**. Download the pngs in png_examples (you can also use personal ones). 

2. Open the html on your browser (I worked on Google Chrome).

3. Upload the png you want to transform in a badge by clicking on "choisir un ficher" under "Create your Badge".

That's it, you will see if some alerts are triggered and have your own badge! 🙌

***************

# Code Explanations

### HTML

The html is basic with one balise for the original image you upload and one for the final badge created. I took some dynamic colors and font as it is a gaming project.

#### JavaScript

When the user choosed an input, the js function testImage() starts.

- **testImage()** <br>
Check if we have the input has enough information to display and use it.

- **displayImage()** <br>
Display the original image.

- **checkImageDimensions()** <br>
Check the width and height of the input png. If it is not 512*512, an alert is triggered and displayed on the UI. None alert triggered will stop the processus of badge creation as the instructions require. In my opinion, in a real word case, it would be better to stop the process and make the user change his input in order to have his badge created.

- **checkNtpCircle()** <br>
Check the % of nontransparent pixels out of the desired circle using canvas and euclidian distance. An alert is displayed if some pixels are out of bound with their %.

- **detectColorMood()** <br>
After various tests, I chose to create a decision rule on the brightness and intensity of the images. It seems to work well on training and unseen image.<br>
If the average intensity > 100 or the average brightness < 0.5 => an alert is displayed to inform the user that his image is probably a bit too sad for a badge in our game. <br>
I didn't use saturation as I didn't find any linear separator with this attribute. <br>
I computed these metrics and the average using only the nontransparent pixel.

- **displayAvatar()** <br>
Using canvas, a circular avatar is created with a brown borde and displayed next to the input image.

***************

### Instructions received by email

I'm sharing below a take-home exercise that you can do with JS ideally. You can share a public repo when you are done. Everything (!) will be judged by our CTO when reviewing the exercise (code, repo structure, etc). We want users to upload a badge: an avatar within a circle.

Create a function taking a png as input and verifying that:
Size = 512x512
The only nontransparent pixels are within a circle
The colors of the badge give a "happy" feeling
You can also create a parallel function that converts the given image (of any format) into the specified object.

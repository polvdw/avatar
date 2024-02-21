# Instructions to run the badge creator

Hello and welcome to the Badge Creator tutorial 🎮

To run this badge creator code, you need to follow a few simple and quick steps:

1. Download the index.html, function.js files and the pngs in png_examples (you can also use personal ones). Put them in the **same folder**.

2. Open the html on your browser (I worked on Google Chrome).

3. Upload the image you want to transform in a badge by clicking on "choisir un ficher" under "Create your Badge".

That's it, you will see if some alerts are triggered and have your own badge! 🙌

-------------------------------------------------

# Code Explanations


-------------------------------------------------

### Instructions received by email

I'm sharing below a take-home exercise that you can do with JS ideally. You can share a public repo when you are done. Everything (!) will be judged by our CTO when reviewing the exercise (code, repo structure, etc). We want users to upload a badge: an avatar within a circle.

Create a function taking a png as input and verifying that:
Size = 512x512
The only nontransparent pixels are within a circle
The colors of the badge give a "happy" feeling
You can also create a parallel function that converts the given image (of any format) into the specified object.

##### HSL
//http://voc500.be/textes/coulumsat.asp#:~:text=Par%20exemple%2C%20la%20luminosit%C3%A9%20du,255%2F255%20%3D%20100%20%25
Hue représente la teinte dominante ou la couleur proprement dite. Changer la teinte d'une couleur rouge à 60°, elle deviendra jaune. Saturation mesure l'intensité de la couleur : une couleur rouge à 50% de saturation serait moins vive que la même couleur à 100% de saturation. Brightness indique la luminosité ou l'intensité lumineuse de la couleur - quantité de lumière dans la couleur. une couleur bleue avec une luminosité de 80% serait plus claire qu'une couleur bleue avec une luminosité de 30%.


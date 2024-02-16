function displayImage() {
    // On crée une variable input où on va chercher dans le html (document), l'élément avec l'id imageInput => le file que l'utilisateur upload.
    // On utilisera donc input pour utiliser cette file.
    var input = document.getElementById('imageInput');

    // Pareil mais pour l'image sans source.
    var image = document.getElementById('displayedImage');

    // La variable file est le premier fichier donné par l'utilisateur (il ne peut en donner qu'un).
    var file = input.files[0];

    // On crée une nouvelle instance de l'objet FileReader qui est une interface JS qui permet à l'html de lire le contenu d'un fichier stocké sur l'ordi de l'utilisateur.
    var reader = new FileReader();

     // événement qui se déclenche quand le File Reader a fini de lire le fichier.
     // e est une fonction anonyme qui s'exécute quand onload se produit
    reader.onload = function(e) {
        image.src = e.target.result; // e.target.result contient les données du fichier que lit reader plus bas : file qui est l'image de l'utilisateur. On l'assign à la variable image qui est la balise html image qu'on display.
    };

    // Le FileReader lit la file (document déposé par l'utilisateur)
    reader.readAsDataURL(file);
}
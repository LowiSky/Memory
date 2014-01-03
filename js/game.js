/* ----------------------------------- *\
                Variables
\* ----------------------------------- */
	
    // Variables de configuration

    	var level = false; // Difficulté
    	var players = 1; // Nombre de joueurs (Max 2)

    // HTML elements

        // Level
        var button_easy = document.getElementById('button_easy');
        var button_medium = document.getElementById('button_medium');
        var button_hard = document.getElementById('button_hard');
        var level_page = document.getElementById('level');

        // Players
        var button_1_player = document.getElementById('button_1_player');
        var button_2_player = document.getElementById('button_2_players');
        var players_page = document.getElementById('players');

        // Paramètres
        var nav_page = document.getElementById('nav');





/* ----------------------------------- *\
                Algorithme
\* ----------------------------------- */


    // Choix du niveau

        function choixLevel(callback){

            // Clique sur le bouton "Facile"
            button_easy.onclick = function(){   
                level = "Facile";
                supprimerDiv(level_page);
                callback();          
            }

            // Clique sur le bouton "Moyen"
            button_medium.onclick = function(){
                level = "Moyen";
                supprimerDiv(level_page);
                callback();
            }

            //Clique sur le bouton "Difficile"
            button_hard.onclick = function(){
                level = "Difficile";
                supprimerDiv(level_page);
                callback();
            }
        }

    // Choix du nombre de joueurs

        function choixJoueurs(callback){
            
            // Clique sur le bouton "Un Joueur"
            button_1_player.onclick = function(){
                players = 1;
                supprimerDiv(players_page);
                callback();
            }

            // Clique sur le bouton "Deux Joueurs"
            button_2_player.onclick = function(){
                players = 2;
                supprimerDiv(players_page);
                callback();
            }
        }



    // Afficher les paramètres

        function afficherParametres(callback){

            // Création des textes de paramètres
            switch (players){
                case 1: 
                    var players_text = "Un Joueur";
                    break;
                case 2:
                    var players_text = "Deux Joueurs";
                    break;
            }

            // Création du module indiquant les paramètres
            var tag_settings_container = document.createElement('div');
            tag_settings_container.id = "settings";
            tag_settings_container.innerHTML = '<p><span class="setting">'+level+'</span> - <span class="setting">'+players_text+'</span></p>';

            nav_page.appendChild(tag_settings_container); // Ajout dans la DOM

            callback();
        }


    // Générer le tableau

        function genererTableau(){
            var array = []; // Tableau avec les valeurs
            var array_length; // Taille du tableau en fct de la difficulté
            var j = 0; // Chiffre à ajouter dans le tableau (voir remplissage du tableau)


            // On défini la taille du tableau
            switch (level){
                case "Facile":
                    array_length = 16; // En facile, il faudra deviner 16 cartes (4*4)
                    break;
                case "Moyen":
                    array_length = 42; // En moyen, il faudra deviner 36 cartes (6*6)
                    break;
                case "Difficile":
                    array_length = 100; // En Difficile, il faudra deviner 100 cartes (10*10)
                    break;
                default:
                    array_length = 16; // Par défaut on met en facile au cas-où
            }


            // Remplissage du tableau
            for(var i = 0; i < array_length; i = i + 2){ //On parcours le tableau de 2 en 2 pour ajouter le même chiffre 2 fois à chaque passage
                array.push(j);
                array.push(j);
                j++;
            }

            // Mélange du tableau
            melangeTableau(array);

            alert(array+'\n\n'+array.length);
        }





    // Executions de toutes les fonctions en callback

       choixLevel(function() {
            choixJoueurs(function() {
                afficherParametres(function() {
                    genererTableau(function(){

                    });
                });
            });
        });






/* ----------------------------------- *\
                Fonctions
\* ----------------------------------- */


// Fonction qui permet de mélanger des tableaux
function melangeTableau(array) {

	// 	Variables : 	
	//		c = compteur, pour parcourire le tableau
	//		temp = temporaire, pour stocker une valeur du tableau temporairement
	//		indice, un index du tableau choisi au hasard
	

    var c = array.length; // c vaut la taille du tableau
    var temp;
    var indice;

    // On parcours le tableau grâce à c, du dernier indice au premier (1)
    while (c > 0) {

        // On choisit un indice au hasard. 
        // (random choisi un nombre entre 0 et 1 (non-inclu), il est multiplié par l'indice actuellement sélectionné, puis arrondi grâce à floor)
        indice = Math.floor(Math.random() * c);

        // On passe à l'indice précedant
        c--;

        // On échange la valeur de l'indice choisi et la valeur de l'indice actuel
        temp = array[c];
        array[c] = array[indice];
        array[indice] = temp;
    }

    // On renvoi le tableau mélangé
    return array;
}





// Fonction de création d'un fondu arrière (disparition)
function fonduArriere(element) {
    var opacite = 1;  // Opacité initiale
    
    var timer = setInterval(function () { // Boucle qui s'execute toute les 10ms, pour baisser l'opacité

        if (opacite < 0.1){ // Si l'opacité est à 0
            clearInterval(timer); // On arrête la boucle à intervalle
            element.style.display = 'none'; // On cache la div
        }

        element.style.opacity = opacite; // Pour tous les navigateur (opacity)
        element.style.filter = 'alpha(opacity=' + opacite * 100 + ")"; // Pour I.E. (filter)
        opacite -= opacite * 0.1; // On enlève 10% de l'opcaité

    }, 10);
}




// Fonction de création d'un fondu avant (apparition)
function fonduAvant(element) {
    var opacite = 0;  // Opacité initiale
    
    var timer = setInterval(function () { // Boucle qui s'execute toute les 10ms, pour baisser l'opacité

        if (opacite >= 0.9){ // Si l'opacité est à 1
            clearInterval(timer); // On arrête la boucle à intervalle
        }

        element.style.opacity = opacite; // Pour tous les navigateur (opacity)
        element.style.filter = 'alpha(opacity=' + opacite * 100 + ")"; // Pour I.E. (filter)
        opacite += opacite * 0.1; // On enlève 10% de l'opcaité

    }, 10);
}





// supprimer une div avec fondu
function supprimerDiv(element){
    fonduArriere(element);
    setTimeout(function(){
        element.parentNode.removeChild(element); // Suppression de la dive element
    },1000); // Après l'animation
}

// Recharger la page par click sur le logo
function reloadGame(){
    var logo_link = document.getElementById('logo');

    logo_link.onclick = function(){
        location.reload(); // On recharge au click sur le logo
    }
}
reloadGame(); //On execute la fonction dès le démarrage.
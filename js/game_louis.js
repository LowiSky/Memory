/* ----------------------------------- *\
                Variables
\* ----------------------------------- */
	
    // Variables de configuration

    	var level = false; // Difficulté
    	var players = 1; // Nombre de joueurs (Max 2)
        var array= []; // Tableau avec les indices par carte (voir genererTableau)

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

        // Génération des cartes
        var game_page = document.getElementById('deck')
        var cartes = document.getElementsByTagName('td');

        // Jeu
        var nb_cliques = 0;
        var carte_1;
        var carte_2;

        // Compteur Paires
        var paires = 0;





/* ----------------------------------- *\
              Initialisation
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

            // Clique sur le bouton "Deux Joueurs" (Indisponible)
            /*  button_2_player.onclick = function(){
                players = 2;
                supprimerDiv(players_page);
                callback();
            } */
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

        function genererTableau(callback){
            var array_length; // Taille du tableau en fct de la difficulté
            var j = 0; // Chiffre à ajouter dans le tableau (voir remplissage du tableau)


            // On défini la taille du tableau
            switch (level){
                case "Facile":
                    array_length = 16; // En facile, il faudra deviner 16 cartes (4*4)
                    break;
                case "Moyen":
                    array_length = 42; // En moyen, il faudra deviner 42 cartes (6*7)
                    break;
                case "Difficile":
                    array_length = 112; // En Difficile, il faudra deviner 100 cartes (10*10)
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

            callback();
        }


    // Générer les cartes en HTML

        function genererCartes(callback){

            var carte_width = 0;
            var carte_height = 0;

            // On défini le nombre de cartes par lignes en fonction de la difficulté, et la taille des cartes (plus elles sont nombreuses plus elles sont petites)
            var largeurDeck;
            switch (level){
                case "Facile":
                    largeurDeck = 4;
                    carte_width = '100px';
                    carte_height = '140px';
                    break;
                case "Moyen":
                    largeurDeck = 7;
                    carte_width = '70px';
                    carte_height = '90px';
                    break;
                case "Difficile":
                    largeurDeck = 16;
                    carte_width = '50px';
                    carte_height = '75px';
                    break;
            }


            // On parcours le tableau en allant de 0 à c (la taille du tableau)
            for(var i = 0, c = array.length, j = 0; i < c; i++){
                
                // Pour créer une nouvelle ligne (voir en bas)
                if(j==0){
                    var ligne = document.createElement('tr');
                    game_page.appendChild(ligne);
                }

                // Pour créer une carte
                var carte = document.createElement('td'); // La cellule du tableau
                var contenu_carte = document.createElement('p'); // Son contenu

                carte.appendChild(contenu_carte); // On ajoute le contenu à la carte
                carte.style.width = carte_width; // On lui met la hhauteur et la largeur choisi auparavant
                carte.style.height = carte_height;
                carte.setAttribute('onclick', 'jeu(this.id)');
                carte.setAttribute('id', i);
                game_page.lastChild.appendChild(carte); // On ajoute la carte à la dernière ligne du deck

                // On souhaite réaliser des lignes de "largeurDeck" cartes, donc j augmente jusqu'à atteindre cette valeur, on insère alors une nouvelle ligne (voir en haut)
                j++;
                if(j == largeurDeck){
                    j = 0;
                }
            }



            callback();
        }





/* ----------------------------------- *\
                   Jeu
\* ----------------------------------- */

    function jeu(id_carte){ // 
       

       // Première carte retournée
        if(nb_cliques == 0){
            carte_1 = array[id_carte]; // On enregistre la valeur de la carte 1
            alert('Carte 1');

            var carte_selectionee = document.getElementById(id_carte);
            var carte_valeur = document.createTextNode(carte_1);
            carte_selectionee.firstChild.appendChild(carte_valeur);
        }

        // Seconde carte retournée
        if(nb_cliques == 1){

            nb_cliques = 0; // On remet à zéro pour re-retourner deux nouvelles cartes
            carte_2 = array[id_carte];
            alert('Carte 2');

            var carte_selectionee = document.getElementById(id_carte);
            var carte_valeur = document.createTextNode(carte_2);
            carte_selectionee.firstChild.appendChild(carte_valeur);

            if(carte_1 == carte_2){
                 
                // Tu appel la fonction compteurPaires
                // Tu retourne les paires
		        function (compteurPaires);
		
            }
        }

        nb_cliques++;
        
    }


    function compteurPaires(){
        // Incrémentation de la variable compteur
	
	    paires++;

    }






/* ----------------------------------- *\
            Execution finale
\* ----------------------------------- */

    // Executions de toutes les fonctions en callback

       choixLevel(function() {
            choixJoueurs(function() {
                afficherParametres(function() {
                    genererTableau(function() {
                        genererCartes(function() {
                            /*jeu(function() {

                            });*/
                        });
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
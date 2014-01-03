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
        var carte_1_valeur = 0;
        var carte_2_valeur = 0;
        var carte_1_id = 0;
        var carte_2_id = 0;
        var paire_trouvee = false;

        // Compteur Paires & Tours
        var paires = 0;
        var tours = 0;
        var temps = 0;
        var score_page = document.getElementById('tours_joues');
        var paires_page = document.getElementById('paires_trouvees');
        var temps_page = document.getElementById('temps_ecoule');

        // Victoire
        var win = false;





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
                carte.setAttribute('onclick', 'cliqueCarte(this.id)');
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
         Execution Initialisation
\* ----------------------------------- */

    // Executions de toutes les fonctions en callback

       choixLevel(function() {
            choixJoueurs(function() {
                afficherParametres(function() {
                    genererTableau(function() {
                        genererCartes(function() {
                            chronometre();
                        });
                    });
                });
            });
        });





/* ----------------------------------- *\
                   Jeu
\* ----------------------------------- */


    // Fonction executée à chaque clique sur une carte
    function cliqueCarte(id_carte){ // 

       // Seconde carte retournée
        if(nb_cliques == 1){

            // Variables à modifier
            carte_2_valeur = array[id_carte]; // On enregistre la valeur de la carte 2
            carte_2_id = id_carte; // On enregistre l'id de la carte 2

            if(carte_2_id != carte_1_id){
                
                // On remet à zéro pour re-retourner deux nouvelles cartes
                nb_cliques = 0; 

                // On retourne la carte
                carteFVisible(carte_2_id, carte_2_valeur); // On retourne la carte

                if(carte_1_valeur == carte_2_valeur){
                     
                    // On dit qu la paire est trouvée pour qu'elle ne soit pas retourné au tour suivant
                    paire_trouvee = true;

                    // Désactive la possibilité de cliquer pour ces deux cartes (car déjà trouvées)
                    carte_1 = document.getElementById(carte_1_id);
                    carte_1.removeAttribute('onclick');
                    carte_1.setAttribute('class', 'found'); // On lui ajoute le style d'une carte trouvée

                    carte_2 = document.getElementById(carte_2_id);
                    carte_2.removeAttribute('onclick');
                    carte_2.setAttribute('class', 'found'); // On lui ajoute le style d'une carte trouvée

                    // Appel la fonction compteurPaires
                    compteurPaires();

                }
            }
        }


        // Première carte retournée
        else if(nb_cliques == 0){

            // On remet face cachée les cartes précedement retournées
            if(paire_trouvee == false){
                carteFCachee(carte_1_id, carte_2_id);
            }
            else{ // Paire trouvée au tour précedant
                paire_trouvee = false; // On réinitialise pour le nouveau tour
            }

            // On ajoute 1 Tour
            compteurTours();


            // Variables à modifier
            carte_1_valeur = array[id_carte]; // On enregistre la valeur de la carte 1
            carte_1_id = id_carte; // On enregistre l'id de la carte 1

            // On retorune la carte
            carteFVisible(carte_1_id, carte_1_valeur); // On retourne la carte

            nb_cliques++; // On incrémente le nb de clique, car on est au deuxième clique

        }  
        
    }


    // Fonction qui compte les paires trouvées et determine si le joueur a gagné
    function compteurPaires(){
        // On incrémente le nombre de paires
        paires++;

        // On met à jour l'affichage
        paires_page.innerHTML = paires;


        // On reload en fonction du nombre de paires gagnée (en fonctions de la difficulté)
        switch (level){
            case "Facile":
                if (paires == 8){  // si toutes les paires on été trouvées,
                    win = true;
                    affichageScoreboard();
                }
                break;
            case "Moyen":
                if (paires == 21){
                    win = true;
                    affichageScoreboard();
                }
                break;
            case "Difficile":
                if (paires == 56){
                    win = true;
                    affichageScoreboard();
                }
                break;
        }
    }

    function compteurTours(){
        // On incrémente le nombre de tours
        tours++;

        // On met à jour l'affichage
        score_page.innerHTML = tours;
    }

    // Fonction qui retourne une carte face visible
    function carteFVisible(id_carte, valeur_carte){

        var carte_selectionee = document.getElementById(id_carte); // On sélectionne la carte a retourner
        var carte_texte = document.createTextNode(valeur_carte); // On créer le texte comprenant la valeur de la carte
        carte_selectionee.firstChild.appendChild(carte_texte); // On ajoute le texte à la carte à retourner (variable 1)

    }

    // Fonction qui retourne une carte face cachée
    function carteFCachee(carte_1_id, carte_2_id){

        var carte_1 = document.getElementById(carte_1_id); // On sélectionne la carte a retourner
        carte_1.firstChild.innerHTML = ''; // On lui met un contenu nul

        var carte_2 = document.getElementById(carte_2_id); // On sélectionne la carte a retourner
        carte_2.firstChild.innerHTML = ''; // On lui met un contenu nul
    }


/* ----------------------------------- *\
                Resultats
\* ----------------------------------- */

    // Fonction affichant le tableau des résultats
    function affichageScoreboard(){

        // Variables
        var scoreboard_page = document.getElementById('scoreboard');
        var score = document.getElementById('score_input');
        var facteur_difficulte = 1;

        switch (level){
            case "Facile":
                facteur_difficulte = 1;
                break;
            case "Moyen":
                facteur_difficulte = 10;
                break;
            case "Difficile":
                facteur_difficulte = 100;
                break;
        }

        var resultat = Math.round(((((facteur_difficulte)/(tours))*100) - temps)*1000); // Calcul du resultat
        if(resultat < 0){ resultat = 0 }

        score.innerHTML = resultat;
        scoreboard_page.style.display = "block";

        reload_button.onclick = function(){
            reloadGame();
        }
    }





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
        // (random choisi un nombre entre 0 et 1 (non-inclu) (= random), il est multiplié par l'indice actuellement sélectionné, puis arrondi grâce à floor)
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


// Fonction chronomètre
function chronometre(){
    var i = 0;

    var timer = setInterval(function() {
        // On incrémente le compteur de secondes
        i++;

        // On rafraichi l'affichage
        temps_page.innerHTML = i;

        // On arrête le chrono en cas de victoire
        if(win == true){
            clearInterval(timer); // On arrête
            temps = i; // On enregistre le temps
        }
    }, 1000);
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
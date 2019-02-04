# Lancer le projet

1. Cloner le repo
2. Se placer dessus
3. Lancer la commande `npm install`
4. Lancer la commande `npm start`

# Description du projet Kart / React native
**Kart** est une application permettant de scanner et d'afficher une carte de visite. 

Deux types de cartes sont disponibles: une version *professionnel* et une version *social*.
Sur cette carte, différentes informations y sont décrites comme le nom, prénom, âge, statut relation, statut professionnel, hobby, adresse email, ...
Des liens vers ses réseaux sociaux sont également accessible sur le bas de la carte.
L'utilisateur peut choisir de cacher ou afficher certaines informations sur sa carte (non implémenté).

Il est possible de fermer la carte en appuyant sur le bouton *fermer* situé en dessous de la carte.

Idées d'utilisations de **Kart** :
* Soirées étudiantes
* Salons d'étudiants / d'embauches 
* Journées d'intégration scolaire / Journées portes ouvertes
* Soirées professionnelles
* ...

Ce projet traite seulement l'ouverture de la caméra, le scanne d'un QR Code et de l'affichage de la carte.


### Partie technique
* Fonctionnalités Expo utilisées :
	* BarCodeScanner : utilisation du composant React qui permet de détecter plusieurs type de code (qr, aztec, pdf417, ...) et de lire le contenu de ce dernier.
	* Permissions : utilisation de la fonction askAsync() de type Permissions.CAMERA afin de demander l'autorisation d'ouverture et d'utilisation de la caméra.
 * Une base de données JSON contenant les informations des utilisateurs classées selon l'id (contenu dans bdd.js).

### Description technique
Au lancement de l'application, l'utilisateur arrive sur une landing page. Lorsqu'il appuie sur le bouton Scanner, une popin de demande d'autorisation à utiliser la caméra est affiché, grâce à la fonction *_requestCameraPermission()*. 
Une fois acceptée, la caméra arrière est activée et prête à lire un QR Code. Lorsque l'application détecte un QR Code, cela lance une fonction *_handleQRCodeRead()* qui permet de lire les informations contenu dans le QR Code.
Si l'id contenu dans le QR Code correspond à un des id de la base de données, toutes les informations liées à cette id sont ajouté au state. Ce changement de state va, à son tour, déclencher une fonction *displayCard()* qui affiche la carte avec toutes les informations de l'utilisateur.
Lorsque l'utilisateur va appuyer sur *fermer*, le composant enfant *Card* envoie à son parent l'information qu'il doit se fermer et le composant parent *App* change respectivement le state *userInfo* et *cardIsOpen* à {} et false.


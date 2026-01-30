# Sampler_Audio_Jefferson_Storck

## Backend
Le serveur *Backend* est une version modifiée de l'API Assignement vu en cours.
Il est connecté à une base de donnée MongoDB qui conserve les Json de chaque preset, cette base est mise à jour par des opérations CRUD.
Les fichiers audio sont conservés sur le serveur lui-même.

### Run
- npm i
- npm run start

## Frontend
Le *Frontend* est une version amélioré de celui proposé précédemment via le lien suivant : [GitHub](https://github.com/JS-291/TP_Sampler_Jefferson_Storck). Il implémente toutes les fonctionnalités de l'original(waveform, playhead, ...) et ajoute les suivantes:

- Bar de progression qui suit le chargement des presets
- Possibilité d'ajouter un nouveau preset, il sera sauvegardé sur le *Backend*
- Possibilité de trimmer les sons à l'aide d'un slider, on affiche aussi la waveform du nouveau son
- Possibilité d'enregistrer un nouveau son avec un microphone. Ce son est ensuite assigné à un nouveau pad sur le preset selectioné, il n'est cependant pas sauvegardé sur le *Backend*
- Les 26 premiers pads sont liés dynamiquement à une touche du clavier dans l'ordre suivant : ***A,Z,E,R,T,Y,U,I,O,P,Q,S,D,F,G,H,J,K,L,M,W,X,C,V,B,N***
- Les touches ***ArrowLeft*** et ***ArrowRight*** permettent de passer au preset précedent/suivant
- Le sampler possède un mode **Headless** activable par l'ajout de la *querry*: ***?test=true*** dans l'url. Dans ce mode les touches du clavier restent fonctionnelles, on les utilise donc pour tester les presets et les sons sans UI

### Run
- npm i
- npm run start

## Angular
L'application *Angular* fait office de gestionnaire des presets.
Elle se base sur celle codée en cours pour les assignements.
Ci-dessous est la liste des fonctionnalités qu'elle implémente :

- Liste les presets conservés sur le serveur *Backend*
- Possibilité d'afficher les détail de chaque preset
- Possibilité de renomer un preset
- Possibilité de supprimer un preset
- Possibilité d'ajouter un nouveau preset, incluant des nouveaux fichiers audio

### Run
- npm i
- ng serve

## AI
Les AIs utilisées sont GitHub copilot,comme assistant durant la rédaction du code, ainsi que ChatGPT pour les problèmes plus complexes.

- L'implémentation de l'ajout d'un preset ainsi que sont traitement par le *Backend* a été réalisée avec l'aide de l'AI, notamment dans l'utilisation du package *Multer* et de *formData* pour gérer l'upload des fichiers audio
- 

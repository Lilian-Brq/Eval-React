# Station Atlas

## Lancement
npm install
npm run dev

## Structure
- src/dock.ts : types DTO et modèle UI (union discriminée par kind)
- src/services/dockAdapter.ts : vérification du JSON et adaptation DTO → UI
- src/services/dockService.ts : fetch avec response.ok et AbortSignal
- src/pages/ : pages de l'application
- public/api/docks.json : manifeste des quais

## Limites
Fiche quai, formulaire de demande et reducer non terminés dans le temps imparti.



![gif](https://static2.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/cd/96/JmiWVJQiB7JOv.gif)
# De la Terre à la Lune en direct : maquette et prototype

Deuxième rendu du projet d'appli web : le design de l'application et un prototype qui tourne sur une API bouchon.

Le POC branché sur les vraies API est dans un autre dépôt :

- **POC en ligne** : https://mickcouzinet.github.io/de-la-terre-a-la-lune/
- **Code du POC** : https://github.com/mickcouzinet/de-la-terre-a-la-lune

## Ce qu'il y a dans le dépôt

- `design/` : le wireframe et la maquette, en bureau et en mobile, expliqués dans [design/README.md](design/README.md)
- `api/` : l'API bouchon, faite avec [json-server](https://github.com/typicode/json-server). Toutes les fausses données sont dans `db.json`.
- `front/` : la page, en React avec Vite, comme le POC. Elle ne parle qu'à l'API bouchon.

## Séparation des services

L'API et la page sont deux programmes séparés. L'API tourne de son côté sur le port 3000, et la page l'appelle comme elle appellerait un vrai serveur.

Dans `front/src`, j'ai rangé le code par rôle :

- `services/api.js` : les appels à l'API. C'est le seul fichier qui connaît son adresse.
- `hooks/` : la partie contrôleur. Les hooks vont chercher les données, relancent la position de l'ISS toutes les 5 secondes et gèrent les erreurs.
- `components/` : la partie vue. Les composants affichent ce que les hooks leur donnent (la carte, les tableaux, la photo).

Pour brancher la page sur les vraies API, il suffirait de changer `services/api.js`.

## Routes de l'API bouchon

| Route | Ce qu'elle renvoie |
| --- | --- |
| `GET /iss` | la position de l'ISS |
| `GET /orbite` | 10 points de son orbite |
| `GET /comparaisons` | les 10 lignes du comparatif |
| `GET /apod?_sort=date&_order=desc&_limit=1` | la photo la plus récente |
| `GET /apod?date=2026-11-11` | la photo d'une date précise |
| `GET /asteroides?_sort=distanceKm&_order=asc&_limit=10` | les astéroïdes, du plus proche au plus loin |

## Lancer le prototype

Il faut Node.js 22 ou plus, et deux terminaux.

Dans le premier, l'API :

```
cd api
npm install
npm start
```

Dans le second, la page :

```
cd front
npm install
npm run dev
```

Puis ouvrir http://localhost:5173. Si on arrête l'API, chaque bloc de la page affiche un message d'erreur.

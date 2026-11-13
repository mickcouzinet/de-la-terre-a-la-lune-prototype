const API_URL = 'http://localhost:3000';

async function appelAPI(chemin) {
  let reponse;
  try {
    reponse = await fetch(API_URL + chemin);
  } catch {
    throw new Error('l\'API ne répond pas, vérifiez qu\'elle est lancée');
  }
  if (!reponse.ok) {
    throw new Error('erreur ' + reponse.status);
  }
  return reponse.json();
}

export function lirePositionISS() {
  return appelAPI('/iss');
}

export function lireOrbite() {
  return appelAPI('/orbite');
}

export function lireComparaisons() {
  return appelAPI('/comparaisons');
}

export async function lirePhoto(date) {
  const chemin = date
    ? '/apod?date=' + encodeURIComponent(date)
    : '/apod?_sort=date&_order=desc&_limit=1';
  const photos = await appelAPI(chemin);
  if (photos.length === 0) {
    return null;
  }
  return { ...photos[0], image: API_URL + photos[0].image };
}

export function lireAsteroides() {
  return appelAPI('/asteroides?_sort=distanceKm&_order=asc&_limit=10');
}

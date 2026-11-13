import { useEffect, useState } from 'react';
import { lirePhoto } from '../services/api.js';

export default function usePhoto() {
  const [photo, setPhoto] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    lirePhoto()
      .then(setPhoto)
      .catch((err) => setErreur('Photo indisponible : ' + err.message))
      .finally(() => setChargement(false));
  }, []);

  async function choisirDate(date) {
    setErreur('');
    try {
      const resultat = await lirePhoto(date);
      if (resultat) {
        setPhoto(resultat);
      } else {
        setErreur('Pas de photo à cette date dans le bouchon.');
      }
    } catch (err) {
      setErreur('Photo indisponible : ' + err.message);
    }
  }

  return { photo, chargement, erreur, choisirDate };
}

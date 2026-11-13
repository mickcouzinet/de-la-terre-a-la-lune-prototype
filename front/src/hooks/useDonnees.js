import { useEffect, useState } from 'react';

export default function useDonnees(lire, titreErreur) {
  const [donnees, setDonnees] = useState(null);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    lire()
      .then(setDonnees)
      .catch((err) => setErreur(titreErreur + ' : ' + err.message));
  }, [lire, titreErreur]);

  return { donnees, erreur };
}

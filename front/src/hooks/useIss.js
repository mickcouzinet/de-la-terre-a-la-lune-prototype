import { useEffect, useState } from 'react';
import { lireOrbite, lirePositionISS } from '../services/api.js';

export default function useIss() {
  const [iss, setIss] = useState(null);
  const [orbite, setOrbite] = useState([]);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    async function majPosition() {
      try {
        setIss(await lirePositionISS());
        setErreur('');
      } catch (err) {
        setErreur('Position indisponible : ' + err.message);
      }
    }

    majPosition();
    const minuterie = setInterval(majPosition, 5000);
    return () => clearInterval(minuterie);
  }, []);

  useEffect(() => {
    lireOrbite()
      .then(setOrbite)
      .catch(() => setOrbite([]));
  }, []);

  return { iss, orbite, erreur };
}

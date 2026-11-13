import { useState } from 'react';
import usePhoto from '../hooks/usePhoto.js';
import { dateFr } from '../utils/format.js';

export default function PhotoDuJour() {
  const { photo, chargement, erreur, choisirDate } = usePhoto();
  const [date, setDate] = useState('');

  function envoyer(e) {
    e.preventDefault();
    if (date) {
      choisirDate(date);
    }
  }

  return (
    <div>
      <h3>Photo astronomique du jour</h3>
      <form id="form-apod" onSubmit={envoyer}>
        <label htmlFor="date-apod">Autre date :</label>{' '}
        <input type="date" id="date-apod" value={date} onChange={(e) => setDate(e.target.value)} />{' '}
        <button type="submit">Afficher</button>
      </form>
      <p className="intro">Dates présentes dans le bouchon : 12/11/2026, 11/11/2026 et 25/12/2025.</p>

      <div id="apod">
        {chargement && <p>Chargement...</p>}
        {photo && (
          <>
            <img src={photo.image} alt={photo.titre} />
            <p>
              <strong>{photo.titre}</strong> ({dateFr(photo.date)})
              {photo.credit && <><br />Crédit : {photo.credit}</>}
            </p>
            <details>
              <summary>Explication</summary>
              <p>{photo.explication}</p>
            </details>
          </>
        )}
      </div>
      {erreur && <p className="erreur">{erreur}</p>}
    </div>
  );
}

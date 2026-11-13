import { useState } from 'react';
import CarteIss from './CarteIss.jsx';
import useIss from '../hooks/useIss.js';
import { duree, nombre } from '../utils/format.js';

const VITESSE_BOULET_KMH = 12000 * 0.9144 * 3.6;
const DISTANCE_LUNE_KM = 384400;

export default function Iss() {
  const { iss, orbite, erreur } = useIss();
  const [suivre, setSuivre] = useState(false);

  return (
    <section id="iss">
      <h2>La Station spatiale internationale en ce moment</h2>
      <p className="intro">Position relue toutes les 5 secondes.</p>

      <div className="iss-contenu">
        <div>
          <CarteIss iss={iss} orbite={orbite} suivre={suivre} />
          <button onClick={() => setSuivre(!suivre)}>
            {suivre ? 'Arrêter de suivre' : 'Suivre la station'}
          </button>
        </div>

        <div className="iss-infos">
          <table>
            <tbody>
              <tr><th>Vitesse</th><td>{iss ? nombre(iss.vitesse) + ' km/h' : '-'}</td></tr>
              <tr><th>Altitude</th><td>{iss ? nombre(iss.altitude) + ' km' : '-'}</td></tr>
              <tr><th>Latitude</th><td>{iss ? nombre(iss.latitude, 2) + '°' : '-'}</td></tr>
              <tr><th>Longitude</th><td>{iss ? nombre(iss.longitude, 2) + '°' : '-'}</td></tr>
              <tr>
                <th>Lumière</th>
                <td>{iss ? (iss.auSoleil ? 'au soleil' : 'dans l\'ombre de la Terre') : '-'}</td>
              </tr>
              <tr>
                <th>Relevé à</th>
                <td>{iss ? new Date(iss.releve).toLocaleTimeString('fr-FR') : '-'}</td>
              </tr>
            </tbody>
          </table>

          <p className="verne">
            Dans le roman, le boulet quitte le canon à <strong>{nombre(VITESSE_BOULET_KMH)}</strong> km/h,
            soit <strong>{iss ? nombre(VITESSE_BOULET_KMH / iss.vitesse, 1) : '-'}</strong> fois la vitesse de l'ISS.
            À la vitesse de l'ISS, il faudrait <strong>{iss ? duree(DISTANCE_LUNE_KM / iss.vitesse) : '-'}</strong> pour
            aller jusqu'à la Lune.
          </p>
          {erreur && <p className="erreur">{erreur}</p>}
        </div>
      </div>
    </section>
  );
}

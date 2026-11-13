import useDonnees from '../hooks/useDonnees.js';
import { lireAsteroides } from '../services/api.js';
import { nombre } from '../utils/format.js';

export default function Asteroides() {
  const { donnees: asteroides, erreur } = useDonnees(lireAsteroides, 'Astéroïdes indisponibles');

  return (
    <div>
      <h3>Astéroïdes qui passent près de la Terre aujourd'hui</h3>
      <p className="intro">
        Les 10 plus proches. Distance exprimée en distances Terre-Lune (1 = aussi loin que la Lune).
      </p>

      <div className="tableau-scroll">
        <table className="tableau">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Taille</th>
              <th>Vitesse</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {asteroides && asteroides.length === 0 && (
              <tr><td colSpan="4">Aucun astéroïde répertorié aujourd'hui.</td></tr>
            )}
            {asteroides && asteroides.map((a) => (
              <tr key={a.id}>
                <td>
                  {a.nom}
                  {a.dangereux && <><br /><span className="danger">potentiellement dangereux</span></>}
                </td>
                <td>{nombre(a.diametreMin)} à {nombre(a.diametreMax)} m</td>
                <td>{nombre(a.vitesse)} km/h</td>
                <td>
                  {nombre(a.distanceLune, 2)}
                  <br />
                  <small>{nombre(a.distanceKm)} km</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {erreur && <p className="erreur">{erreur}</p>}
    </div>
  );
}

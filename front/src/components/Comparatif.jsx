import useDonnees from '../hooks/useDonnees.js';
import { lireComparaisons } from '../services/api.js';

const VERDICTS = {
  'vu-juste': 'Vu juste',
  'presque': 'Presque',
  'rate': 'Raté',
  'clin-doeil': 'Clin d\'œil',
};

export default function Comparatif() {
  const { donnees: comparaisons, erreur } = useDonnees(lireComparaisons, 'Comparatif indisponible');

  return (
    <section id="comparatif">
      <h2>Le roman face à la réalité</h2>
      <p className="intro">Ce que Jules Verne avait imaginé, comparé aux vraies missions vers la Lune.</p>

      <div className="tableau-scroll">
        <table className="tableau">
          <thead>
            <tr>
              <th>Sujet</th>
              <th>Dans le roman</th>
              <th>Dans la réalité</th>
              <th>Verdict</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {comparaisons && comparaisons.map((c) => (
              <tr key={c.id}>
                <th>{c.sujet}</th>
                <td>{c.roman}</td>
                <td>{c.realite}</td>
                <td className={c.verdict}>{VERDICTS[c.verdict]}</td>
                <td><a href={c.source} target="_blank" rel="noreferrer">lien</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {erreur && <p className="erreur">{erreur}</p>}
    </section>
  );
}

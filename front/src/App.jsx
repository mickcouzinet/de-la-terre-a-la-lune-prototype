import Iss from './components/Iss.jsx';
import Comparatif from './components/Comparatif.jsx';
import PhotoDuJour from './components/PhotoDuJour.jsx';
import Asteroides from './components/Asteroides.jsx';

export default function App() {
  return (
    <>
      <header>
        <h1>De la Terre à la Lune en direct</h1>
        <p>Le roman de Jules Verne (1865) comparé aux données de la NASA et à la position de la Station spatiale internationale.</p>
      </header>

      <main>
        <p className="bandeau">
          Prototype : toutes les données viennent de l'API bouchon (dossier <code>api</code>). Elles sont fictives ou figées.
        </p>

        <Iss />
        <Comparatif />

        <section id="nasa">
          <h2>Les données NASA du jour</h2>
          <div className="nasa-contenu">
            <PhotoDuJour />
            <Asteroides />
          </div>
        </section>
      </main>

      <footer>
        <p>
          Prototype avec API bouchon. La version branchée sur les vraies API est en ligne :{' '}
          <a href="https://mickcouzinet.github.io/de-la-terre-a-la-lune/">mickcouzinet.github.io/de-la-terre-a-la-lune</a>.
        </p>
        <p><a href="https://github.com/mickcouzinet/de-la-terre-a-la-lune-prototype">Code source sur GitHub</a></p>
      </footer>
    </>
  );
}

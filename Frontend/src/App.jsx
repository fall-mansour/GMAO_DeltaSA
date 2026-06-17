import HomeChauffeur from "./Pages/Accueilchauffeur";
import Declaration from "./Pages/Declaration";
import "./App.css";

function App() {
  return (
    <>
      {/* On affiche directement le formulaire de déclaration au démarrage */}
      <HomeChauffeur />
      <Declaration />
    </>
  );
}

export default App;

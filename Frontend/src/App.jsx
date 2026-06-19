import "./App.css";
import HomeChauffeur from "./Pages/Accueilchauffeur";
import ValidationListe from "./Pages/validation";
import HistoriqueBackoffice from "./Pages/HistoriqueBackoff";
import SuiviChauffeur from "./Pages/Suivichauffeur";
import SuiviReparation from "./Pages/Suivireparation";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Declaration from "./Pages/Declaration";
import HomeMecano from "./Pages/Accueilmecano";
import AffectationsMecano from "./Pages/AffectationMecano";
import AccueilBackOffice from "./Pages/AccueilBackOffice";
import Rapports from "./Pages/Rapports";
import MaintenanceHome from "./Pages/MaintenanceHome";
import InterventionsPage from "./Pages/InterventionsPage";
import DeclarationsPage from "./Pages/DeclarationsPage";
import DashboardPage from "./Pages/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ── 2. DÉFINITION DE LA PAGE PAR DÉFAUT ── */}
        <Route path="/" element={<Navigate to="/validation" replace />} />
        {/* ── 3. DÉCLARATION DES ROUTES DE NAVIGATION ── */}
        /* Route pour l'Espace Chauffeur */
        <Route path="/Accueilchauffeur" element={<HomeChauffeur />} />
        <Route path="/Declaration" element={<Declaration />} />
        <Route path="/SuiviChauffeur" element={<SuiviChauffeur />} />
        /* Route Backoffice */
        <Route path="/validation" element={<ValidationListe />} />
        <Route path="/HistoBackoff" element={<HistoriqueBackoffice />} />
        <Route path="/Declaration" element={<Declaration />} />
        <Route path="/Accueilbackoff" element={<AccueilBackOffice />} />
        <Route path="/Rapport" element={<Rapports />} />
        /*Route page de connexion */
        <Route path="/login" element={<Login />} />
        /*Route mecano */
        <Route path="/Accueilmeca" element={<HomeMecano />} />
        <Route path="/Affectationsmeca" element={<AffectationsMecano />} />
        <Route path="/Etatreparation" element={<SuiviReparation />} />
        /*Routes maintenance*/
        <Route path="/Homemaintenance" element={<MaintenanceHome />} />
        <Route path="/Interventions" element={<InterventionsPage />} />
        <Route path="/Declarations" element={<DeclarationsPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;

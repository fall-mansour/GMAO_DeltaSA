import "./App.css";
import HomeChauffeur from "./Pages/Accueilchauffeur";
import HistoriqueBackoffice from "./Pages/HistoriqueBackoff";
import SuiviChauffeur from "./Pages/Suivichauffeur";
import SuiviReparation from "./Pages/Suivireparation";
import Login from "./Pages/Login";
import MaintenanceHome from "./Pages/MaintenanceHome";
import DashboardPage from "./Pages/DashboardPage";
import DeclarationsPage from "./Pages/DeclarationsPage";
import InterventionsPage from "./Pages/InterventionsPage";

import GestionCamions from "./Pages/GestionCamions";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Declaration from "./Pages/Declaration";
import HomeMecano from "./Pages/Accueilmecano";
import AffectationsMecano from "./Pages/AffectationMecano";
import AccueilBackOffice from "./Pages/AccueilBackOffice";
import Rapports from "./Pages/Rapports";
import AccueilAdmin from "./Pages/AccueilAdmin";
import GestionUtilisateurs from "./Pages/GestionUtilisateurs";

function HomeWrapper() {
  const navigate = useNavigate();
  return (
    <MaintenanceHome
      onOpenDashboard={() => navigate("/dashboard")}
      onOpenDeclarations={() => navigate("/declarations")}
      onOpenInterventions={() => navigate("/interventions")}
      onLogout={() => navigate("/login")}
    />
  );
}

function DashboardWrapper() {
  const navigate = useNavigate();
  return <DashboardPage onBack={() => navigate("/")} />;
}

function DeclarationsWrapper() {
  const navigate = useNavigate();
  return <DeclarationsPage onBack={() => navigate("/")} />;
}

function InterventionsWrapper() {
  const navigate = useNavigate();
  return <InterventionsPage onBack={() => navigate("/")} />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Espace Chauffeur */}
        <Route path="/Accueilchauffeur" element={<HomeChauffeur />} />
        <Route path="/Declaration" element={<Declaration />} />
        <Route path="/SuiviChauffeur" element={<SuiviChauffeur />} />
        {/* Espace Back Office */}
        <Route path="/HistoBackoff" element={<HistoriqueBackoffice />} />
        <Route path="/Accueilbackoff" element={<AccueilBackOffice />} />
        <Route path="/Rapport" element={<Rapports />} />
        {/* Connexion */}
        <Route path="/login" element={<Login />} />
        {/* Espace Mécanicien */}
        <Route path="/Accueilmeca" element={<HomeMecano />} />
        <Route path="/Affectationsmeca" element={<AffectationsMecano />} />
        <Route path="/Etatreparation" element={<SuiviReparation />} />
        {/* Espace Responsable Maintenance */}
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/declarations" element={<DeclarationsWrapper />} />
        <Route path="/interventions" element={<InterventionsWrapper />} />
        /*Routes Admin gestion users*/
        <Route path="/camions" element={<GestionCamions />} />
        <Route path="/AccueilAdmin" element={<AccueilAdmin />} />
        <Route path="/Gestionutilisateur" element={<GestionUtilisateurs />} />
      </Routes>
    </Router>
  );
}

export default App;

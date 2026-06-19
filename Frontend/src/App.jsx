import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import MaintenanceHome from "./Pages/MaintenanceHome";
import DashboardPage from "./Pages/DashboardPage";
import DeclarationsPage from "./Pages/DeclarationsPage";
import InterventionsPage from "./Pages/InterventionsPage";
import  "./App.css";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/declarations" element={<DeclarationsWrapper />} />
        <Route path="/interventions" element={<InterventionsWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}


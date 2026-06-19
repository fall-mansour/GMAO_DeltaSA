// Frontend/src/pages/AccueilBackOffice.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Accueilbackoff.css"; // Importation de ton fichier de styles externes

const actions = [
  {
    icon: "✅",
    title: "Valider les déclarations",
    description:
      "Consultez les demandes soumises par les chauffeurs et valisez les interventions.",
    buttonLabel: "VOIR LES DEMANDES",
    filled: true,
  },
  {
    icon: "📋",
    title: "Historique des pannes",
    description:
      "Accédez à l'historique complet des pannes : traitées, en cours, avec dates et actions menées.",
    buttonLabel: "VOIR LE LISTING",
    filled: false,
  },
  {
    icon: "📄",
    title: "Rapports",
    description:
      "Consultez et téléchargez les rapports générés après validation des interventions.",
    buttonLabel: "VOIR LES RAPPORTS",
    filled: false,
  },
];

export default function AccueilBackOffice() {
  const [activeNav, setActiveNav] = useState("Accueil");
  const navigate = useNavigate();
  const navItems = ["Accueil", "Historiques", "Validation", "Rapports"];

  const handleNav = (item) => {
    setActiveNav(item);
    if (item === "Accueil") navigate("/Accueilbackoff");
    if (item === "Rapports") navigate("/Rapport");
    if (item === "Validation") navigate("/validation");
    if (item === "Historiques") navigate("/HistoBackoff");
  };

  return (
    <div className="backoffice-page">
      {/* NAVBAR */}
      <nav className="bo-navbar">
        <img src="/logo.jpeg" alt="Delta SA" className="bo-logo" />
        <div className="bo-nav-links">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNav(item)}
              className={`bo-nav-link ${activeNav === item ? "active" : ""}`}
            >
              {item}
              {activeNav === item && <span className="bo-nav-underline" />}
            </button>
          ))}
        </div>
        <div className="bo-avatar-wrapper">
          <div className="bo-avatar">BO</div>
          <button
            className="bo-btn-deconnexion"
            onClick={() => navigate("/login")}
          >
            {" "}
            Déconnexion
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="bo-hero">
        <h1 className="bo-hero-title">Bonjour, BackOffice !</h1>
        <p className="bo-hero-subtitle">
          Espace Back-Office · Gérez, validez et suivez toutes les opérations de
          maintenance.
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="bo-action-grid">
        {/* CARTE 1 */}
        <div className="bo-action-card">
          <span className="bo-action-icon">{actions[0].icon}</span>
          <h2 className="bo-action-title">{actions[0].title}</h2>
          <p className="bo-action-desc">{actions[0].description}</p>
          <button
            className="bo-btn-filled"
            className="bo-btn-outline"
            onClick={() => navigate("/validation")}
          >
            {actions[0].buttonLabel}
          </button>
        </div>

        {/* CARTE 2 */}
        <div className="bo-action-card">
          <span className="bo-action-icon">{actions[1].icon}</span>
          <h2 className="bo-action-title">{actions[1].title}</h2>
          <p className="bo-action-desc">{actions[1].description}</p>
          <button
            className="bo-btn-outline"
            className="bo-btn-outline"
            onClick={() => navigate("/Histobackoff")}
          >
            {actions[1].buttonLabel}
          </button>
        </div>

        {/* CARTE 3 : CENTRÉE */}
        <div className="bo-action-card bo-card-centered">
          <span className="bo-action-icon">{actions[2].icon}</span>
          <h2 className="bo-action-title">{actions[2].title}</h2>
          <p className="bo-action-desc">{actions[2].description}</p>
          <button
            className="bo-btn-outline"
            onClick={() => navigate("/Rapport")}
          >
            {actions[2].buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// Frontend/src/pages/AdminHome.jsx

import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../style/MaintenanceHome.css"; // Réutilisation du même fichier CSS pour garder le même style cohérent

// Données d'exemple pour que l'interface de l'admin ne soit pas vide avant le branchement API
const EXEMPLE_STATS_ADMIN = {
  totalUtilisateurs: 38,
  totalVehicules: 24,
  derniersAjouts: [
    {
      id: 1,
      nom: "Diop",
      prenom: "Amadou",
      role: "Chauffeur",
      date: "22/06/2026",
    },
    {
      id: 2,
      nom: "Kamara",
      prenom: "Awa",
      role: "Mécanicien",
      date: "21/06/2026",
    },
    {
      id: 3,
      nom: "Sall",
      prenom: "Ousmane",
      role: "Responsable Maintenance",
      date: "19/06/2026",
    },
  ],
};

export default function AdminHome({ userInitials = "AD", stats = null }) {
  const navigate = useNavigate();
  const s = stats || EXEMPLE_STATS_ADMIN;

  // --- Fonctions de redirection avec useNavigate ---
  const handleGoToAddUser = () => {
    navigate("/AjoutUser"); // <-- Ton chemin vers la page d'ajout d'utilisateur
  };

  const handleGoToEditUser = () => {
    navigate("/admin/AjoutVehicules"); // <-- Ton chemin vers la page de modification/liste
  };

  const handleGoToAddVehicle = () => {
    navigate("/Ajoutvehicule"); // <-- Ton chemin vers la page d'ajout de véhicule
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mh-page">
      {/* ---------- HEADER DE L'ADMINISTRATEUR ---------- */}
      <header className="mh-topbar">
        <div className="mh-brand">
          <img src={logo} alt="Delta SA" className="brand-logo" />
          <span className="brand-divider" />
          <span className="brand-suffix">GMAO — ADMIN</span>
        </div>

        {/* Les 3 liens de redirection demandés */}
        <nav className="mh-nav">
          <button className="mh-nav-link" onClick={handleGoToAddUser}>
            Ajouter Utilisateur
          </button>
          <button className="mh-nav-link" onClick={handleGoToEditUser}>
            Modifier Utilisateur
          </button>
          <button className="mh-nav-link" onClick={handleGoToAddVehicle}>
            Ajouter Véhicule
          </button>
        </nav>

        <div className="mh-user">
          <div className="mh-user-info">
            <div className="mh-avatar">{userInitials}</div>
          </div>
          <div className="mh-divider-vert" />
          <button className="mh-logout" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      {/* ---------- CONTENU PRINCIPAL ---------- */}
      <main className="mh-content">
        <div className="mh-heading-row">
          <p className="mh-eyebrow">Espace Administration Générale</p>
          <h1 className="mh-title">Gestion du personnel & de la flotte</h1>
        </div>

        {/* Section Vue d'ensemble (Même style que le tableau de bord de maintenance) */}
        <section className="mh-section">
          <div className="mh-section-label">
            <span className="mh-section-num">1</span>
            <span className="mh-section-text">Vue d'ensemble</span>
          </div>

          <div className="mh-stats-panel">
            <div className="mh-stats">
              <div className="mh-stat">
                <span className="mh-stat-label">Total Utilisateurs</span>
                <span className="mh-stat-value">{s.totalUtilisateurs}</span>
              </div>
              <div className="mh-stat">
                <span className="mh-stat-label">Véhicules enregistrés</span>
                <span className="mh-stat-value">{s.totalVehicules}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Récents (Même style que les listes de déclarations/interventions) */}
        <section className="mh-section">
          <div className="mh-section-label">
            <span className="mh-section-num">2</span>
            <span className="mh-section-text">
              Dernières actions du système
            </span>
          </div>

          <div className="mh-secondary">
            <div className="mh-secondary-head">
              <h2 className="mh-secondary-title">
                Comptes utilisateurs récemment créés
              </h2>
            </div>

            <ul className="mh-list">
              {s.derniersAjouts.map((u) => (
                <li className="mh-list-row" key={u.id}>
                  <span className="mh-list-truck" style={{ width: "200px" }}>
                    {u.prenom} {u.nom}
                  </span>
                  <span className="mh-list-mecano" style={{ color: "#666" }}>
                    Rôle : <strong>{u.role}</strong>
                  </span>
                  <span
                    className="mh-pill mh-pill-terminee"
                    style={{ background: "#f0f4f8", color: "#333" }}
                  >
                    Créé le {u.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

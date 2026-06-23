// Frontend/src/pages/AccueilAdmin.jsx
import { useNavigate } from "react-router-dom";
import "../style/Admin.css";
import logo from "../assets/logo.png";

const EXEMPLE_STATS = {
  nbUtilisateurs: 18,
  nbCamions: 24,
  nbChauffeurs: 10,
  nbCamionsDispo: 16,
};

export default function AccueilAdmin({
  userInitials = "AD",
  stats = null,
  onOpenUtilisateurs = null, // On passe à null par défaut
  onOpenCamions = null, // On passe à null par défaut
}) {
  const navigate = useNavigate(); // Initialisé ici, maintenant disponible partout en dessous !
  const s = stats || EXEMPLE_STATS;

  // Définition des fonctions locales de secours si aucune prop n'est fournie par le parent
  const handleOpenUtilisateurs = () => {
    if (onOpenUtilisateurs) {
      onOpenUtilisateurs();
    } else {
      navigate("/Gestionutilisateur"); // Redirection par défaut (attention aux majuscules/minuscules de tes routes)
    }
  };

  const handleOpenCamions = () => {
    if (onOpenCamions) {
      onOpenCamions();
    } else {
      navigate("/camions"); // Redirection par défaut
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="admin-page"
      style={{ minHeight: "100vh", overflowY: "auto" }}
    >
      <header className="admin-topbar">
        <div
          className="mh-brand"
          onClick={() => navigate("/admin")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Delta SA" className="brand-logo" />
          <span className="brand-divider" />
          <span className="admin-brand-suffix">GMAO</span>
        </div>

        <nav className="admin-nav">
          <span
            className="admin-nav-link is-active"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin")}
          >
            Tableau de bord
          </span>
          <span
            className="admin-nav-link"
            onClick={
              handleOpenUtilisateurs
            } /* Utilisation de la fonction locale sécurisée */
            style={{ cursor: "pointer" }}
          >
            Utilisateurs
          </span>
          <span
            className="admin-nav-link"
            onClick={
              handleOpenCamions
            } /* Utilisation de la fonction locale sécurisée */
            style={{ cursor: "pointer" }}
          >
            Camions
          </span>
        </nav>

        <div className="admin-user">
          <div className="admin-user-info">
            <div className="admin-avatar">{userInitials}</div>
          </div>
          <div className="admin-divider-vert" />
          <button
            className="admin-logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="admin-content">
        <p className="admin-eyebrow">Espace administrateur</p>
        <h1 className="admin-title">Tableau de bord</h1>

        {/* CHIFFRES CLÉS */}
        <section className="admin-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-label">Utilisateurs</span>
            <span className="admin-stat-value">{s.nbUtilisateurs}</span>
            <span className="admin-stat-sub">Comptes enregistrés</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Camions</span>
            <span className="admin-stat-value">{s.nbCamions}</span>
            <span className="admin-stat-sub">Flotte enregistrée</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Chauffeurs</span>
            <span className="admin-stat-value">{s.nbChauffeurs}</span>
            <span className="admin-stat-sub">Rattachés à des camions</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Camions disponibles</span>
            <span className="admin-stat-value">{s.nbCamionsDispo}</span>
            <span className="admin-stat-sub">Sur {s.nbCamions} au total</span>
          </div>
        </section>

        {/* MODULES */}
        <section className="admin-modules">
          {/* Clic sur la carte entière pour une meilleure UX */}
          <div
            className="admin-module-card"
            onClick={handleOpenUtilisateurs}
            style={{ cursor: "pointer" }}
          >
            <div className="admin-module-icon">👤</div>
            <h2 className="admin-module-title">Gestion des utilisateurs</h2>
            <p className="admin-module-sub">
              Créer, modifier et supprimer les comptes de tous les acteurs du
              système : chauffeurs, mécaniciens, back office et responsable de
              maintenance.
            </p>
            <button className="admin-module-btn">Gérer les utilisateurs</button>
          </div>

          <div
            className="admin-module-card"
            onClick={handleOpenCamions}
            style={{ cursor: "pointer" }}
          >
            <div className="admin-module-icon">🚛</div>
            <h2 className="admin-module-title">Gestion des camions</h2>
            <p className="admin-module-sub">
              Enregistrer et gérer la flotte de camions, rattacher jusqu'à 2
              chauffeurs par camion, et suivre l'état de chaque véhicule.
            </p>
            <button className="admin-module-btn">Gérer les camions</button>
          </div>
        </section>
      </main>
    </div>
  );
}

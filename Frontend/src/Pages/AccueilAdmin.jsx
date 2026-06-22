import React from "react";
import "../style/Admin.css";
import logo from "../assets/logo.png";

/**
 * Page d'accueil - Administrateur
 * Application GMAO - Delta SA
 *
 * Affiche les chiffres clés et les 2 modules de gestion :
 * - Gestion des utilisateurs
 * - Gestion des camions (avec rattachement chauffeurs)
 */

const EXEMPLE_STATS = {
  nbUtilisateurs: 18,
  nbCamions: 24,
  nbChauffeurs: 10,
  nbCamionsDispo: 16,
};

export default function AccueilAdmin({
  userName = "Administrateur",
  userInitials = "AD",
  stats = null,
  onOpenUtilisateurs = () => {},
  onOpenCamions = () => {},
  onLogout = () => {},
}) {
  const s = stats || EXEMPLE_STATS;

  return (
    <div className="admin-page">
      <header className="admin-topbar">
        <div className="mh-brand">
          <img src={logo} alt="Delta SA" className="brand-logo" />
          <span className="brand-divider" />
          <span className="admin-brand-suffix">GMAO</span>
        </div>

        <nav className="admin-nav">
          <a className="admin-nav-link is-active" href="#modules">
            Tableau de bord
          </a>
          <a
            className="admin-nav-link"
            onClick={onOpenUtilisateurs}
            href="#utilisateurs"
          >
            Utilisateurs
          </a>
          <a className="admin-nav-link" onClick={onOpenCamions} href="#camions">
            Camions
          </a>
        </nav>

        <div className="admin-user">
          <div className="admin-user-info">
            <div className="admin-avatar">{userInitials}</div>
          </div>
          <div className="admin-divider-vert" />
          <button className="admin-logout" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <main className="admin-content">
        <p className="admin-eyebrow">Espace administrateur</p>
        <h1 className="admin-title">Tableau de bord</h1>

        {/* CHIFFRES CLES */}
        <section className="admin-stats" id="utilisateurs">
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
        <section className="admin-modules" id="modules">
          <div className="admin-module-card">
            <div className="admin-module-icon">👤</div>
            <h2 className="admin-module-title">Gestion des utilisateurs</h2>
            <p className="admin-module-sub">
              Créer, modifier et supprimer les comptes de tous les acteurs du
              système : chauffeurs, mécaniciens, back office et responsable de
              maintenance.
            </p>
            <button className="admin-module-btn" onClick={onOpenUtilisateurs}>
              Gérer les utilisateurs
            </button>
          </div>

          <div className="admin-module-card">
            <div className="admin-module-icon">🚛</div>
            <h2 className="admin-module-title">Gestion des camions</h2>
            <p className="admin-module-sub">
              Enregistrer et gérer la flotte de camions, rattacher jusqu'à 2
              chauffeurs par camion, et suivre l'état de chaque véhicule.
            </p>
            <button className="admin-module-btn" onClick={onOpenCamions}>
              Gérer les camions
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

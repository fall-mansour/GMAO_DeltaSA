import { useState } from "react";
import "../style/Accueilchauffeur.css";

const HomeChauffeur = () => {
  // Données fictives de l'utilisateur (à remplacer plus tard par les données du Backend/Context)
  const [user] = useState({
    prenom: "Abdoulaye",
    nom: "Diouf",
    role: "Chauffeur",
  });

  return (
    <div className="dashboard-chauffeur">
      {/* ── HEADER / BARRE DE NAVIGATION ── */}
      <header className="main-header">
        <div className="logo-section">
          <img src="/src/assets/logo.png" alt="Logo" className="header-logo" />
        </div>

        <nav className="nav-links">
          <a href="/Declaration" className="nav-item active">
            Déclaration
          </a>
          <a href="/SuiviChauffeur" className="nav-item">
            Suivi des dossiers
          </a>
        </nav>

        <div className="user-profile">
          <div className="user-avatar">
            {user.prenom.charAt(0)}
            {user.nom.charAt(0)}
          </div>
          <span className="user-name">
            {user.prenom} {user.nom}
          </span>
        </div>
      </header>

      {/* ── CORPS DE LA PAGE (BODY) ── */}
      <main className="dashboard-body">
        <div className="welcome-section">
          <h1>Bonjour, {user.prenom} !</h1>
          <p>
            Bienvenue sur votre espace chauffeur. Que souhaitez-vous faire
            aujourd'hui ?
          </p>
        </div>

        {/* Grille des cartes d'information et d'action */}
        <div className="actions-grid">
          {/* Carte 1 : Déclarer une panne */}
          <div className="action-card primary">
            <div className="card-icon">⚠️</div>
            <h2>Déclarer une panne</h2>
            <p>
              Un problème technique sur votre véhicule (hydrocureur, benne...) ?
              <strong> Déclarez votre panne ici</strong> pour informer
              instantanément l'équipe de maintenance.
            </p>
            <button className="card-btn">Accéder au formulaire</button>
          </div>

          {/* Carte 2 : Suivi du dossier */}
          <div className="action-card secondary">
            <div className="card-icon">📋</div>
            <h2>Suivi de vos dossiers</h2>
            <p>
              Consultez en temps réel l'état d'avancement de vos demandes :
              savoir si votre dossier est{" "}
              <span className="badge-info waiting">En attente</span>,
              <span className="badge-info validated">Validé</span>.
            </p>
            <button className="card-btn outline">Voir mes demandes</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeChauffeur;

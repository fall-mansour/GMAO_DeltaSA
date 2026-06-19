// Frontend/src/pages/AccueilMecano.jsx
import { useNavigate, Link } from "react-router-dom";
import "../style/Accueilchauffeur.css";

const HomeMecano = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-chauffeur">
      {/* ── HEADER DELTA SA IDENTIQUE ── */}
      <header className="main-header">
        <img
          src="/src/assets/logo.png"
          alt="DELTA SA"
          className="header-logo"
        />

        {/* Onglets du Header adaptés pour le Mécanicien */}
        <nav className="nav-links">
          <Link to="/affectationsmeca" className="nav-item">
            Affectations
          </Link>
          <Link to="/Etatreparation" className="nav-item">
            Suivi Atelier
          </Link>
        </nav>

        {/* Profil à droite */}
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <span className="user-name">Abdoulaye Diouf</span>
        </div>
      </header>

      {/* ── CORPS DU TABLEAU DE BORD ── */}
      <div className="dashboard-body">
        {/* Message de bienvenue imposant (Police Syne) */}
        <section className="welcome-section" style={{ textAlign: "center" }}>
          <h1>Bonjour, Abdoulaye !</h1>
          <p>
            Bienvenue sur votre espace mécanicien. Que souhaitez-vous faire
            aujourd'hui ?
          </p>
        </section>

        {/* ── GRILLE DES CARTES D'ACTION CONTRASTÉES ── */}
        <div className="actions-grid">
          {/* CARTE UNIQUE 1 : AFFECTATIONS (Bouton Bleu Plein) */}
          <div className="action-card primary">
            <div className="card-icon">📋</div>
            <h2>Onglet Affectations</h2>
            <p>
              Dans cette page, vous trouverez toutes les taches qui vous sont
              affectées.
            </p>
            <button
              className="card-btn"
              onClick={() => navigate("/Affectationsmeca")}
            >
              Accéder à vos Affectations
            </button>
          </div>

          {/* CARTE UNIQUE 2 : ÉTAT DE LA RÉPARATION (Bouton Outline Bleu) */}
          <div className="action-card">
            <div className="card-icon">⚙️</div>
            <h2>Mettre à jour l'etat de la reparation</h2>
            <p>
              Mettez à jour l'etat d'avancement de la Reparation pour en informé
              le proprietaire.
              <span
                className="badge-info waiting"
                style={{ backgroundColor: "#ffeeb2", color: "#856404" }}
              >
                En attente
              </span>
              ou
              <span
                className="badge-info validated"
                style={{ backgroundColor: "#d4edda", color: "#155724" }}
              >
                Terminé
              </span>
              .
            </p>
            <button
              className="card-btn outline"
              onClick={() => navigate("/Etatreparation")}
            >
              Etat d'avancement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMecano;

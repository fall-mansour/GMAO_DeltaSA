// Frontend/src/pages/InterventionsPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importation pour corriger le bouton Retour
import logo from "../assets/logo.png";
import "../style/InterventionsPage.css";

const EXEMPLE_INTERVENTIONS = [
  {
    id: 1,
    camion: "CAM-087",
    mecanicien: "Mamadou Ndiaye",
    statut: "cours",
    statutLabel: "En cours",
    dateAffectation: "12/06/2026",
    dateDebut: "12/06/2026",
    dateFin: null,
    cout: 45000,
    detailsReparation: null,
  },
  {
    id: 2,
    camion: "CAM-154",
    mecanicien: "Fatou Diop",
    statut: "attente",
    statutLabel: "En attente de pièces",
    dateAffectation: "14/06/2026",
    dateDebut: null,
    dateFin: null,
    cout: 60000,
    detailsReparation: null,
  },
  {
    id: 3,
    camion: "CAM-221",
    mecanicien: "Ibrahima Sow",
    statut: "terminee",
    statutLabel: "Terminée",
    dateAffectation: "08/06/2026",
    dateDebut: "08/06/2026",
    dateFin: "10/06/2026",
    cout: 38500,
    detailsReparation:
      "Remplacement du flexible hydraulique de la pompe HP et purge du circuit.",
  },
];

const FILTRES = [
  { key: "toutes", label: "Toutes" },
  { key: "attente", label: "En attente" },
  { key: "cours", label: "En cours" },
  { key: "terminee", label: "Terminées" },
];

function formatCout(cout) {
  if (cout === null || cout === undefined || cout === "") return null;
  return `${Number(cout).toLocaleString("fr-FR")} FCFA`;
}

export default function InterventionsPage({ interventions = null }) {
  const navigate = useNavigate(); // Utilisation du hook de navigation natif
  const [filtre, setFiltre] = useState("toutes");

  const displayInterventions = interventions || EXEMPLE_INTERVENTIONS;

  const filtered =
    filtre === "toutes"
      ? displayInterventions
      : displayInterventions.filter((i) => i.statut === filtre);

  // Gestion du retour propre à l'historique du navigateur
  const handleBack = () => {
    navigate(-1); // Retourne automatiquement à la page précédente (ex: l'accueil maintenance)
  };

  return (
    // AJOUT : Déblocage direct du scroll vertical avec style en ligne de secours
    <div className="ip-page" style={{ minHeight: "100vh", overflowY: "auto" }}>
      <header className="ip-topbar">
        <div
          className="mh-brand"
          onClick={() => navigate("/maintenance")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Delta SA" className="brand-logo" />
          <span className="brand-divider" />
          <span className="ip-brand-suffix">GMAO</span>
        </div>

        {/* Correction du bouton avec la navigation réactive */}
        <button
          className="ip-back"
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        >
          ← Retour à l'accueil
        </button>
      </header>

      <main className="ip-content">
        <div className="ip-heading-row">
          <div>
            <p className="ip-eyebrow">Espace responsable de maintenance</p>
            <h1 className="ip-title">Suivi des interventions</h1>
          </div>
          <span className="ip-count-badge">
            {filtered.length} intervention{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="ip-filters">
          {FILTRES.map((f) => (
            <button
              key={f.key}
              className={`ip-filter-btn${filtre === f.key ? " is-active" : ""}`}
              onClick={() => setFiltre(f.key)}
              style={{ cursor: "pointer" }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="ip-list">
            {filtered.map((i) => (
              <div className="ip-card" key={i.id}>
                <div className="ip-card-head">
                  <div className="ip-card-id">
                    <span className="ip-card-truck">{i.camion}</span>
                    <span className="ip-card-num">Intervention #{i.id}</span>
                  </div>
                  <span className={`ip-pill ip-pill-${i.statut}`}>
                    {i.statutLabel}
                  </span>
                </div>

                <div className="ip-grid">
                  <div className="ip-attr">
                    <span className="ip-attr-label">Mécanicien</span>
                    <span className="ip-attr-value">{i.mecanicien}</span>
                  </div>

                  <div className="ip-attr">
                    <span className="ip-attr-label">Date d'affectation</span>
                    <span className="ip-attr-value">{i.dateAffectation}</span>
                  </div>

                  <div className="ip-attr">
                    <span className="ip-attr-label">Date de début</span>
                    <span
                      className={`ip-attr-value${!i.dateDebut ? " is-muted" : ""}`}
                    >
                      {i.dateDebut || "Non démarrée"}
                    </span>
                  </div>

                  <div className="ip-attr">
                    <span className="ip-attr-label">Date de fin</span>
                    <span
                      className={`ip-attr-value${!i.dateFin ? " is-muted" : ""}`}
                    >
                      {i.dateFin || "—"}
                    </span>
                  </div>

                  <div className="ip-attr">
                    <span className="ip-attr-label">Coût</span>
                    <span className="ip-attr-value">
                      {formatCout(i.cout) || "—"}
                    </span>
                  </div>
                </div>

                <div className="ip-details">
                  <p className="ip-details-label">Détails de la réparation</p>
                  <p
                    className={`ip-details-text${!i.detailsReparation ? " is-muted" : ""}`}
                  >
                    {i.detailsReparation ||
                      "Aucun détail renseigné pour le moment."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ip-empty">
            <p className="ip-empty-text">Aucune intervention pour ce filtre.</p>
          </div>
        )}
      </main>
    </div>
  );
}

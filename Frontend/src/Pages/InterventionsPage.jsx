import React, { useState } from "react";
import "../style/InterventionsPage.css";
import logo from "../assets/logo.png";

/**
 * Page Suivi des interventions - Responsable de maintenance
 * Application GMAO - Delta SA
 *
 * Liste verticale des interventions, affichant les attributs de la classe
 * Intervention du diagramme de classes :
 * dateAffectation, dateDebut, dateFin, mecanicien (idMecanicien), cout,
 * detailsReparation, ainsi que le camion et le statut issus de la
 * Declaration associee.
 *
 * Donnees d'exemple affichees tant que le backend n'est pas branche.
 * Brancher en passant la prop `interventions`.
 */

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

export default function InterventionsPage({
  interventions = null,
  onBack = () => {},
}) {
  const displayInterventions = interventions || EXEMPLE_INTERVENTIONS;
  const [filtre, setFiltre] = useState("toutes");

  const filtered =
    filtre === "toutes"
      ? displayInterventions
      : displayInterventions.filter((i) => i.statut === filtre);

  return (
    <div className="ip-page">
      <header className="ip-topbar">
         <div className="mh-brand">
                            <img src={logo} alt="Delta SA" className="brand-logo" />
                            <span className="brand-divider" />
          <span className="ip-brand-suffix">GMAO</span>
        </div>

        <button className="ip-back" onClick={onBack}>
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
              className={`ip-filter-btn${
                filtre === f.key ? " is-active" : ""
              }`}
              onClick={() => setFiltre(f.key)}
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
                    <span className="ip-card-num">
                      Intervention #{i.id}
                    </span>
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
                    <span className="ip-attr-value">
                      {i.dateAffectation}
                    </span>
                  </div>

                  <div className="ip-attr">
                    <span className="ip-attr-label">Date de début</span>
                    <span
                      className={`ip-attr-value${
                        !i.dateDebut ? " is-muted" : ""
                      }`}
                    >
                      {i.dateDebut || "Non démarrée"}
                    </span>
                  </div>

                  <div className="ip-attr">
                    <span className="ip-attr-label">Date de fin</span>
                    <span
                      className={`ip-attr-value${
                        !i.dateFin ? " is-muted" : ""
                      }`}
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
                  <p className="ip-details-label">
                    Détails de la réparation
                  </p>
                  <p
                    className={`ip-details-text${
                      !i.detailsReparation ? " is-muted" : ""
                    }`}
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
            <p className="ip-empty-text">
              Aucune intervention pour ce filtre.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import "../style/MaintenanceHome.css";

const EXEMPLE_DECLARATIONS = [
  {
    id: 1,
    camion: "CAM-102",
    date: "17/06/2026",
    description: "Problème de freinage signalé par le chauffeur.",
  },
  {
    id: 2,
    camion: "CAM-215",
    date: "16/06/2026",
    description: "Fuite d'huile détectée lors du contrôle quotidien.",
  },
  {
    id: 3,
    camion: "CAM-330",
    date: "15/06/2026",
    description: "Bruit suspect au niveau du moteur.",
  },
];

const EXEMPLE_INTERVENTIONS = [
  {
    id: 1,
    camion: "CAM-087",
    mecanicien: "Mamadou Ndiaye",
    statut: "cours",
    statutLabel: "En cours",
  },
  {
    id: 2,
    camion: "CAM-154",
    mecanicien: "Fatou Diop",
    statut: "attente",
    statutLabel: "En attente de pièces",
  },
  {
    id: 3,
    camion: "CAM-221",
    mecanicien: "Ibrahima Sow",
    statut: "terminee",
    statutLabel: "Terminée",
  },
];

const EXEMPLE_MECANICIENS = [
  { id: 1, nom: "Mamadou Ndiaye" },
  { id: 2, nom: "Fatou Diop" },
  { id: 3, nom: "Ibrahima Sow" },
  { id: 4, nom: "Awa Kane" },
];

const EXEMPLE_STATS = {
  nbCamions: 24,
  nbMecaniciens: 12,
  disponibles: 16,
  immobilises: 8,
  tauxPanneMoisEnCours: 13,
  coutMoisEnCours: 1180000,
};

function formatFCFA(valeur) {
  return `${Number(valeur).toLocaleString("fr-FR")} FCFA`;
}

export default function MaintenanceHome({
  userInitials = "RM",
  declarations = null,
  interventions = null,
  stats = null,
  mecaniciens = null,
  onConfirmAssign = () => {}, // On garde cette prop pour traiter la soumission du formulaire
}) {
  // 2. Déclaration de la constante navigate
  const navigate = useNavigate();

  const [openId, setOpenId] = useState(null);
  const [formState, setFormState] = useState({});

  // 3. Centralisation des fonctions de redirection (Modifie les chemins ici)
  const handleOpenDashboard = () => {
    navigate("/Dashboard"); // <-- Ton chemin pour le Dashboard complet
  };

  const handleOpenDeclarations = () => {
    navigate("/Declarations"); // <-- Ton chemin pour voir toutes les déclarations
  };

  const handleOpenInterventions = () => {
    navigate("/Interventions"); // <-- Ton chemin pour voir toutes les interventions
  };

  const handleLogout = () => {
    // Nettoyage de la session utilisateur si nécessaire
    localStorage.removeItem("token");
    sessionStorage.clear();

    navigate("/login"); // <-- Ton chemin pour la page de connexion
  };

  // --- Logique d'affichage et de filtrage d'origine ---
  const displayDeclarations =
    declarations && declarations.length > 0
      ? declarations.slice(0, 3)
      : EXEMPLE_DECLARATIONS;

  const displayInterventions =
    interventions && interventions.length > 0
      ? interventions.slice(0, 3)
      : EXEMPLE_INTERVENTIONS;

  const displayMecaniciens = mecaniciens || EXEMPLE_MECANICIENS;
  const s = stats || EXEMPLE_STATS;

  const tauxDisponibilite = Math.round(
    (s.disponibles / (s.disponibles + s.immobilises)) * 100,
  );

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const updateField = (id, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleConfirm = (declaration) => {
    const values = formState[declaration.id] || {};
    onConfirmAssign({
      declarationId: declaration.id,
      idMecanicien: values.idMecanicien || "",
      coutEstime: values.coutEstime || "",
    });
    setOpenId(null);
  };

  return (
    <div className="mh-page">
      <header className="mh-topbar">
        <div className="mh-brand">
          <img src={logo} alt="Delta SA" className="brand-logo" />
          <span className="brand-divider" />
          <span className="brand-suffix">GMAO</span>
        </div>

        <nav className="mh-nav">
          <a className="mh-nav-link is-active" href="#tableau-de-bord">
            tableau de bord
          </a>
          <a className="mh-nav-link" href="#declarations">
            declarations
          </a>
          <a className="mh-nav-link" href="#interventions">
            interventions
          </a>
        </nav>

        <div className="mh-user">
          <div className="mh-user-info">
            <div className="mh-avatar">{userInitials}</div>
          </div>
          <div className="mh-divider-vert" />
          {/* Câblage direct de la déconnexion interne */}
          <button className="mh-logout" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <main className="mh-content">
        <div className="mh-heading-row">
          <p className="mh-eyebrow">Espace responsable de maintenance</p>
          <h1 className="mh-title">Suivi de la flotte</h1>
        </div>

        {/* ---------- SECTION 1 : TABLEAU DE BORD ---------- */}
        <section className="mh-section" id="tableau-de-bord">
          <div className="mh-section-label">
            <span className="mh-section-num">1</span>
            <span className="mh-section-text">Tableau de bord</span>
          </div>

          <div className="mh-stats-panel">
            <div className="mh-stats">
              <div className="mh-stat">
                <span className="mh-stat-label">Camions</span>
                <span className="mh-stat-value">{s.nbCamions}</span>
              </div>
              <div className="mh-stat">
                <span className="mh-stat-label">Mécaniciens</span>
                <span className="mh-stat-value">{s.nbMecaniciens}</span>
              </div>
              <div className="mh-stat">
                <span className="mh-stat-label">Disponibilité</span>
                <span className="mh-stat-value">{tauxDisponibilite}%</span>
              </div>
              <div className="mh-stat">
                <span className="mh-stat-label">Taux de panne</span>
                <span className="mh-stat-value">{s.tauxPanneMoisEnCours}%</span>
              </div>
              <div className="mh-stat">
                <span className="mh-stat-label">Coût du mois</span>
                <span className="mh-stat-value">
                  {formatFCFA(s.coutMoisEnCours)}
                </span>
              </div>
            </div>

            <div className="mh-stats-footer">
              {/* Câblage de la redirection du Dashboard */}
              <button className="mh-stats-link" onClick={handleOpenDashboard}>
                Tableau de bord complet
              </button>
            </div>
          </div>
        </section>

        {/* ---------- SECTION 2 : DECLARATIONS ---------- */}
        <section className="mh-section" id="declarations">
          <div className="mh-section-label">
            <span className="mh-section-num">2</span>
            <span className="mh-section-text">Déclarations à traiter</span>
          </div>

          <div className="mh-primary">
            <div className="mh-primary-head">
              <div>
                <h2 className="mh-primary-sub">
                  Validées par le back-office, en attente d'affectation à un
                  mécanicien.
                </h2>
              </div>
              {/* Câblage de la redirection pour les Déclarations */}
              <button className="mh-btn-text" onClick={handleOpenDeclarations}>
                Tout afficher
              </button>
            </div>

            {displayDeclarations.length > 0 ? (
              <div className="mh-decl-list">
                {displayDeclarations.map((d) => {
                  const isOpen = openId === d.id;
                  const values = formState[d.id] || {};

                  return (
                    <div
                      className={`mh-decl-card${isOpen ? " is-open" : ""}`}
                      key={d.id}
                    >
                      <div className="mh-decl-head">
                        <div className="mh-decl-main">
                          <div className="mh-decl-top">
                            <span className="mh-queue-truck">{d.camion}</span>
                            <span className="mh-queue-date">{d.date}</span>
                          </div>
                          <p className="mh-queue-desc">{d.description}</p>
                        </div>

                        <button
                          className={`mh-btn-assign${
                            isOpen ? " is-active" : ""
                          }`}
                          onClick={() => toggleOpen(d.id)}
                        >
                          {isOpen ? "Fermer" : "Affecter un mécanicien"}
                        </button>
                      </div>

                      {isOpen && (
                        <div className="mh-assign-form">
                          <div className="mh-field">
                            <label htmlFor={`mecano-${d.id}`}>
                              Mécanicien à affecter
                            </label>
                            <select
                              id={`mecano-${d.id}`}
                              value={values.idMecanicien || ""}
                              onChange={(e) =>
                                updateField(
                                  d.id,
                                  "idMecanicien",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">
                                Sélectionner un mécanicien
                              </option>
                              {displayMecaniciens.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.nom}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="mh-field">
                            <label htmlFor={`cout-${d.id}`}>
                              Coût estimé (FCFA)
                            </label>
                            <input
                              id={`cout-${d.id}`}
                              type="number"
                              min="0"
                              placeholder="Ex : 75000"
                              value={values.coutEstime || ""}
                              onChange={(e) =>
                                updateField(d.id, "coutEstime", e.target.value)
                              }
                            />
                          </div>

                          <div className="mh-assign-footer">
                            <button
                              className="mh-btn-cancel"
                              onClick={() => setOpenId(null)}
                            >
                              Annuler
                            </button>
                            <button
                              className="mh-btn-confirm"
                              onClick={() => handleConfirm(d)}
                            >
                              Confirmer l'affectation
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mh-empty">
                <p className="mh-empty-text">
                  Aucune déclaration en attente d'affectation pour le moment.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ---------- SECTION 3 : INTERVENTIONS ---------- */}
        <section className="mh-section" id="interventions">
          <div className="mh-section-label">
            <span className="mh-section-num">3</span>
            <span className="mh-section-text">Interventions en cours</span>
          </div>

          <div className="mh-secondary">
            <div className="mh-secondary-head">
              <h2 className="mh-secondary-title">Interventions en cours</h2>
              {/* Câblage de la redirection pour les Interventions */}
              <button className="mh-btn-text" onClick={handleOpenInterventions}>
                Voir le suivi
              </button>
            </div>

            {displayInterventions.length > 0 ? (
              <ul className="mh-list">
                {displayInterventions.map((i) => (
                  <li className="mh-list-row" key={i.id}>
                    <span className="mh-list-truck">{i.camion}</span>
                    <span className="mh-list-mecano">{i.mecanicien}</span>
                    <span className={`mh-pill mh-pill-${i.statut}`}>
                      {i.statutLabel}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mh-empty mh-empty-compact">
                <p className="mh-empty-text">
                  Aucune intervention en cours pour le moment.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

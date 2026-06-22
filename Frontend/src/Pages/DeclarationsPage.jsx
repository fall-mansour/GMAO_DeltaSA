// Frontend/src/pages/DeclarationsPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importation pour débloquer le routage du bouton Retour
import logo from "../assets/logo.png";
import "../style/DeclarationsPage.css";

const EXEMPLE_DECLARATIONS = [
  {
    id: 1,
    camion: "CAM-102",
    date: "17/06/2026",
    description:
      "Problème de freinage signalé par le chauffeur. Pédale molle, distance de freinage allongée.",
  },
  {
    id: 2,
    camion: "CAM-215",
    date: "16/06/2026",
    description:
      "Fuite d'huile détectée lors du contrôle quotidien, sous le moteur côté avant gauche.",
  },
  {
    id: 3,
    camion: "CAM-330",
    date: "15/06/2026",
    description: "Bruit suspect au niveau du moteur lors de l'accélération.",
  },
  {
    id: 4,
    camion: "CAM-048",
    date: "15/06/2026",
    description:
      "Fuite d'air côté pneu avant droit, signalée après une tournée de pompage.",
  },
];

const EXEMPLE_MECANICIENS = [
  { id: 1, nom: "Mamadou Ndiaye" },
  { id: 2, nom: "Fatou Diop" },
  { id: 3, nom: "Ibrahima Sow" },
  { id: 4, nom: "Awa Kane" },
];

export default function DeclarationsPage({
  declarations = null,
  mecaniciens = null,
  onConfirmAssign = () => {},
}) {
  const navigate = useNavigate(); // Hook de navigation
  const displayDeclarations = declarations || EXEMPLE_DECLARATIONS;
  const displayMecaniciens = mecaniciens || EXEMPLE_MECANICIENS;

  const [openId, setOpenId] = useState(null);
  const [formState, setFormState] = useState({});

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

  // Gestion du retour propre
  const handleBack = () => {
    navigate(-1); // Retourne automatiquement à la page précédente
  };

  return (
    // MODIFICATION : Forçage du défilement vertical avec minHeight et overflowY de secours
    <div className="dp-page" style={{ minHeight: "100vh", overflowY: "auto" }}>
      <header className="dp-topbar">
        <div
          className="mh-brand"
          onClick={() => navigate("/maintenance")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Delta SA" className="brand-logo" />
          <span className="brand-divider" />
          <span className="dp-brand-suffix">GMAO</span>
        </div>

        {/* Correction du bouton avec l'action réactive */}
        <button
          className="dp-back"
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        >
          ← Retour à l'accueil
        </button>
      </header>

      <main className="dp-content">
        <div className="dp-heading-row">
          <div>
            <p className="dp-eyebrow">Espace responsable de maintenance</p>
            <h1 className="dp-title">Déclarations à traiter</h1>
          </div>
          <span className="dp-count-badge">
            {displayDeclarations.length} en attente
          </span>
        </div>

        {displayDeclarations.length > 0 ? (
          <div className="dp-list">
            {displayDeclarations.map((d) => {
              const isOpen = openId === d.id;
              const values = formState[d.id] || {};

              return (
                <div
                  className={`dp-card${isOpen ? " is-open" : ""}`}
                  key={d.id}
                >
                  <div className="dp-card-head">
                    <div className="dp-card-main">
                      <div className="dp-card-top">
                        <span className="dp-card-truck">{d.camion}</span>
                        <span className="dp-card-date">{d.date}</span>
                      </div>
                      <p className="dp-card-desc">{d.description}</p>
                    </div>

                    <div className="dp-card-action">
                      <button
                        className={`dp-btn-assign${isOpen ? " is-active" : ""}`}
                        onClick={() => toggleOpen(d.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {isOpen ? "Fermer" : "Affecter un mécanicien"}
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="dp-assign-form">
                      <div className="dp-field">
                        <label htmlFor={`mecano-${d.id}`}>
                          Mécanicien à affecter
                        </label>
                        <select
                          id={`mecano-${d.id}`}
                          value={values.idMecanicien || ""}
                          onChange={(e) =>
                            updateField(d.id, "idMecanicien", e.target.value)
                          }
                        >
                          <option value="">Sélectionner un mécanicien</option>
                          {displayMecaniciens.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.nom}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="dp-field">
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
                        <span className="dp-field-hint">
                          Le coût final sera renseigné par le mécanicien à la
                          clôture de l'intervention.
                        </span>
                      </div>

                      <div className="dp-assign-footer">
                        <button
                          className="dp-btn-cancel"
                          onClick={() => setOpenId(null)}
                          style={{ cursor: "pointer" }}
                        >
                          Annuler
                        </button>
                        <button
                          className="dp-btn-confirm"
                          onClick={() => handleConfirm(d)}
                          style={{ cursor: "pointer" }}
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
          <div className="dp-empty">
            <p className="dp-empty-text">
              Aucune déclaration en attente d'affectation pour le moment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

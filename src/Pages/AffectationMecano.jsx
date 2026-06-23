import { Link } from "react-router-dom";
import { useState } from "react";
import "../style/Affectationmecano.css"; // Importation de son fichier CSS propre

const AffectationsMecano = () => {
  const [affectations] = useState([
    {
      id: 201,
      numVehicule: "DK-1234-A",
      nomChauffeur: "Mansour Fall",
      description:
        "Fuite de liquide hydraulique importante au niveau du bras articulé arrière gauche.",
      priorite: "Haute",
      dateAffectation: "18/06/2026",
    },
    {
      id: 202,
      numVehicule: "DK-5678-B",
      nomChauffeur: "Ibrahima Diallo",
      description:
        "Perte de puissance moteur intermittente avec voyant diagnostic allumé sur le tableau de bord.",
      priorite: "Critique",
      dateAffectation: "18/06/2026",
    },
  ]);

  return (
    <div className="affectations-container">
      {/* ── EN-TÊTE DE LA PAGE D'AFFECTATION ── */}
      <div className="affectations-header">
        <div className="header-title-area">
          <h2>Bienvenue sur votre page d'affectation, M. Diouf 🛠️</h2>
          <p>
            Retrouvez ci-dessous la liste des interventions mécaniques qui vous
            ont été attribuées par la direction.
          </p>
        </div>
        <div className="header-badge-count">
          <span className="badge-number">{affectations.length}</span>
          <span className="badge-text">Tâche(s)</span>
        </div>
      </div>

      {/* ── TABLEAU DES AFFECTATIONS EN BANDE LONGUE ── */}
      <div className="table-wrapper">
        <table className="affectations-table">
          <thead>
            <tr>
              <th>Véhicule</th>
              <th>Chauffeur Déclarant</th>
              <th>Description de l'intervention</th>
              <th>Assigné le</th>
              <th className="text-center">Priorité</th>
            </tr>
          </thead>
          <tbody>
            {affectations.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-table">
                  Aucune affectation ne vous est attribuée pour le moment.
                </td>
              </tr>
            ) : (
              affectations.map((task) => (
                <tr key={task.id}>
                  {/* Badge N° Véhicule */}
                  <td>
                    <span className="vehicle-badge">{task.numVehicule}</span>
                  </td>

                  {/* Chauffeur */}
                  <td className="driver-cell">
                    <strong>{task.nomChauffeur}</strong>
                  </td>

                  {/* Description de la panne */}
                  <td>
                    <p className="desc-text">{task.description}</p>
                  </td>

                  {/* Date d'assignation */}
                  <td className="date-cell">{task.dateAffectation}</td>

                  {/* Niveau de Priorité visuel */}
                  <td className="text-center">
                    <span
                      style={{
                        backgroundColor:
                          task.priorite === "Critique" ? "#fde8e8" : "#fff9e6",
                        color:
                          task.priorite === "Critique" ? "#e02424" : "#f0a900",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        border:
                          task.priorite === "Critique"
                            ? "1px solid #f8b4b4"
                            : "1px solid #ffeeba",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {task.priorite}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bouton de retour vers l'accueil mécanicien */}
      <div className="back-link-wrapper">
        <Link to="/Accueilmeca" className="back-link">
          ← Retour à l'accueil atelier
        </Link>
      </div>
    </div>
  );
};

export default AffectationsMecano;

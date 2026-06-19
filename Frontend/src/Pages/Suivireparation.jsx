// Frontend/src/pages/SuiviReparation.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/suivireparation.css"; // Importation de son fichier CSS propre

const SuiviReparation = () => {
  // Liste des pannes affectées au mécanicien
  const [reparations, setReparations] = useState([
    {
      id: 301,
      numVehicule: "DK-1234-A",
      nomChauffeur: "Mansour Fall",
      description:
        "Fuite de liquide hydraulique importante au niveau du bras articulé arrière gauche.",
      etatActuel: "Assigné",
    },
    {
      id: 302,
      numVehicule: "DK-5678-B",
      nomChauffeur: "Ibrahima Diallo",
      description:
        "Perte de puissance moteur intermittente avec voyant diagnostic allumé sur le tableau de bord.",
      etatActuel: "En cours de réparation",
    },
  ]);

  // Action pour passer le statut de la panne "En cours"
  const handleEnCours = (id, vehicule) => {
    setReparations((prev) =>
      prev.map((rep) =>
        rep.id === id ? { ...rep, etatActuel: "En cours de réparation" } : rep,
      ),
    );
    alert(
      `Le véhicule ${vehicule} est maintenant marqué : En cours de réparation.`,
    );
  };

  // Action pour marquer la panne comme "Terminé"
  const handleTermine = (id, vehicule) => {
    setReparations((prev) =>
      prev.map((rep) =>
        rep.id === id ? { ...rep, etatActuel: "Terminé" } : rep,
      ),
    );
    alert(
      `L'intervention sur le véhicule ${vehicule} est marquée comme terminée !`,
    );
  };

  return (
    <div className="suivi-rep-container">
      {/* ── EN-TÊTE DE LA PAGE DE SUIVI DE RÉPARATION ── */}
      <div className="suivi-rep-header">
        <div className="header-title-area">
          <h2>Bienvenue sur votre page de suivi de réparation, M. Diouf</h2>
          <p>
            Mettez à jour en temps réel l'avancement des interventions
            mécaniques sur les véhicules du parc.
          </p>
        </div>
        <div className="header-badge-count">
          <span className="badge-number">{reparations.length}</span>
          <span className="badge-text">Dossier(s)</span>
        </div>
      </div>

      {/* ── TABLEAU EN BANDE LONGUE AVEC LES DEUX BOUTONS D'ACTION ── */}
      <div className="table-wrapper">
        <table className="suivi-rep-table">
          <thead>
            <tr>
              <th>Véhicule</th>
              <th>Chauffeur Déclarant</th>
              <th>Description de la panne</th>
              <th className="text-center">Statut Actuel</th>
              <th className="text-center">Actions Atelier</th>
            </tr>
          </thead>
          <tbody>
            {reparations.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-table">
                  Aucun dossier de réparation ne vous est assigné.
                </td>
              </tr>
            ) : (
              reparations.map((rep) => (
                <tr key={rep.id}>
                  {/* Badge N° Véhicule */}
                  <td>
                    <span className="vehicle-badge">{rep.numVehicule}</span>
                  </td>

                  {/* Chauffeur déclarant */}
                  <td>
                    <strong>{rep.nomChauffeur}</strong>
                  </td>

                  {/* Description textuelle */}
                  <td>
                    <p className="desc-text">{rep.description}</p>
                  </td>

                  {/* Statut actuel de la tâche */}
                  <td className="text-center">
                    <span
                      style={{
                        backgroundColor:
                          rep.etatActuel === "Terminé" ? "#e6f7ed" : "#f4f8fc",
                        color:
                          rep.etatActuel === "Terminé" ? "#1e7e34" : "#516d8a",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        border:
                          rep.etatActuel === "Terminé"
                            ? "1px solid #c3e6cb"
                            : "1px solid #c5ddef",
                        display: "inline-block",
                      }}
                    >
                      {rep.etatActuel}
                    </span>
                  </td>

                  {/* Les deux boutons d'action demandés */}
                  <td>
                    <div className="actions-cell">
                      <button
                        className="btn-status progress"
                        onClick={() => handleEnCours(rep.id, rep.numVehicule)}
                        disabled={rep.etatActuel === "Terminé"}
                        style={{
                          opacity: rep.etatActuel === "Terminé" ? 0.4 : 1,
                          cursor:
                            rep.etatActuel === "Terminé"
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        En Cours
                      </button>
                      <button
                        className="btn-status success"
                        onClick={() => handleTermine(rep.id, rep.numVehicule)}
                        disabled={rep.etatActuel === "Terminé"}
                        style={{
                          opacity: rep.etatActuel === "Terminé" ? 0.4 : 1,
                          cursor:
                            rep.etatActuel === "Terminé"
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        Terminé
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lien de retour vers l'accueil mécanicien */}
      <div className="back-link-wrapper">
        <Link to="/mecano" className="back-link">
          ← Retour à l'accueil atelier
        </Link>
      </div>
    </div>
  );
};

export default SuiviReparation;

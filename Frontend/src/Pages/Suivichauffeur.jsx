// Frontend/src/pages/SuiviChauffeur.jsx
import { useState } from "react";
import "../style/suivichauffeur.css"; // Réutilisation du fichier CSS pour garder le même design

const SuiviChauffeur = () => {
  // Liste des déclarations du chauffeur connecté
  const [mesDeclarations] = useState([
    {
      id: 1,
      numVehicule: "DK-1234-A",
      description:
        "Fuite de liquide hydraulique importante au niveau du bras articulé arrière gauche.",
      dateSurvenue: "17/06/2026 09:30",
      dateSoumission: "2026-06-17",
      heureSoumission: "09:45",
      statutValidation: "Validé", // États possibles : 'Validé' ou 'En attente'
      etatReparation: "En cours de réparation", // États possibles : 'En cours de réparation' ou 'Terminé'
    },
    {
      id: 2,
      numVehicule: "DK-1234-A",
      description:
        "Climatisation cabine inopérante et sifflement au démarrage.",
      dateSurvenue: "10/06/2026 07:15",
      dateSoumission: "2026-06-10",
      heureSoumission: "08:00",
      statutValidation: "Validé",
      etatReparation: "Terminé",
    },
    {
      id: 3,
      numVehicule: "DK-1234-A",
      description: "Fissure légère constatée sur le rétroviseur latéral droit.",
      dateSurvenue: "18/06/2026 11:20",
      dateSoumission: "2026-06-18",
      heureSoumission: "11:40",
      statutValidation: "En attente",
      etatReparation: "-", // Non applicable tant que ce n'est pas validé
    },
  ]);

  // Les 3 barres de recherche distinctes conformes au design global
  const [filterVehicule, setFilterVehicule] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Formatage de la date YYYY-MM-DD vers JJ/MM/AAAA
  const formatDateAffichage = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Filtrage en temps réel
  const filteredDeclarations = mesDeclarations.filter((dec) => {
    const matchVehicule = dec.numVehicule
      .toLowerCase()
      .includes(filterVehicule.toLowerCase());
    const matchStatut =
      filterStatut === "" ? true : dec.statutValidation === filterStatut;
    const matchDate =
      filterDate === "" ? true : dec.dateSoumission === filterDate;

    return matchVehicule && matchStatut && matchDate;
  });

  return (
    <div className="validation-container">
      {/* ── EN-TÊTE DE LA PAGE ── */}
      {/* ── EN-TÊTE SPÉCIFIQUE ET IMMERSIF POUR LE CHAUFFEUR ── */}
      <div className="driver-custom-header">
        <div className="driver-profile-section">
          {/* Avatar moderne avec initiales */}
          <div className="driver-avatar">
            <span>AD</span>
          </div>

          <div className="driver-welcome-text">
            <div className="driver-meta">
              <h2>Espace Chauffeur</h2>
              <span className="status-indicator-badge">● En service</span>
            </div>
            <p>
              Bienvenue, <strong>Abdoulaye Diouf</strong> — Suivi de vos
              rapports d'anomalies Delta SA.
            </p>
          </div>
        </div>

        {/* Bloc de statistiques à droite en format cartes minimales */}
        <div className="header-stats-wrapper">
          <div className="stat-mini-card">
            <span className="stat-label">Total Demandes</span>
            <span className="stat-value">{filteredDeclarations.length}</span>
          </div>
          <div className="stat-mini-card status-active">
            <span className="stat-label">En attente</span>
            <span className="stat-value">
              {
                filteredDeclarations.filter(
                  (d) => d.statutValidation === "En attente",
                ).length
              }
            </span>
          </div>
        </div>
      </div>

      {/* ── LES 3 BARRES DE RECHERCHE SÉPARÉES ── */}
      <div className="search-filters-bar">
        <div className="filter-group">
          <label>N° du Véhicule</label>
          <input
            type="text"
            placeholder="Ex: DK-1234-A..."
            value={filterVehicule}
            onChange={(e) => setFilterVehicule(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>État de la demande</label>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="filter-input"
            style={{ cursor: "pointer" }}
          >
            <option value="">Tous les états</option>
            <option value="En attente">En attente</option>
            <option value="Validé">Validé</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date de soumission</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="filter-input date-picker"
          />
          {filterDate && (
            <button
              className="clear-date-btn"
              onClick={() => setFilterDate("")}
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* ── TABLEAU EN BANDE LONGUE ── */}
      <div className="table-wrapper">
        <table className="validation-table">
          <thead>
            <tr>
              <th>Véhicule</th>
              <th>Description de la panne</th>
              <th>Soumise le</th>
              <th className="text-center">Validation</th>
              <th className="text-center">État Réparation</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeclarations.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-table">
                  Aucun dossier ne correspond à vos filtres.
                </td>
              </tr>
            ) : (
              filteredDeclarations.map((dec) => (
                <tr key={dec.id}>
                  {/* Badge Véhicule */}
                  <td className="vehicle-cell">
                    <span className="vehicle-badge">{dec.numVehicule}</span>
                  </td>

                  {/* Description */}
                  <td className="description-cell">
                    <p className="desc-text">{dec.description}</p>
                  </td>

                  {/* Date de Soumission */}
                  <td className="date-cell text-muted">
                    {formatDateAffichage(dec.dateSoumission)} à{" "}
                    {dec.heureSoumission}
                  </td>

                  {/* Statut de Validation */}
                  <td className="text-center">
                    <span
                      style={{
                        backgroundColor:
                          dec.statutValidation === "Validé"
                            ? "#eef4fb"
                            : "#fff9e6",
                        color:
                          dec.statutValidation === "Validé"
                            ? "#2b7fd4"
                            : "#f0a900",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        border:
                          dec.statutValidation === "Validé"
                            ? "1px solid #c5ddef"
                            : "1px solid #ffeeba",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {dec.statutValidation}
                    </span>
                  </td>

                  {/* État de la Réparation Conditionnel */}
                  <td className="text-center">
                    {dec.statutValidation === "En attente" ? (
                      <span
                        style={{
                          color: "#6b8bad",
                          fontSize: "0.85rem",
                          fontStyle: "italic",
                        }}
                      >
                        En attente de revue
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor:
                            dec.etatReparation === "Terminé"
                              ? "#e6f7ed"
                              : "#f4f8fc",
                          color:
                            dec.etatReparation === "Terminé"
                              ? "#1e7e34"
                              : "#516d8a",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          border:
                            dec.etatReparation === "Terminé"
                              ? "1px solid #c3e6cb"
                              : "1px solid #c5ddef",
                          display: "inline-block",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {dec.etatReparation === "Terminé"
                          ? "✓ Terminé"
                          : "🛠️ En cours de réparation"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuiviChauffeur;

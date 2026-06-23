// Frontend/src/pages/HistoriqueBackoffice.jsx
import "../style/validation.css";
import { useState } from "react"; // On réutilise le même fichier CSS pour garder le décor exact

const HistoriqueBackoffice = () => {
  // Liste des déclarations déjà validées (Historique)
  const [historique] = useState([
    {
      id: 101,
      numVehicule: "DK-1234-A",
      prenomChauffeur: "Mansour",
      nomChauffeur: "Fall",
      description:
        "Fuite de liquide hydraulique importante au niveau du bras articulé arrière gauche. Validé et transmis à l'atelier.",
      dateSurvenue: "17/06/2026 09:30",
      dateSoumission: "2026-06-17",
      heureSoumission: "09:45",
    },
    {
      id: 102,
      numVehicule: "DK-8888-X",
      prenomChauffeur: "Modou",
      nomChauffeur: "Diop",
      description:
        "Pression de freinage insuffisante signalée sur le circuit secondaire.",
      dateSurvenue: "14/06/2026 11:00",
      dateSoumission: "2026-06-14",
      heureSoumission: "11:15",
    },
  ]);

  // Même logique de filtres avec les 3 barres de recherche distinctes
  const [filterVehicule, setFilterVehicule] = useState("");
  const [filterChauffeur, setFilterChauffeur] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Formatage de la date YYYY-MM-DD vers JJ/MM/AAAA
  const formatDateAffichage = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Filtrage combiné en temps réel (identique à la page de validation)
  const filteredHistorique = historique.filter((dec) => {
    const matchVehicule = dec.numVehicule
      .toLowerCase()
      .includes(filterVehicule.toLowerCase());

    const nomComplet =
      `${dec.prenomChauffeur} ${dec.nomChauffeur}`.toLowerCase();
    const matchChauffeur = nomComplet.includes(filterChauffeur.toLowerCase());

    const matchDate =
      filterDate === "" ? true : dec.dateSoumission === filterDate;

    return matchVehicule && matchChauffeur && matchDate;
  });

  return (
    <div className="validation-container">
      {/* ── EN-TÊTE DE L'HISTORIQUE ── */}
      <div className="validation-header">
        <div className="header-title-area">
          <div className="header-title-row">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="header-logo"
            />
            <h2>Historique des validations </h2>
          </div>
          <p>
            Consultez toutes les déclarations validées et archivées dans le
            système.
          </p>
        </div>
        <div className="header-badge-count">
          <span className="badge-number">{filteredHistorique.length}</span>
          <span className="badge-text">Archives(s)</span>
        </div>
      </div>

      {/* ── LES MÊMES 3 BARRES DE RECHERCHE DISTINCKTES ── */}
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
          <label>Chauffeur</label>
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={filterChauffeur}
            onChange={(e) => setFilterChauffeur(e.target.value)}
            className="filter-input"
          />
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
              <th>Chauffeur</th>
              <th>Description de la panne</th>
              <th>Survenue le</th>
              <th>Soumise le</th>
              <th className="text-center">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistorique.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-table">
                  Aucun dossier archivé ne correspond à vos filtres.
                </td>
              </tr>
            ) : (
              filteredHistorique.map((dec) => (
                <tr key={dec.id}>
                  <td className="vehicle-cell">
                    <span className="vehicle-badge">{dec.numVehicule}</span>
                  </td>
                  <td className="driver-cell">
                    <strong>
                      {dec.prenomChauffeur} {dec.nomChauffeur}
                    </strong>
                  </td>
                  <td className="description-cell">
                    <p className="desc-text">{dec.description}</p>
                  </td>
                  <td className="date-cell">{dec.dateSurvenue}</td>
                  <td className="date-cell text-muted">
                    {formatDateAffichage(dec.dateSoumission)} à{" "}
                    {dec.heureSoumission}
                  </td>
                  {/* Badge de statut à la place du bouton de validation */}
                  <td className="action-cell text-center">
                    <span
                      style={{
                        backgroundColor: "#eef4fb",
                        color: "#2b7fd4",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        display: "inline-block",
                        border: "1px solid #c5ddef",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Validé
                    </span>
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

export default HistoriqueBackoffice;

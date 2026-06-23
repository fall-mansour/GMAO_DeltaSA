import "../style/validation.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HistoriqueBackoffice = () => {
  const navigate = useNavigate();

  const [historique] = useState([
    {
      id: 101,
      numVehicule: "DK-1234-A",
      prenomChauffeur: "Mansour",
      nomChauffeur: "Fall",
      description: "Fuite de liquide hydraulique importante au niveau du bras articulé arrière gauche.",
      dateSurvenue: "17/06/2026 09:30",
      dateSoumission: "2026-06-17",
      heureSoumission: "09:45",
      etatReparation: "En attente",
    },
    {
      id: 102,
      numVehicule: "DK-8888-X",
      prenomChauffeur: "Modou",
      nomChauffeur: "Diop",
      description: "Pression de freinage insuffisante signalée sur le circuit secondaire.",
      dateSurvenue: "14/06/2026 11:00",
      dateSoumission: "2026-06-14",
      heureSoumission: "11:15",
      etatReparation: "En cours",
    },
    {
      id: 103,
      numVehicule: "DK-5432-B",
      prenomChauffeur: "Ibrahima",
      nomChauffeur: "Sow",
      description: "Surchauffe moteur signalée après une longue tournée.",
      dateSurvenue: "10/06/2026 08:00",
      dateSoumission: "2026-06-10",
      heureSoumission: "08:20",
      etatReparation: "Terminé",
    },
  ]);

  const [filterVehicule, setFilterVehicule] = useState("");
  const [filterChauffeur, setFilterChauffeur] = useState("");
  const [filterEtat, setFilterEtat] = useState("");

  const formatDateAffichage = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const filteredHistorique = historique.filter((dec) => {
    const matchVehicule = dec.numVehicule.toLowerCase().includes(filterVehicule.toLowerCase());
    const nomComplet = `${dec.prenomChauffeur} ${dec.nomChauffeur}`.toLowerCase();
    const matchChauffeur = nomComplet.includes(filterChauffeur.toLowerCase());
    const matchEtat = filterEtat === "" ? true : dec.etatReparation === filterEtat;
    return matchVehicule && matchChauffeur && matchEtat;
  });

  const getBadgeStyle = (etat) => {
    if (etat === "Terminé") return { backgroundColor: "#dcfce7", color: "#16a34a" };
    if (etat === "En cours") return { backgroundColor: "#fef9c3", color: "#ca8a04" };
    return { backgroundColor: "#fee2e2", color: "#dc2626" };
  };

  return (
    <div className="validation-container">

      {/* BOUTON RETOUR */}
      <div style={{ padding: "20px 24px 0" }}>
        <button
          onClick={() => navigate("/Accueilbackoff")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#1d4ed8",
            fontSize: "14px",
            fontWeight: "600",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ← Retour
        </button>
      </div>

      <div className="validation-header">
        <div className="header-title-area">
          <div className="header-title-row">
            <img src="/logo.jpeg" alt="Logo" className="header-logo" style={{ height: "60px", width: "auto" }} />
            <h2>Historique</h2>
          </div>
        </div>
        <div className="header-badge-count">
          <span className="badge-number">{filteredHistorique.length}</span>
          <span className="badge-text">Déclaration(s)</span>
        </div>
      </div>

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
          <label>État de réparation</label>
          <select
            value={filterEtat}
            onChange={(e) => setFilterEtat(e.target.value)}
            className="filter-input"
          >
            <option value="">Tous</option>
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="validation-table">
          <thead>
            <tr>
              <th>Véhicule</th>
              <th>Chauffeur</th>
              <th>Description de la panne</th>
              <th>Survenue le</th>
              <th>Soumise le</th>
              <th className="text-center">État réparation</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistorique.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-table">
                  Aucune déclaration ne correspond à vos filtres.
                </td>
              </tr>
            ) : (
              filteredHistorique.map((dec) => (
                <tr key={dec.id}>
                  <td className="vehicle-cell">
                    <span className="vehicle-badge">{dec.numVehicule}</span>
                  </td>
                  <td className="driver-cell">
                    <strong>{dec.prenomChauffeur} {dec.nomChauffeur}</strong>
                  </td>
                  <td className="description-cell">
                    <p className="desc-text">{dec.description}</p>
                  </td>
                  <td className="date-cell">{dec.dateSurvenue}</td>
                  <td className="date-cell text-muted">
                    {formatDateAffichage(dec.dateSoumission)} à {dec.heureSoumission}
                  </td>
                  <td className="action-cell text-center">
                    <span style={{
                      ...getBadgeStyle(dec.etatReparation),
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}>
                      {dec.etatReparation}
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
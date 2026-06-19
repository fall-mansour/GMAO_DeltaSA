import "../style/validation.css";
import { useState } from "react";
const ValidationListe = () => {
  // Liste de toutes les déclarations initiales
  const [declarations, setDeclarations] = useState([
    {
      id: 1,
      numVehicule: "DK-1234-A",
      prenomChauffeur: "Mansour",
      nomChauffeur: "Fall",
      description:
        "Fuite de liquide hydraulique importante au niveau du bras articulé arrière gauche.",
      dateSurvenue: "17/06/2026 09:30",
      dateSoumission: "2026-06-17", // Format YYYY-MM-DD pour la correspondance avec le calendrier
      heureSoumission: "09:45",
    },
    {
      id: 2,
      numVehicule: "DK-5678-B",
      prenomChauffeur: "Ibrahima",
      nomChauffeur: "Diallo",
      description:
        "Perte de puissance moteur intermittente avec voyant diagnostic allumé sur le tableau de bord.",
      dateSurvenue: "16/06/2026 18:15",
      dateSoumission: "2026-06-17",
      heureSoumission: "07:30",
    },
    {
      id: 3,
      numVehicule: "DK-9012-C",
      prenomChauffeur: "Moussa",
      nomChauffeur: "Ndiaye",
      description:
        "Dysfonctionnement du système de fermeture de la benne principale.",
      dateSurvenue: "15/06/2026 14:00",
      dateSoumission: "2026-06-15",
      heureSoumission: "14:22",
    },
  ]);

  // États pour les 3 barres de recherche / filtres distincts
  const [filterVehicule, setFilterVehicule] = useState("");
  const [filterChauffeur, setFilterChauffeur] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleValider = (id) => {
    alert(`La déclaration N°${id} a été validée avec succès !`);
    setDeclarations(declarations.filter((dec) => dec.id !== id));
  };

  // Formatage de la date YYYY-MM-DD vers le format d'affichage JJ/MM/AAAA
  const formatDateAffichage = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Logique de filtrage combinée en temps réel
  const filteredDeclarations = declarations.filter((dec) => {
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
      {/* ── EN-TÊTE MODERNISÉ ── */}
      <div className="validation-header">
        <div className="header-title-area">
          <div className="header-title-row">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="header-logo"
            />
            <h2>Page de validation ✅</h2>
          </div>
          <p>
            Espace dédié à la validation des déclarations soumises par les
            chauffeurs.
          </p>
        </div>
        <div className="header-badge-count">
          <span className="badge-number">{filteredDeclarations.length}</span>
          <span className="badge-text">Demande(s)</span>
        </div>
      </div>

      {/* ── BANDEAU DES FILTRES DE RECHERCHE ── */}
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

      {/* ── TABLEAU EN PLEIN ÉCRAN ── */}
      <div className="table-wrapper">
        <table className="validation-table">
          <thead>
            <tr>
              <th>Véhicule</th>
              <th>Chauffeur</th>
              <th>Description de la panne</th>
              <th>Survenue le</th>
              <th>Soumise le</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeclarations.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-table">
                  Aucune déclaration ne correspond à vos critères de recherche.
                </td>
              </tr>
            ) : (
              filteredDeclarations.map((dec) => (
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
                  <td className="action-cell text-center">
                    <button
                      onClick={() => handleValider(dec.id)}
                      className="btn-validate"
                    >
                      Valider
                    </button>
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

export default ValidationListe;

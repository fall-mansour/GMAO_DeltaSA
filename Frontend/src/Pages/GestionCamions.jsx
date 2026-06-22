import React, { useState } from "react";
import "../style/Admin.css";

/**
 * Page Gestion des camions - Administrateur
 * Application GMAO - Delta SA
 *
 * Tableau des camions avec :
 * - Recherche par immatriculation / modèle
 * - Ajout / modification / suppression de camion
 * - Rattachement de jusqu'à 2 chauffeurs par camion
 * - Affichage de l'état du camion (disponible, en panne, entretien)
 */

const ETATS = [
  { value: "disponible", label: "Disponible" },
  { value: "panne",      label: "En panne" },
  { value: "entretien",  label: "En entretien" },
];

const ETAT_CLASS = {
  disponible: "admin-etat-dispo",
  panne:      "admin-etat-panne",
  entretien:  "admin-etat-entretien",
};

const EXEMPLE_CHAUFFEURS = [
  { id: 1, nom: "Diallo Mamadou" },
  { id: 2, nom: "Ba Ousmane" },
  { id: 3, nom: "Sarr Modou" },
  { id: 4, nom: "Thiaw Cheikh" },
  { id: 5, nom: "Faye Ibou" },
];

const EXEMPLE_CAMIONS = [
  { id: 1, immatriculation: "DK-1234-AB", modele: "Mercedes Actros",    etat: "disponible", chauffeurs: [1, 2] },
  { id: 2, immatriculation: "DK-5678-CD", modele: "Renault Premium",    etat: "panne",      chauffeurs: [3] },
  { id: 3, immatriculation: "DK-9012-EF", modele: "Volvo FH",           etat: "disponible", chauffeurs: [4, 5] },
  { id: 4, immatriculation: "DK-3456-GH", modele: "MAN TGX",            etat: "entretien",  chauffeurs: [] },
  { id: 5, immatriculation: "DK-7890-IJ", modele: "Scania R450",        etat: "disponible", chauffeurs: [1] },
];

const EMPTY_FORM = {
  immatriculation: "", modele: "", etat: "disponible", chauffeurs: [],
};

export default function GestionCamions({
  camions = null,
  chauffeurs = null,
  onBack = () => {},
  onLogout = () => {},
  onSave = () => {},
  onDelete = () => {},
}) {
  const allChauffeurs = chauffeurs || EXEMPLE_CHAUFFEURS;
  const [data, setData] = useState(camions || EXEMPLE_CAMIONS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = data.filter((c) =>
    `${c.immatriculation} ${c.modele}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getChauffeurNom = (id) =>
    allChauffeurs.find((c) => c.id === id)?.nom || "—";

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setModal("add");
  };

  const openEdit = (c) => {
    setForm({
      immatriculation: c.immatriculation,
      modele: c.modele,
      etat: c.etat,
      chauffeurs: c.chauffeurs,
    });
    setEditId(c.id);
    setModal("edit");
  };

  const toggleChauffeur = (id) => {
    setForm((prev) => {
      const already = prev.chauffeurs.includes(id);
      if (already) {
        return { ...prev, chauffeurs: prev.chauffeurs.filter((c) => c !== id) };
      }
      if (prev.chauffeurs.length >= 2) return prev; // max 2
      return { ...prev, chauffeurs: [...prev.chauffeurs, id] };
    });
  };

  const handleSave = () => {
    if (modal === "add") {
      const newCamion = { ...form, id: Date.now() };
      setData((prev) => [...prev, newCamion]);
      onSave(newCamion);
    } else {
      setData((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, ...form } : c))
      );
      onSave({ ...form, id: editId });
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((c) => c.id !== id));
    onDelete(id);
    setConfirmDelete(null);
  };

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="admin-page">
      <header className="admin-topbar">
         <div className="mh-brand">
                                    <img src={logo} alt="Delta SA" className="brand-logo" />
                                    <span className="brand-divider" />
          <span className="admin-brand-suffix">GMAO</span>
        </div>

        <button className="admin-back" onClick={onBack}>← Retour</button>

        <div className="admin-user">
          <div className="admin-divider-vert" />
          <button className="admin-logout" onClick={onLogout}>Déconnexion</button>
        </div>
      </header>

      <main className="admin-content">
        <p className="admin-eyebrow">Espace administrateur</p>
        <h1 className="admin-title">Gestion des camions</h1>

        <div className="admin-table-panel">
          <div className="admin-table-head">
            <h2 className="admin-table-title">Camions ({filtered.length})</h2>
            <div className="admin-table-actions">
              <input
                className="admin-search"
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="admin-btn-add" onClick={openAdd}>
                + Ajouter un camion
              </button>
            </div>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Immatriculation</th>
                <th>Modèle</th>
                <th>État</th>
                <th>Chauffeurs rattachés</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="admin-table-name">{c.immatriculation}</td>
                  <td>{c.modele}</td>
                  <td>
                    <span className={`admin-etat-badge ${ETAT_CLASS[c.etat] || ""}`}>
                      {ETATS.find((e) => e.value === c.etat)?.label || c.etat}
                    </span>
                  </td>
                  <td>
                    {c.chauffeurs.length > 0 ? (
                      <div className="admin-chauffeurs-tags">
                        {c.chauffeurs.map((id) => (
                          <span key={id} className="admin-chauffeur-tag">
                            {getChauffeurNom(id)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: "#b0b5c0", fontSize: "13px" }}>
                        Aucun chauffeur rattaché
                      </span>
                    )}
                  </td>
                  <td>
                    <button className="admin-btn-edit" onClick={() => openEdit(c)}>
                      Modifier
                    </button>
                    <button className="admin-btn-delete" onClick={() => setConfirmDelete(c)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "#8a90a0", padding: "32px" }}>
                    Aucun camion trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL AJOUT / MODIFICATION */}
      {modal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2 className="admin-modal-title">
              {modal === "add" ? "Ajouter un camion" : "Modifier le camion"}
            </h2>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Immatriculation</label>
                <input
                  value={form.immatriculation}
                  onChange={(e) => updateForm("immatriculation", e.target.value)}
                  placeholder="DK-1234-AB"
                />
              </div>
              <div className="admin-field">
                <label>Modèle</label>
                <input
                  value={form.modele}
                  onChange={(e) => updateForm("modele", e.target.value)}
                  placeholder="Mercedes Actros"
                />
              </div>
              <div className="admin-field span2">
                <label>État</label>
                <select
                  value={form.etat}
                  onChange={(e) => updateForm("etat", e.target.value)}
                >
                  {ETATS.map((e) => (
                    <option key={e.value} value={e.value}>{e.label}</option>
                  ))}
                </select>
              </div>

              <div className="admin-field span2">
                <label>
                  Chauffeurs rattachés{" "}
                  <span style={{ color: "#8a90a0", fontWeight: 400 }}>
                    (maximum 2 — {form.chauffeurs.length}/2 sélectionné{form.chauffeurs.length > 1 ? "s" : ""})
                  </span>
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                  {allChauffeurs.map((ch) => {
                    const selected = form.chauffeurs.includes(ch.id);
                    const disabled = !selected && form.chauffeurs.length >= 2;
                    return (
                      <label
                        key={ch.id}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: selected ? "1px solid #1d6fd9" : "1px solid #e2e8f3",
                          background: selected ? "#eef3fb" : "#f9fbfe",
                          cursor: disabled ? "not-allowed" : "pointer",
                          opacity: disabled ? 0.5 : 1,
                          fontSize: "14px",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          disabled={disabled}
                          onChange={() => toggleChauffeur(ch.id)}
                        />
                        {ch.nom}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn-cancel" onClick={() => setModal(null)}>Annuler</button>
              <button className="admin-btn-save" onClick={handleSave}>
                {modal === "add" ? "Créer le camion" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMATION SUPPRESSION */}
      {confirmDelete && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2 className="admin-modal-title">Confirmer la suppression</h2>
            <p style={{ color: "#3a4150", marginBottom: "28px", fontSize: "15px" }}>
              Voulez-vous vraiment supprimer le camion{" "}
              <strong>{confirmDelete.immatriculation}</strong> ?
              Cette action est irréversible.
            </p>
            <div className="admin-modal-footer">
              <button className="admin-btn-cancel" onClick={() => setConfirmDelete(null)}>Annuler</button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                style={{ background: "#b3372f", color: "white", border: "none", fontSize: "14px", fontWeight: 700, padding: "11px 22px", borderRadius: "9px", cursor: "pointer" }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
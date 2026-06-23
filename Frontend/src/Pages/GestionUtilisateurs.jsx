import React, { useState } from "react";
import "../style/Admin.css";
import logo from "../assets/logo.png";

const ROLES = [
  { value: "chauffeur",    label: "Chauffeur" },
  { value: "mecanicien",  label: "Mécanicien" },
  { value: "backoffice",  label: "Back Office" },
  { value: "responsable", label: "Responsable de maintenance" },
  { value: "admin",       label: "Administrateur" },
];

const ROLE_CLASS = {
  chauffeur:    "admin-role-chauffeur",
  mecanicien:   "admin-role-mecanicien",
  backoffice:   "admin-role-backoffice",
  responsable:  "admin-role-responsable",
  admin:        "admin-role-admin",
};

const EXEMPLE_UTILISATEURS = [
  { id: 1, nom: "Diallo",   prenom: "Mamadou",  login: "m.diallo",   role: "chauffeur",    email: "m.diallo@deltasa.sn" },
  { id: 2, nom: "Ndiaye",   prenom: "Fatou",    login: "f.ndiaye",   role: "mecanicien",   email: "f.ndiaye@deltasa.sn" },
  { id: 3, nom: "Sow",      prenom: "Ibrahima", login: "i.sow",      role: "backoffice",   email: "i.sow@deltasa.sn" },
  { id: 4, nom: "Kane",     prenom: "Awa",      login: "a.kane",     role: "responsable",  email: "a.kane@deltasa.sn" },
  { id: 5, nom: "Ba",       prenom: "Ousmane",  login: "o.ba",       role: "chauffeur",    email: "o.ba@deltasa.sn" },
  { id: 6, nom: "Fall",     prenom: "Aissatou", login: "a.fall",     role: "mecanicien",   email: "a.fall@deltasa.sn" },
];

const EMPTY_FORM = {
  nom: "", prenom: "", login: "", email: "", motDePasse: "", role: "",
};

export default function GestionUtilisateurs({
  utilisateurs = null,
  onBack = () => {},
  onLogout = () => {},
  onSave = () => {},
  onDelete = () => {},
}) {
  const [data, setData] = useState(utilisateurs || EXEMPLE_UTILISATEURS);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = data.filter((u) => {
    const matchSearch = `${u.nom} ${u.prenom} ${u.login} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchRole = filterRole === "" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setModal("add");
  };

  const openEdit = (u) => {
    setForm({ nom: u.nom, prenom: u.prenom, login: u.login, email: u.email, motDePasse: "", role: u.role });
    setEditId(u.id);
    setModal("edit");
  };

  const handleSave = () => {
    if (modal === "add") {
      const newUser = { ...form, id: Date.now() };
      setData((prev) => [...prev, newUser]);
      onSave(newUser);
    } else {
      setData((prev) =>
        prev.map((u) => (u.id === editId ? { ...u, ...form } : u))
      );
      onSave({ ...form, id: editId });
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((u) => u.id !== id));
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
        <h1 className="admin-title">Gestion des utilisateurs</h1>

        <div className="admin-table-panel">
          <div className="admin-table-head">
            <h2 className="admin-table-title">
              Utilisateurs ({filtered.length})
            </h2>
            <div className="admin-table-actions">
              <input
                className="admin-search"
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="admin-btn-add" onClick={openAdd}>
                + Ajouter un utilisateur
              </button>
            </div>
          </div>

          {/* FILTRES PAR RÔLE */}
          <div className="admin-role-filters">
            <button
              className={`admin-role-filter-btn ${filterRole === "" ? "is-active" : ""}`}
              onClick={() => setFilterRole("")}
            >
              Tous
            </button>
            {ROLES.map((r) => (
              <button
                key={r.value}
                className={`admin-role-filter-btn ${filterRole === r.value ? "is-active" : ""}`}
                onClick={() => setFilterRole(r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Login</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td className="admin-table-name">{u.prenom} {u.nom}</td>
                  <td>{u.login}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`admin-role-badge ${ROLE_CLASS[u.role] || ""}`}>
                      {ROLES.find((r) => r.value === u.role)?.label || u.role}
                    </span>
                  </td>
                  <td>
                    <button className="admin-btn-edit" onClick={() => openEdit(u)}>
                      Modifier
                    </button>
                    <button className="admin-btn-delete" onClick={() => setConfirmDelete(u)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "#8a90a0", padding: "32px" }}>
                    Aucun utilisateur trouvé.
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
              {modal === "add" ? "Ajouter un utilisateur" : "Modifier l'utilisateur"}
            </h2>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Nom</label>
                <input
                  value={form.nom}
                  onChange={(e) => updateForm("nom", e.target.value)}
                  placeholder="Diallo"
                />
              </div>
              <div className="admin-field">
                <label>Prénom</label>
                <input
                  value={form.prenom}
                  onChange={(e) => updateForm("prenom", e.target.value)}
                  placeholder="Mamadou"
                />
              </div>
              <div className="admin-field">
                <label>Login</label>
                <input
                  value={form.login}
                  onChange={(e) => updateForm("login", e.target.value)}
                  placeholder="m.diallo"
                />
              </div>
              <div className="admin-field">
                <label>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="m.diallo@deltasa.sn"
                />
              </div>
              <div className="admin-field admin-field-span2">
                <label>
                  {modal === "edit"
                    ? "Nouveau mot de passe (laisser vide pour ne pas changer)"
                    : "Mot de passe"}
                </label>
                <input
                  type="password"
                  value={form.motDePasse}
                  onChange={(e) => updateForm("motDePasse", e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div className="admin-field admin-field-span2">
                <label>Rôle</label>
                <select
                  value={form.role}
                  onChange={(e) => updateForm("role", e.target.value)}
                >
                  <option value="">Sélectionner un rôle</option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn-cancel" onClick={() => setModal(null)}>
                Annuler
              </button>
              <button className="admin-btn-save" onClick={handleSave}>
                {modal === "add" ? "Créer l'utilisateur" : "Enregistrer"}
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
              Voulez-vous vraiment supprimer le compte de{" "}
              <strong>{confirmDelete.prenom} {confirmDelete.nom}</strong> ?
              Cette action est irréversible.
            </p>
            <div className="admin-modal-footer">
              <button className="admin-btn-cancel" onClick={() => setConfirmDelete(null)}>
                Annuler
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                style={{
                  background: "#b3372f", color: "white", border: "none",
                  fontSize: "14px", fontWeight: 700, padding: "11px 22px",
                  borderRadius: "9px", cursor: "pointer"
                }}
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
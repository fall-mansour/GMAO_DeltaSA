// Frontend/src/pages/GestionUtilisateurs.jsx
import { useState, useEffect } from "react"; // Ajout de useEffect pour charger les données
import { useNavigate } from "react-router-dom";
import "../style/Admin.css";
import logo from "../assets/logo.png";

const ROLES = [
  { value: "chauffeur", label: "Chauffeur" },
  { value: "mecanicien", label: "Mécanicien" },
  { value: "backoffice", label: "Back Office" },
  { value: "responsable", label: "Responsable de maintenance" },
  { value: "admin", label: "Administrateur" },
];

const ROLE_CLASS = {
  chauffeur: "admin-role-chauffeur",
  mecanicien: "admin-role-mecanicien",
  backoffice: "admin-role-backoffice",
  responsable: "admin-role-responsable",
  admin: "admin-role-admin",
};

const EMPTY_FORM = {
  nom: "",
  prenom: "",
  login: "",
  email: "",
  motDePasse: "",
  role: "",
};

// URL de base de ton API de traitement
const API_URL = "http://127.0.0.1:5000/api/admin/utilisateurs";

export default function GestionUtilisateurs() {
  const navigate = useNavigate();

  // Initialisation des états dynamiques (plus de variables fictives)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // 1. CHARGEMENT INITIAL : Récupération des données depuis le contrôleur
  const loadUtilisateurs = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (response.ok) {
        const users = await response.json();
        setData(users); // Le contrôleur exclut déjà automatiquement le compte 'root'
      } else {
        console.error("Erreur lors de la récupération des données backend.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    } finally {
      setLoading(false);
    }
  };

  // Frontend/src/pages/GestionUtilisateurs.jsx

  // ... (le reste de ton code reste identique)

  useEffect(() => {
    let isMounted = true; // Sécurité pour éviter les fuites de mémoire si le composant est démonté rapidement

    const executeLoad = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (response.ok && isMounted) {
          const users = await response.json();
          setData(users);
        } else {
          console.error("Erreur lors de la récupération des données backend.");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    executeLoad();

    return () => {
      isMounted = false; // Nettoyage de l'effet
    };
  }, []);

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  // Filtrage local basé sur la recherche et les filtres visuels
  const filtered = data.filter((u) => {
    const matchSearch =
      `${u.nom || ""} ${u.prenom || ""} ${u.login || ""} ${u.email || ""}`
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
    setForm({
      nom: u.nom,
      prenom: u.prenom,
      login: u.login,
      email: u.email,
      motDePasse: "", // Toujours vide par défaut lors d'une modification
      role: u.role,
    });
    setEditId(u.id);
    setModal("edit");
  };

  // 2. ENREGISTREMENT (AJOUT / MODIFICATION) VIA L'API
  const handleSave = async () => {
    try {
      const isEdit = modal === "edit";
      const url = isEdit ? `${API_URL}/${editId}` : API_URL;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: form.nom,
          prenom: form.prenom,
          login: form.login,
          email: form.email,
          motDePasse: form.motDePasse,
          role: form.role,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setModal(null);
        loadUtilisateurs(); // Rechargement propre de la liste mise à jour
      } else {
        alert(result.message || "Une erreur est survenue lors du traitement.");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec l'API :", error);
      alert("Impossible de joindre le serveur.");
    }
  };

  // 3. SUPPRESSION VIA L'API
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        setConfirmDelete(null);
        loadUtilisateurs(); // Rafraîchissement des données
      } else {
        alert(result.message || "Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Impossible de joindre le serveur.");
    }
  };

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div
      className="admin-page"
      style={{ minHeight: "100vh", overflowY: "auto" }}
    >
      <header className="admin-topbar">
        <div
          className="mh-brand"
          onClick={() => navigate("/admin")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Delta SA" className="brand-logo" />
          <span className="brand-divider" />
          <span className="admin-brand-suffix">GMAO</span>
        </div>

        <button
          className="admin-back"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        >
          ← Retour
        </button>

        <div className="admin-user">
          <div className="admin-divider-vert" />
          <button
            className="admin-logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="admin-content">
        <p className="admin-eyebrow">Espace administrateur</p>
        <h1 className="admin-title">Gestion des utilisateurs</h1>

        <div className="admin-table-panel">
          <div className="admin-table-head">
            <h2 className="admin-table-title">
              Utilisateurs ({loading ? "..." : filtered.length})
            </h2>
            <div className="admin-table-actions">
              <input
                className="admin-search"
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="admin-btn-add"
                onClick={openAdd}
                style={{ cursor: "pointer" }}
              >
                + Ajouter un utilisateur
              </button>
            </div>
          </div>

          <div className="admin-role-filters">
            <button
              className={`admin-role-filter-btn ${filterRole === "" ? "is-active" : ""}`}
              onClick={() => setFilterRole("")}
              style={{ cursor: "pointer" }}
            >
              Tous
            </button>
            {ROLES.map((r) => (
              <button
                key={r.value}
                className={`admin-role-filter-btn ${filterRole === r.value ? "is-active" : ""}`}
                onClick={() => setFilterRole(r.value)}
                style={{ cursor: "pointer" }}
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
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      color: "#8a90a0",
                    }}
                  >
                    Chargement des utilisateurs...
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id}>
                    <td className="admin-table-name">
                      {u.prenom} {u.nom}
                    </td>
                    <td>{u.login}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`admin-role-badge ${ROLE_CLASS[u.role] || ""}`}
                      >
                        {ROLES.find((r) => r.value === u.role)?.label || u.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="admin-btn-edit"
                        onClick={() => openEdit(u)}
                        style={{ cursor: "pointer" }}
                      >
                        Modifier
                      </button>
                      <button
                        className="admin-btn-delete"
                        onClick={() => setConfirmDelete(u)}
                        style={{ cursor: "pointer" }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      color: "#8a90a0",
                      padding: "32px",
                    }}
                  >
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
              {modal === "add"
                ? "Ajouter un utilisateur"
                : "Modifier l'utilisateur"}
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
                  disabled={modal === "edit"} // Verrouiller le login lors de la modification pour des raisons de cohérence de sécurité
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
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                className="admin-btn-cancel"
                onClick={() => setModal(null)}
                style={{ cursor: "pointer" }}
              >
                Annuler
              </button>
              <button
                className="admin-btn-save"
                onClick={handleSave}
                style={{ cursor: "pointer" }}
              >
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
            <p
              style={{
                color: "#3a4150",
                marginBottom: "28px",
                fontSize: "15px",
              }}
            >
              Voulez-vous vraiment supprimer le compte de{" "}
              <strong>
                {confirmDelete.prenom} {confirmDelete.nom}
              </strong>{" "}
              ? Cette action est irréversible.
            </p>
            <div className="admin-modal-footer">
              <button
                className="admin-btn-cancel"
                onClick={() => setConfirmDelete(null)}
                style={{ cursor: "pointer" }}
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                style={{
                  background: "#b3372f",
                  color: "white",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 700,
                  padding: "11px 22px",
                  borderRadius: "9px",
                  cursor: "pointer",
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

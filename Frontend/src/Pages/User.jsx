import { useState } from "react";
import "../style/user.css";

// Véhicules fictifs — à remplacer par un fetch API
const vehiculesDisponibles = [
  { id: 1, immatriculation: "DK-4521-AB", type: "Hydrocureur" },
  { id: 2, immatriculation: "DK-1234-CD", type: "Pompeur" },
  { id: 3, immatriculation: "DK-7890-EF", type: "Véhicule de terrain" },
  { id: 4, immatriculation: "DK-3344-GH", type: "Hydrocureur" },
];

const AjoutUser = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    statut: "",
    vehiculeId: "",
    mail: "",
    motDePasse: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const isChauffeur = formData.statut === "chauffeur";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // reset vehicule si on change de statut
      ...(name === "statut" && value !== "chauffeur" ? { vehiculeId: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nom, prenom, statut, vehiculeId, mail, motDePasse } = formData;

    if (!nom || !prenom || !statut || !mail || !motDePasse) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (isChauffeur && !vehiculeId) {
      alert("Veuillez rattacher un véhicule au chauffeur.");
      return;
    }

    console.log("Utilisateur créé :", formData);
    alert("Utilisateur enregistré avec succès !");
    setFormData({
      nom: "",
      prenom: "",
      statut: "",
      vehiculeId: "",
      mail: "",
      motDePasse: "",
    });
  };

  return (
    <div className="ajout-container">
      {/* ── GAUCHE : FORMULAIRE ── */}
      <div className="ajout-card">
        <div className="ajout-header">
          <img src="../assets/logo.png" alt="Delta SA" className="ajout-logo" />
          <div className="ajout-badge">Admin · Delta SA</div>
          <h2>Gestion utilisateur</h2>
          <p>
            Ajoutez un nouveau membre et définissez son rôle dans le système.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ajout-form">
          {/* Ligne Nom + Prénom */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">
                Nom <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ex: Fall"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="prenom">
                Prénom <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Ex: Mansour"
                  required
                />
              </div>
            </div>
          </div>

          {/* Statut */}
          <div className="form-group">
            <label htmlFor="statut">
              Statut / Rôle <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon">🏷️</span>
              <select
                id="statut"
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Sélectionnez un rôle...
                </option>
                <option value="chauffeur">Chauffeur</option>
                <option value="mecanicien">Mécanicien</option>
                <option value="responsable-maintenance">
                  Responsable Maintenance
                </option>
                <option value="responsable-backoffice">
                  Responsable Backoffice
                </option>
              </select>
            </div>
          </div>

          {/* Champ conditionnel : rattachement véhicule (chauffeur seulement) */}
          {isChauffeur && (
            <div className="form-group vehicule-field">
              <label htmlFor="vehiculeId">
                Véhicule rattaché <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🚛</span>
                <select
                  id="vehiculeId"
                  name="vehiculeId"
                  value={formData.vehiculeId}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>
                    Sélectionnez un véhicule...
                  </option>
                  {vehiculesDisponibles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.immatriculation} — {v.type}
                    </option>
                  ))}
                </select>
              </div>
              <span className="field-hint">
                Seuls les véhicules enregistrés dans le parc sont disponibles.
              </span>
            </div>
          )}

          {/* Mail */}
          <div className="form-group">
            <label htmlFor="mail">
              Adresse e-mail <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                id="mail"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                placeholder="Ex: mansour.fall@deltasa.sn"
                required
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <label htmlFor="motDePasse">
              Mot de passe <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                id="motDePasse"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleChange}
                placeholder="Minimum 8 caractères"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Afficher/masquer le mot de passe"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Créer l'utilisateur
          </button>
        </form>
      </div>

      {/* ── DROITE : IMAGE HERO ── */}
      <div className="ajout-hero"></div>
    </div>
  );
};

export default AjoutUser;

import { useState } from "react";
import "../style/Declaration.css"; // Ton CSS mis à jour

const Declaration = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    typeVehicule: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.typeVehicule ||
      !formData.description
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    console.log("Données de déclaration soumises :", formData);
    alert("Déclaration enregistrée avec succès !");
    setFormData({ nom: "", prenom: "", typeVehicule: "", description: "" });
  };

  return (
    <div className="declaration-container">
      {/* ── PARTIE GAUCHE : LE FORMULAIRE ── */}
      <div className="declaration-card">
        <div className="declaration-header">
          <h2>Déclaration de Panne</h2>
        </div>

        <form onSubmit={handleSubmit} className="declaration-form">
          <div className="form-group">
            <label htmlFor="nom">
              Nom du déclarant <span className="required">*</span>
            </label>
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

          <div className="form-group">
            <label htmlFor="prenom">
              Prénom du déclarant <span className="required">*</span>
            </label>
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

          <div className="form-group">
            <label htmlFor="typeVehicule">
              Type de véhicule <span className="required">*</span>
            </label>
            <select
              id="typeVehicule"
              name="typeVehicule"
              value={formData.typeVehicule}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Sélectionnez un type...
              </option>
              <option value="hydrocureurs">Hydrocureurs</option>
              <option value="bennes">Bennes</option>
              <option value="pompeurs">Pompeurs</option>
              <option value="vehicules de terrain">Véhicules de terrain</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description / Détails de la déclaration{" "}
              <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Spécifiez les détails (ex: immatriculation, état général, panne signalée...)"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Soumettre la déclaration
          </button>
        </form>
      </div>

      {/* ── PARTIE DROITE : L'IMAGE HERO VISUELLE ── */}
      <div className="declaration-hero"></div>
    </div>
  );
};

export default Declaration;

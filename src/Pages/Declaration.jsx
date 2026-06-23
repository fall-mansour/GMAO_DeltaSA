import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Declaration.css";

const DeclarationBackOffice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    immatriculation: "",
    nomChauffeur: "",
    prenomChauffeur: "",
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
      !formData.immatriculation ||
      !formData.nomChauffeur ||
      !formData.prenomChauffeur ||
      !formData.typeVehicule ||
      !formData.description
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    console.log("Déclaration Back-Office soumise :", formData);
    alert("Déclaration enregistrée avec succès !");
    setFormData({
      immatriculation: "",
      nomChauffeur: "",
      prenomChauffeur: "",
      typeVehicule: "",
      description: "",
    });
  };

  return (
    <div className="declaration-container">
      <div className="declaration-card">
        <div className="declaration-header">
          <button
            onClick={() => navigate("/Accueilbackoff")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1d4ed8",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "12px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            ← Retour
          </button>
          <h2>Déclaration de Panne</h2>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Déclaration effectuée par le Back-Office au nom du chauffeur
          </p>
        </div>

        <form onSubmit={handleSubmit} className="declaration-form">
          <div className="form-group">
            <label htmlFor="immatriculation">
              Immatriculation du véhicule <span className="required">*</span>
            </label>
            <input
              type="text"
              id="immatriculation"
              name="immatriculation"
              value={formData.immatriculation}
              onChange={handleChange}
              placeholder="Ex: DK-1234-AB"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nomChauffeur">
              Nom du chauffeur <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nomChauffeur"
              name="nomChauffeur"
              value={formData.nomChauffeur}
              onChange={handleChange}
              placeholder="Ex: Diallo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prenomChauffeur">
              Prénom du chauffeur <span className="required">*</span>
            </label>
            <input
              type="text"
              id="prenomChauffeur"
              name="prenomChauffeur"
              value={formData.prenomChauffeur}
              onChange={handleChange}
              placeholder="Ex: Moussa"
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
              Description / Détails de la panne{" "}
              <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Spécifiez les détails (état général, panne signalée...)"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Soumettre la déclaration
          </button>
        </form>
      </div>

      <div className="declaration-hero"></div>
    </div>
  );
};

export default DeclarationBackOffice;
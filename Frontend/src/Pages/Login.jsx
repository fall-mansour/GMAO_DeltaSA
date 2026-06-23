// Frontend/src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Login.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login.toLowerCase() === "root") {
      alert(
        "Accès refusé. Cet identifiant n'est pas autorisé à se connecter par cette interface.",
      );
      return;
    }
    if (login && password) {
      alert(`Connexion réussie pour l'utilisateur : ${login}`);
      navigate("/chauffeur");
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="login-container">
      {/* ── COLONNE GAUCHE : Formulaire ── */}
      <div className="login-left">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <center>
                <img
                  src="/src/assets/logo.png"
                  alt="Logo Delta SA"
                  className="logo-img"
                />
              </center>
              <p> Connexion 👤</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="login">Identifiant ou Email</label>
              <input
                type="text"
                id="login"
                placeholder="Ex: m.fall@deltasa.sn"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="form-input"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="btn-login">
              Se connecter
            </button>
          </form>
        </div>
      </div>

      {/* ── COLONNE DROITE : Image de fond ── */}
      <div className="login-right"></div>
    </div>
  );
};

export default Login;

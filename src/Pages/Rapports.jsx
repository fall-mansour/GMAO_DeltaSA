import { useState } from "react";
import { useNavigate } from "react-router-dom";

const rapports = [
  {
    id: 1,
    numVehicule: "DK-1234-A",
    chauffeur: "Mansour Fall",
    dateDeclaration: "2026-06-17",
    description: "Fuite de liquide hydraulique importante au niveau du bras articulé arrière gauche.",
    mecanicien: "Mamadou Ndiaye",
    dateIntervention: "2026-06-18",
    intervention: "Remplacement du joint hydraulique et vérification du circuit.",
    cout: "150000",
    statut: "Terminé",
  },
  {
    id: 2,
    numVehicule: "DK-8888-X",
    chauffeur: "Modou Diop",
    dateDeclaration: "2026-06-14",
    description: "Pression de freinage insuffisante signalée sur le circuit secondaire.",
    mecanicien: "Fatou Diop",
    dateIntervention: "2026-06-15",
    intervention: "Remplacement des plaquettes et purge du circuit de frein.",
    cout: "85000",
    statut: "Terminé",
  },
];

const vehicules = ["Tous", "DK-1234-A", "DK-8888-X"];

export default function Rapports() {
  const [activeNav, setActiveNav] = useState("Rapports");
  const [filtreVehicule, setFiltreVehicule] = useState("Tous");
  const [filtreDate, setFiltreDate] = useState("");
  const navigate = useNavigate();

  const navItems = ["Accueil", "Déclaration", "Historiques", "Rapports"];

  const rapportsFiltres = rapports.filter((r) => {
    const matchVehicule = filtreVehicule === "Tous" || r.numVehicule === filtreVehicule;
    const matchDate = filtreDate === "" || r.dateDeclaration === filtreDate;
    return matchVehicule && matchDate;
  });

  const handleNav = (item) => {
    setActiveNav(item);
    if (item === "Accueil") navigate("/Accueilbackoff");
    if (item === "Déclaration") navigate("/declaration-backoffice");
    if (item === "Historiques") navigate("/HistoBackoff");
    if (item === "Rapports") navigate("/Rapport");
  };

  const handleDownload = (r) => {
    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <style>
          @media print {
            @page { margin: 0; }
            body { padding: 40px; }
          }
          body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #0f172a; }
          .header { text-align: center; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #1d4ed8; font-size: 24px; margin: 0 0 6px; }
          .section-title { font-size: 14px; font-weight: 800; color: #1d4ed8; text-transform: uppercase; letter-spacing: 1px; margin: 24px 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
          .section { margin-bottom: 20px; }
          .label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .value { font-size: 15px; font-weight: 600; color: #0f172a; padding: 10px 14px; background: #f1f5f9; border-radius: 8px; }
          .badge { display: inline-block; background: #dcfce7; color: #16a34a; font-weight: 700; padding: 4px 12px; border-radius: 20px; font-size: 13px; }
          .footer { margin-top: 60px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DELTA SA — Rapport d'intervention complet</h1>
        </div>
        <div class="section-title">1. Déclaration</div>
        <div class="grid">
          <div class="section">
            <div class="label">Numéro de rapport</div>
            <div class="value">#${String(r.id).padStart(4, "0")}</div>
          </div>
          <div class="section">
            <div class="label">Date de déclaration</div>
            <div class="value">${r.dateDeclaration}</div>
          </div>
          <div class="section">
            <div class="label">Véhicule concerné</div>
            <div class="value">${r.numVehicule}</div>
          </div>
          <div class="section">
            <div class="label">Chauffeur</div>
            <div class="value">${r.chauffeur}</div>
          </div>
        </div>
        <div class="section">
          <div class="label">Description de la panne</div>
          <div class="value">${r.description}</div>
        </div>
        <div class="section-title">2. Intervention</div>
        <div class="grid">
          <div class="section">
            <div class="label">Mécanicien affecté</div>
            <div class="value">${r.mecanicien}</div>
          </div>
          <div class="section">
            <div class="label">Date d'intervention</div>
            <div class="value">${r.dateIntervention}</div>
          </div>
        </div>
        <div class="section">
          <div class="label">Travaux effectués</div>
          <div class="value">${r.intervention}</div>
        </div>
        <div class="section-title">3. Bilan</div>
        <div class="grid">
          <div class="section">
            <div class="label">Coût total (FCFA)</div>
            <div class="value">${Number(r.cout).toLocaleString("fr-FR")} FCFA</div>
          </div>
          <div class="section">
            <div class="label">Statut final</div>
            <div><span class="badge">✓ ${r.statut}</span></div>
          </div>
        </div>
        <div class="footer">Delta SA — GMAO · Rapport #${String(r.id).padStart(4, "0")} · ${r.dateDeclaration}</div>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    win.onload = () => {
      win.print();
      URL.revokeObjectURL(url);
    };
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <img src="/logo.jpeg" alt="Delta SA" style={styles.logo} />
        <div style={styles.navLinks}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNav(item)}
              style={{
                ...styles.navLink,
                ...(activeNav === item ? styles.navLinkActive : {}),
              }}
            >
              {item}
              {activeNav === item && <span style={styles.navUnderline} />}
            </button>
          ))}
        </div>
        <div style={styles.avatarWrapper}>
          <div style={styles.avatar}>BO</div>
          <button style={styles.btnDeconnexion} onClick={() => navigate("/login")}>
            Déconnexion
          </button>
        </div>
      </nav>

      {/* BOUTON RETOUR */}
      <div style={{ maxWidth: "1400px", margin: "20px auto 0", padding: "0 40px" }}>
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

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>📄 Rapports d'intervention</h1>
        <p style={styles.heroSubtitle}>
          Consultez et téléchargez les rapports complets : déclaration, intervention et bilan.
        </p>
      </div>

      <div style={styles.filtresWrapper}>
        <div style={styles.filtreGroup}>
          <label style={styles.filtreLabel}>Filtrer par véhicule</label>
          <select
            style={styles.select}
            value={filtreVehicule}
            onChange={(e) => setFiltreVehicule(e.target.value)}
          >
            {vehicules.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div style={styles.filtreGroup}>
          <label style={styles.filtreLabel}>Filtrer par date</label>
          <input
            type="date"
            style={styles.input}
            value={filtreDate}
            onChange={(e) => setFiltreDate(e.target.value)}
          />
        </div>
        <button
          style={styles.btnReset}
          onClick={() => { setFiltreVehicule("Tous"); setFiltreDate(""); }}
        >
          Réinitialiser
        </button>
      </div>

      <div style={styles.compteurWrapper}>
        <span style={styles.compteur}>{rapportsFiltres.length} rapport(s) trouvé(s)</span>
      </div>

      <div style={styles.tableWrapper}>
        {rapportsFiltres.length === 0 ? (
          <p style={styles.empty}>Aucun rapport trouvé pour ces filtres.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Véhicule</th>
                <th style={styles.th}>Chauffeur</th>
                <th style={styles.th}>Date déclaration</th>
                <th style={styles.th}>Mécanicien</th>
                <th style={styles.th}>Coût (FCFA)</th>
                <th style={styles.th}>Statut</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rapportsFiltres.map((r, i) => (
                <tr key={r.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={styles.td}>{r.id}</td>
                  <td style={styles.td}>{r.numVehicule}</td>
                  <td style={styles.td}>{r.chauffeur}</td>
                  <td style={styles.td}>{r.dateDeclaration}</td>
                  <td style={styles.td}>{r.mecanicien}</td>
                  <td style={styles.td}>{Number(r.cout).toLocaleString("fr-FR")}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{r.statut}</span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.btnDownload} onClick={() => handleDownload(r)}>
                      ⬇ Télécharger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    backgroundColor: "#EEF3FB",
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: "0 40px",
    height: "64px",
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
    zIndex: 100,
    width: "100%",
    boxSizing: "border-box",
  },
  logo: { height: "80px", width: "auto", objectFit: "contain" },
  navLinks: { display: "flex", gap: "8px" },
  navLink: {
    position: "relative",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    color: "#64748b",
    padding: "8px 14px",
    borderRadius: "6px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  navLinkActive: { color: "#1d4ed8", fontWeight: "600" },
  navUnderline: {
    position: "absolute",
    bottom: "-1px",
    left: "14px",
    right: "14px",
    height: "2px",
    backgroundColor: "#1d4ed8",
    borderRadius: "2px",
  },
  avatarWrapper: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
  },
  btnDeconnexion: {
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
  hero: { textAlign: "center", padding: "24px 24px 20px" },
  heroTitle: { fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: "0 0 10px" },
  heroSubtitle: { fontSize: "15px", color: "#64748b", margin: 0 },
  filtresWrapper: {
    display: "flex",
    alignItems: "flex-end",
    gap: "20px",
    maxWidth: "1400px",
    margin: "0 auto 16px",
    padding: "0 40px",
    flexWrap: "wrap",
  },
  filtreGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  filtreLabel: { fontSize: "13px", fontWeight: "600", color: "#475569" },
  select: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    cursor: "pointer",
    minWidth: "180px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    minWidth: "160px",
  },
  btnReset: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#1d4ed8",
    border: "2px solid #1d4ed8",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
  compteurWrapper: { maxWidth: "1400px", margin: "0 auto 12px", padding: "0 40px" },
  compteur: { fontSize: "13px", color: "#64748b", fontWeight: "500" },
  tableWrapper: { maxWidth: "1400px", margin: "0 auto 48px", padding: "0 40px", overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    tableLayout: "fixed",
  },
  th: {
    padding: "14px 16px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "700",
    color: "#475569",
    backgroundColor: "#f1f5f9",
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#0f172a",
    borderBottom: "1px solid #f1f5f9",
    verticalAlign: "middle",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  trEven: { backgroundColor: "#ffffff" },
  trOdd: { backgroundColor: "#f8fafc" },
  badge: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },
  btnDownload: {
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "7px 14px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
    whiteSpace: "nowrap",
  },
  empty: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "15px",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
};
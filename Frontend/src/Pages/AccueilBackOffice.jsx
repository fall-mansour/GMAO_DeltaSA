import { useState } from "react";

const actions = [
  {
    icon: "✅",
    title: "Valider les déclarations",
    description: "Consultez les demandes soumises par les chauffeurs et validez les interventions.",
    buttonLabel: "VOIR LES DEMANDES",
    filled: true,
  },
  {
    icon: "📋",
    title: "Historique des pannes",
    description: "Accédez à l'historique complet des pannes : traitées, en cours, avec dates et actions menées.",
    buttonLabel: "VOIR LE LISTING",
    filled: false,
  },
  {
    icon: "📊",
    title: "Dashboard KPI",
    description: "Visualisez les indicateurs clés : nombre de véhicules, coûts globaux et état des interventions.",
    buttonLabel: "OUVRIR LE DASHBOARD",
    filled: false,
  },
];

export default function AccueilBackOffice() {
  const [activeNav, setActiveNav] = useState("Accueil");
  const navItems = ["Accueil", "Historiques", "Validation", "Rapports"];

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <img src="/logo.jpeg" alt="Delta SA" style={styles.logo} />
        <div style={styles.navLinks}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
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
          <span style={styles.avatarName}>BackOffice</span>
        </div>
      </nav>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Bonjour, BackOffice !</h1>
        <p style={styles.heroSubtitle}>
          Espace Back-Office · Gérez, validez et suivez toutes les opérations de maintenance.
        </p>
      </div>

      {/* ACTION CARDS */}
      <div style={styles.actionGrid}>
        <div style={styles.actionCard}>
          <span style={styles.actionIcon}>{actions[0].icon}</span>
          <h2 style={styles.actionTitle}>{actions[0].title}</h2>
          <p style={styles.actionDesc}>{actions[0].description}</p>
          <button style={styles.btnFilled}>{actions[0].buttonLabel}</button>
        </div>
        <div style={styles.actionCard}>
          <span style={styles.actionIcon}>{actions[1].icon}</span>
          <h2 style={styles.actionTitle}>{actions[1].title}</h2>
          <p style={styles.actionDesc}>{actions[1].description}</p>
          <button style={styles.btnOutline}>{actions[1].buttonLabel}</button>
        </div>
        <div style={{ ...styles.actionCard, ...styles.cardCentered }}>
          <span style={styles.actionIcon}>{actions[2].icon}</span>
          <h2 style={styles.actionTitle}>{actions[2].title}</h2>
          <p style={styles.actionDesc}>{actions[2].description}</p>
          <button style={styles.btnOutline}>{actions[2].buttonLabel}</button>
        </div>
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
  logo: {
  height: "80px",
  width: "auto",
  objectFit: "contain",
  },
  navLinks: {
    display: "flex",
    gap: "8px",
  },
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
  navLinkActive: {
    color: "#1d4ed8",
    fontWeight: "600",
  },
  navUnderline: {
    position: "absolute",
    bottom: "-1px",
    left: "14px",
    right: "14px",
    height: "2px",
    backgroundColor: "#1d4ed8",
    borderRadius: "2px",
  },
  avatarWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
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
  avatarName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
  },
  hero: {
    textAlign: "center",
    padding: "48px 24px 24px",
  },
  heroTitle: {
    fontSize: "38px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 10px",
  },
  heroSubtitle: {
    fontSize: "16px",
    color: "#64748b",
    margin: 0,
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    maxWidth: "1200px",
    width: "100%",
    margin: "32px auto 48px",
    padding: "0 40px",
    boxSizing: "border-box",
  },
  actionCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  cardCentered: {
    gridColumn: "1 / -1",
    maxWidth: "560px",
    width: "100%",
    margin: "0 auto",
  },
  actionIcon: {
    fontSize: "36px",
  },
  actionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  actionDesc: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.6",
    margin: 0,
  },
  btnFilled: {
    marginTop: "8px",
    padding: "13px 28px",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "0.5px",
    cursor: "pointer",
    width: "100%",
  },
  btnOutline: {
    marginTop: "8px",
    padding: "13px 28px",
    backgroundColor: "transparent",
    color: "#1d4ed8",
    border: "2px solid #1d4ed8",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "0.5px",
    cursor: "pointer",
    width: "100%",
  },
};
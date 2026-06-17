import { useState } from "react";

const stats = [
  { label: "Véhicules concernés", value: 12, icon: "🚛", color: "#1d6fd8" },
  { label: "Pannes en attente", value: 5, icon: "⏳", color: "#e6a817" },
  { label: "En cours", value: 4, icon: "🔧", color: "#2563eb" },
  { label: "Coût total (FCFA)", value: "2 450 000", icon: "💰", color: "#16a34a" },
];

const actions = [
  {
    icon: "✅",
    title: "Valider les pannes",
    description:
      "Consultez les demandes soumises par les chauffeurs et validez ou rejetez les interventions.",
    buttonLabel: "VOIR LES DEMANDES",
    filled: true,
  },
  {
    icon: "📋",
    title: "Listing des pannes",
    description:
      "Accédez à l'historique complet des pannes : traitées, en cours, avec dates et actions menées.",
    buttonLabel: "VOIR LE LISTING",
    filled: false,
  },
  {
    icon: "📊",
    title: "Dashboard KPI",
    description:
      "Visualisez les indicateurs clés : nombre de véhicules, coûts globaux et état des interventions.",
    buttonLabel: "OUVRIR LE DASHBOARD",
    filled: false,
  },
  {
    icon: "👥",
    title: "Gestion des utilisateurs",
    description:
      "Gérez les comptes chauffeurs, chargés de maintenance et planificateurs de votre équipe.",
    buttonLabel: "GÉRER LES COMPTES",
    filled: false,
  },
];

export default function BackOfficeHome() {
  const [activeNav, setActiveNav] = useState("Accueil");

  const navItems = ["Accueil", "Pannes", "Validation", "Rapports", "Utilisateurs"];

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <span style={styles.logo}>Delta SA</span>
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
          <div style={styles.avatar}>AD</div>
          <span style={styles.avatarName}>Admin</span>
        </div>
      </nav>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Bonjour, Administrateur !</h1>
        <p style={styles.heroSubtitle}>
          Espace Back-Office · Gérez, validez et suivez toutes les opérations de maintenance.
        </p>
      </div>

      {/* KPI CARDS */}
      <div style={styles.kpiGrid}>
        {stats.map((s) => (
          <div key={s.label} style={styles.kpiCard}>
            <span style={styles.kpiIcon}>{s.icon}</span>
            <span style={{ ...styles.kpiValue, color: s.color }}>{s.value}</span>
            <span style={styles.kpiLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ACTION CARDS */}
      <div style={styles.actionGrid}>
        {actions.map((a) => (
          <div key={a.title} style={styles.actionCard}>
            <span style={styles.actionIcon}>{a.icon}</span>
            <h2 style={styles.actionTitle}>{a.title}</h2>
            <p style={styles.actionDesc}>{a.description}</p>
            <button
              style={a.filled ? styles.btnFilled : styles.btnOutline}
            >
              {a.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#EEF3FB",
    fontFamily: "'Segoe UI', sans-serif",
  },

  /* Navbar */
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
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1d4ed8",
    letterSpacing: "-0.5px",
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

  /* Hero */
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

  /* KPI */
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    maxWidth: "960px",
    margin: "24px auto 0",
    padding: "0 24px",
  },
  kpiCard: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  kpiIcon: {
    fontSize: "24px",
  },
  kpiValue: {
    fontSize: "26px",
    fontWeight: "700",
  },
  kpiLabel: {
    fontSize: "12px",
    color: "#64748b",
    textAlign: "center",
  },

  /* Action cards */
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    maxWidth: "960px",
    margin: "32px auto 48px",
    padding: "0 24px",
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

import React from "react";
import logo from "../assets/logo.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import "../style/DashboardPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

/**
 * Page Tableau de bord - Responsable de maintenance
 * Application GMAO - Delta SA
 *
 * KPI affiches :
 * - Nombre de camions / nombre de mecaniciens -> chiffres cles (comptages simples)
 * - Taux de panne par mois -> barres (comparaison dans le temps)
 * - MTTR (temps moyen de reparation) par mois -> barres
 * - Disponibilite de la flotte -> anneau (repartition disponible / immobilise)
 *
 * Donnees d'exemple affichees tant que le backend n'est pas branche.
 * Brancher en passant la prop `data` au format documente ci-dessous.
 */

const MOIS_12 = [
  "Jan", "Fev", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Aout", "Sept", "Oct", "Nov", "Dec",
];

const EXEMPLE_DATA = {
  nbCamions: 24,
  nbMecaniciens: 12,
  tauxPanneParMois: {
    labels: MOIS_12,
    valeurs: [9, 12, 8, 14, 11, 14, 13, 10, 12, 15, 11, 13],
  },
  mttrParMois: {
    labels: MOIS_12,
    valeurs: [18, 22, 16, 20, 19, 21, 20, 17, 19, 23, 18, 20],
  },
  coutParMois: {
    labels: MOIS_12,
    valeurs: [
      820000, 950000, 610000, 1100000, 875000, 1240000,
      990000, 730000, 860000, 1320000, 905000, 1180000,
    ],
  },
  disponibilite: {
    disponibles: 16,
    immobilises: 8,
  },
};

export default function DashboardPage({ data = null, onBack = () => {} }) {
  const d = data || EXEMPLE_DATA;

  const tauxPanneConfig = {
    labels: d.tauxPanneParMois.labels,
    datasets: [
      {
        label: "Taux de panne (%)",
        data: d.tauxPanneParMois.valeurs,
        backgroundColor: "#1d6fd9",
        borderRadius: 6,
        maxBarThickness: 38,
      },
    ],
  };

  const mttrConfig = {
    labels: d.mttrParMois.labels,
    datasets: [
      {
        label: "MTTR (heures)",
        data: d.mttrParMois.valeurs,
        backgroundColor: "#5b9bf0",
        borderRadius: 6,
        maxBarThickness: 38,
      },
    ],
  };

  const coutConfig = {
    labels: d.coutParMois.labels,
    datasets: [
      {
        label: "Coût total (FCFA)",
        data: d.coutParMois.valeurs,
        backgroundColor: "#1d4ed8",
        borderRadius: 6,
        maxBarThickness: 32,
      },
    ],
  };

  const coutMoisEnCours =
    d.coutParMois.valeurs[d.coutParMois.valeurs.length - 1];

  const coutAnnuelTotal = d.coutParMois.valeurs.reduce((a, b) => a + b, 0);

  const formatFCFA = (valeur) => `${valeur.toLocaleString("fr-FR")} FCFA`;

  const disponibiliteConfig = {
    labels: ["Disponibles", "Immobilisés"],
    datasets: [
      {
        data: [d.disponibilite.disponibles, d.disponibilite.immobilises],
        backgroundColor: ["#1d6fd9", "#fdeebd"],
        borderWidth: 0,
      },
    ],
  };

  const tauxDisponibilite = Math.round(
    (d.disponibilite.disponibles /
      (d.disponibilite.disponibles + d.disponibilite.immobilises)) *
      100
  );

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: "#eef1f6" } },
      x: { grid: { display: false } },
    },
  };

  const coutBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => formatFCFA(context.parsed.y),
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#eef1f6" },
        ticks: {
          callback: (value) => `${(value / 1000).toLocaleString("fr-FR")}k`,
        },
      },
      x: { grid: { display: false } },
    },
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12, font: { size: 13 } },
      },
    },
  };

  return (
    <div className="db-page">
      <header className="db-topbar">
        <div className="mh-brand">
            <img src={logo} alt="Delta SA" className="brand-logo" />
         <span className="brand-divider" />
          <span className="db-brand-suffix">GMAO</span>
        </div>

        <button className="db-back" onClick={onBack}>
          ← Retour à l'accueil
        </button>
      </header>

      <main className="db-content">
        <div className="db-heading-row">
          <p className="db-eyebrow">Espace responsable de maintenance</p>
          <h1 className="db-title">Tableau de bord</h1>
        </div>

        {/* ---------- CHIFFRES CLES ---------- */}
        <section className="db-counts">
          <div className="db-count-card">
            <span className="db-count-label">Camions</span>
            <span className="db-count-value">{d.nbCamions}</span>
            <span className="db-count-sub">Flotte enregistrée</span>
          </div>

          <div className="db-count-card">
            <span className="db-count-label">Mécaniciens</span>
            <span className="db-count-value">{d.nbMecaniciens}</span>
            <span className="db-count-sub">Équipe de maintenance</span>
          </div>

          <div className="db-count-card">
            <span className="db-count-label">Disponibilité</span>
            <span className="db-count-value">{tauxDisponibilite}%</span>
            <span className="db-count-sub">
              {d.disponibilite.disponibles} camions disponibles
            </span>
          </div>

          <div className="db-count-card">
            <span className="db-count-label">Taux de panne actuel</span>
            <span className="db-count-value">
              {d.tauxPanneParMois.valeurs[
                d.tauxPanneParMois.valeurs.length - 1
              ]}
              %
            </span>
            <span className="db-count-sub">Mois en cours</span>
          </div>

          <div className="db-count-card">
            <span className="db-count-label">Coût du mois</span>
            <span className="db-count-value">
              {formatFCFA(coutMoisEnCours)}
            </span>
            <span className="db-count-sub">
              {formatFCFA(coutAnnuelTotal)} sur l'année
            </span>
          </div>
        </section>

        {/* ---------- GRAPHIQUES ---------- */}
        <section className="db-charts-grid">
          <div className="db-chart-card">
            <div className="db-chart-head">
              <h2 className="db-chart-title">Taux de panne par mois</h2>
              <p className="db-chart-sub">
                Pourcentage de camions ayant déclaré une panne chaque mois
              </p>
            </div>
            <div className="db-chart-body">
              <Bar data={tauxPanneConfig} options={barOptions} />
            </div>
          </div>

          <div className="db-chart-card">
            <div className="db-chart-head">
              <h2 className="db-chart-title">Disponibilité de la flotte</h2>
              <p className="db-chart-sub">État actuel des camions</p>
            </div>
            <div className="db-chart-body donut">
              <Doughnut data={disponibiliteConfig} options={donutOptions} />
            </div>
          </div>

          <div className="db-chart-card full">
            <div className="db-chart-head">
              <h2 className="db-chart-title">
                Temps moyen de réparation (MTTR)
              </h2>
              <p className="db-chart-sub">
                Durée moyenne, en heures, entre l'affectation d'un mécanicien
                et la résolution de la panne
              </p>
            </div>
            <div className="db-chart-body">
              <Bar data={mttrConfig} options={barOptions} />
            </div>
          </div>

          <div className="db-chart-card full">
            <div className="db-chart-head">
              <h2 className="db-chart-title">
                Coût total des réparations par mois
              </h2>
              <p className="db-chart-sub">
                Somme des coûts d'intervention enregistrés chaque mois sur
                l'année
              </p>
            </div>
            <div className="db-chart-body">
              <Bar data={coutConfig} options={coutBarOptions} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
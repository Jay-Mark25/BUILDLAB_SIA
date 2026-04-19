import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useBuild } from "../../contexts/BuildContext";
import "./Summary.css";

const buildSteps = [
  { key: "cpu", label: "CPU (Processor)", icon: "⚙️" },
  { key: "motherboard", label: "Motherboard", icon: "💻" },
  { key: "ram", label: "RAM (Memory)", icon: "💾" },
  { key: "storage", label: "Storage", icon: "🗄️" },
  { key: "gpu", label: "GPU (Graphics Card)", icon: "🎮" },
  { key: "psu", label: "Power Supply (PSU)", icon: "⚡" },
  { key: "case", label: "PC Case", icon: "🧱" },
];

const parsePrice = (price = "") => {
  const cleaned = price.toString().replace(/[₱php,]/gi, "").trim();
  return parseFloat(cleaned) || 0;
};

const parseCpuWatts = (cpu) => {
  if (!cpu) return 50;
  const match = cpu.tags?.find((tag) => /\d+W/.test(tag));
  return match ? parseInt(match.replace(/[^0-9]/g, ""), 10) : 50;
};

export default function Summary() {
  const { currentBuild, getSelectedComponents, resetBuild } = useBuild();
  const selectedComponents = getSelectedComponents();

  const selectedCount = selectedComponents.length;
  const totalCost = useMemo(() => {
    return selectedComponents.reduce((sum, component) => sum + parsePrice(component.price), 0);
  }, [selectedComponents]);

  const estimatedWatts = useMemo(() => {
    const cpuWatts = parseCpuWatts(currentBuild.cpu);
    const gpuWatts = currentBuild.gpu?.power_required || 0;
    const motherboardWatts = currentBuild.motherboard ? 40 : 0;
    const ramWatts = currentBuild.ram ? 10 : 0;
    const storageWatts = currentBuild.storage ? 10 : 0;
    return cpuWatts + gpuWatts + motherboardWatts + ramWatts + storageWatts;
  }, [currentBuild]);

  const progressPercent = Math.round((selectedCount / buildSteps.length) * 100);

  return (
    <div className="summary-page">
      <div className="summary-hero">
        <span className="summary-badge">= BUILD SUMMARY</span>
        <h1>Your PC Build</h1>
        <p>{selectedCount} of {buildSteps.length} components selected. Keep going!</p>
      </div>

      <div className="summary-grid">
        <div className="summary-card summary-list-card">
          <div className="summary-card-header">
            <div>
              <h2>Selected Components</h2>
              <p>{selectedCount}/{buildSteps.length} Complete</p>
            </div>
          </div>

          <div className="component-list">
            {buildSteps.map((step) => {
              const selected = currentBuild[step.key];
              return (
                <div key={step.key} className="component-row">
                  <div className="component-meta">
                    <span className="component-icon">{step.icon}</span>
                    <div>
                      <p className="component-label">{step.label}</p>
                      <p className="component-value">
                        {selected ? selected.name : "Not selected yet"}
                      </p>
                    </div>
                  </div>
                  <span className="component-status">{selected ? "✔" : "○"}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="summary-side">
          <div className="summary-card summary-cost-card">
            <p className="card-label">Estimated Total Cost</p>
            <h2>₱{totalCost.toLocaleString()}</h2>
            <p className="card-copy">Based on current market prices</p>
          </div>

          <div className="summary-card summary-detail-card">
            <p className="card-label">Power Consumption</p>
            <h3>{estimatedWatts}W</h3>
            <p>{currentBuild.psu ? `${currentBuild.psu.wattage}W PSU selected` : "Select a PSU to see power analysis"}</p>
          </div>

          <div className="summary-card summary-progress-card">
            <div className="progress-header">
              <p className="card-label">Build Progress</p>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <p>{buildSteps.length - selectedCount} components remaining</p>
          </div>

          <div className="summary-actions">
            <Link to="/build" className="btn-primary">Continue Building</Link>
            <button className="btn-secondary" onClick={resetBuild}>Reset Build</button>
          </div>
        </div>
      </div>
    </div>
  );
}

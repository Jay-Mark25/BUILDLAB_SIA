import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useBuild } from "../../contexts/BuildContext";
import "./Learn.css";

const currentStepTips = [
  {
    title: "CPU Fundamentals",
    summary: "Start with the brain of the PC. The CPU socket must match the motherboard socket.",
    details: "Choose a CPU first, then match it with a motherboard that uses the same socket type. This is the most important pairing when building a PC.",
  },
  {
    title: "Motherboard Basics",
    summary: "Motherboards define what CPUs, RAM, and cases you can use.",
    details: "Check socket type, memory type, and size. A good motherboard keeps your system stable and allows future upgrades.",
  },
  {
    title: "RAM and Memory",
    summary: "DDR4 and DDR5 are not interchangeable.",
    details: "Match the RAM type to your motherboard. Faster RAM can boost performance, but the motherboard must support the same DDR generation.",
  },
  {
    title: "Storage Options",
    summary: "NVMe SSDs are usually the fastest option for modern builds.",
    details: "Decide between NVMe, SATA, and hybrid storage based on budget and speed needs. Most modern motherboards support NVMe drives directly.",
  },
  {
    title: "GPU Power",
    summary: "A better GPU usually means a higher power demand.",
    details: "Make sure your power supply has enough wattage for your chosen graphics card, and verify there are enough PCIe power connectors.",
  },
  {
    title: "Power Supply Selection",
    summary: "Always pick a PSU with overhead, not just the minimum wattage.",
    details: "Choose a reliable power unit with enough wattage for your whole system plus extra headroom for future upgrades.",
  },
  {
    title: "Case and Cooling",
    summary: "Case size matters for motherboard fit and airflow.",
    details: "Pick a case that supports your motherboard form factor and gives enough room for proper cooling and cable management.",
  },
];

const generalTips = [
  {
    title: "CPU Socket Compatibility",
    detail: "Pay attention to socket names like LGA1700, AM4, and AM5. Each CPU family uses a specific socket.",
  },
  {
    title: "RAM Types: DDR4 vs DDR5",
    detail: "DDR5 is newer and faster, but it only works with motherboards designed for DDR5. DDR4 is more affordable and still a solid choice.",
  },
  {
    title: "NVMe vs SATA Storage",
    detail: "NVMe SSDs are much faster than SATA SSDs. Use NVMe for your operating system and SATA for bulk storage.",
  },
  {
    title: "GPU Power Requirements",
    detail: "High-end GPUs can need 600W or more. Always choose a PSU with enough wattage plus at least 20% buffer.",
  },
  {
    title: "Case Form Factor & Airflow",
    detail: "Good airflow helps keep component temperatures low. Make sure your case supports the motherboard size and cooling options you want.",
  },
];

const stepNames = [
  "CPU",
  "Motherboard",
  "RAM",
  "Storage",
  "GPU",
  "Power",
  "Case",
];

export default function Learn() {
  const { getSelectedComponents } = useBuild();
  const selectedComponents = getSelectedComponents();
  const [activeTab, setActiveTab] = useState("current");
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [previewSrc, setPreviewSrc] = useState(
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  );
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const selectedCount = selectedComponents.length;
  const currentStepLabel = useMemo(() => {
    if (selectedCount >= stepNames.length) {
      return "Build Review";
    }
    return `${stepNames[selectedCount]} Step`;
  }, [selectedCount]);

  useEffect(() => {
    return () => {
      if (uploadedUrl) {
        URL.revokeObjectURL(uploadedUrl);
      }
    };
  }, [uploadedUrl]);

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
    if (uploadedUrl) {
      URL.revokeObjectURL(uploadedUrl);
    }
    setUploadedUrl(url);
  };

  const activeTips = activeTab === "current" ? currentStepTips : generalTips;
  const activeTip = activeTips[activeTipIndex] || activeTips[0];

  return (
    <div className="learn-page">
      <div className="learn-hero">
        <div className="learn-hero-copy">
          <span className="learn-badge">Learning Tips & Resources</span>
          <h1>Learn As You Build</h1>
          <p>
            BuildLab teaches the concepts behind every component selection. No prior knowledge required.
          </p>
          <div className="learn-buttons">
            <Link to="/build" className="btn-primary">Start Building</Link>
            <Link to="/compatibility" className="btn-secondary">Check Compatibility</Link>
          </div>
          <div className="learn-summary">
            <div>
              <span className="learn-number">{selectedCount}</span>
              <p>components selected</p>
            </div>
            <div>
              <span className="learn-number">{currentStepLabel}</span>
              <p>current learning focus</p>
            </div>
          </div>
        </div>
        <div className="learn-hero-image">
          <img src={previewSrc} alt="Learning visual" />
          <label className="upload-card">
            <span>Upload custom section image</span>
            <input type="file" accept="image/*" onChange={handleUpload} />
          </label>
        </div>
      </div>

      <div className="learn-tabs">
        <button
          className={`tab-button ${activeTab === "current" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("current");
            setActiveTipIndex(0);
          }}
        >
          Current Step Tips
        </button>
        <button
          className={`tab-button ${activeTab === "general" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("general");
            setActiveTipIndex(0);
          }}
        >
          General PC Tips
        </button>
      </div>

      <div className="learn-grid">
        <div className="learn-tip-card">
          <h3>{activeTip.title}</h3>
          <p>{activeTip.summary || activeTip.detail}</p>
          {activeTip.details && <p className="learn-detail">{activeTip.details}</p>}
          <div className="tip-actions">
            <button className="btn-outline">Explore More</button>
            <button className="btn-primary">Apply to Build</button>
          </div>
        </div>

        <div className="learn-list-card">
          <h3>{activeTab === "current" ? "Step-by-Step Tips" : "All Tips"}</h3>
          <div className="learn-list">
            {activeTips.map((tip, index) => (
              <button
                key={index}
                className={`learn-list-item ${index === activeTipIndex ? "selected" : ""}`}
                onClick={() => setActiveTipIndex(index)}
              >
                <span>{tip.title}</span>
                <span>{activeTab === "current" ? "→" : "•"}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

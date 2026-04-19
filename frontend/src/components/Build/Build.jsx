import React, { useState } from "react";
import { useBuild } from "../../contexts/BuildContext";
import { checkCompatibility } from "../../utilities/rules";
import "./Build.css";

function Build() {
  const { currentBuild, addComponent, removeComponent, getSelectedComponents } = useBuild();
  const [currentStep, setCurrentStep] = useState(0);
  const [compatibilityMessage, setCompatibilityMessage] = useState(null);

  const steps = [
    { icon: "⚙️", label: "CPU", category: "cpu" },
    { icon: "🖥", label: "Motherboard", category: "motherboard" },
    { icon: "💾", label: "RAM", category: "ram" },
    { icon: "🗄", label: "Storage", category: "storage" },
    { icon: "🖱", label: "GPU", category: "gpu" },
    { icon: "⚡", label: "Power", category: "psu" },
    { icon: "🖥", label: "Case", category: "case" },
  ];

  const componentsData = {
    cpu: [
      {
        id: "intel-i5-13600k",
        img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80",
        alt: "Intel Core i5-13600K",
        brand: "Intel",
        name: "Core i5-13600K",
        desc: "Great mid-range CPU for gaming and productivity. 14 cores, 20 threads.",
        socket_type: "LGA1700",
        tags: ["LGA1700", "125W", "14 cores"],
        price: "₱31,900",
      },
      {
        id: "intel-i3-12100",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
        alt: "Intel Core i3-12100",
        brand: "Intel",
        name: "Core i3-12100",
        desc: "Budget-friendly entry-level CPU. Perfect for learning and basic tasks.",
        socket_type: "LGA1700",
        tags: ["LGA1700", "60W", "4 cores"],
        price: "₱12,900",
      },
      {
        id: "amd-ryzen5-7600x",
        img: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&q=80",
        alt: "AMD Ryzen 5 7600X",
        brand: "AMD",
        name: "Ryzen 5 7600X",
        desc: "High-performance AMD CPU with excellent single-core speed.",
        socket_type: "AM5",
        tags: ["AM5", "105W", "6 cores"],
        price: "₱24,900",
      },
      {
        id: "amd-ryzen3-4100",
        img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=300&q=80",
        alt: "AMD Ryzen 3 4100",
        brand: "AMD",
        name: "Ryzen 3 4100",
        desc: "Entry-level AMD CPU, great for budget builds and learning.",
        socket_type: "AM4",
        tags: ["AM4", "65W", "4 cores"],
        price: "₱8,900",
      },
    ],
    motherboard: [
      {
        id: "asus-prime-b660m",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
        alt: "ASUS Prime B660M-A",
        brand: "ASUS",
        name: "Prime B660M-A",
        desc: "Reliable motherboard for Intel 12th/13th gen CPUs.",
        socket_type: "LGA1700",
        ddr_type: "DDR4",
        tags: ["LGA1700", "DDR4", "mATX"],
        price: "₱8,500",
      },
      {
        id: "msi-b450-tomahawk",
        img: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&q=80",
        alt: "MSI B450 Tomahawk",
        brand: "MSI",
        name: "B450 Tomahawk",
        desc: "Great AMD motherboard with excellent VRM design.",
        socket_type: "AM4",
        ddr_type: "DDR4",
        tags: ["AM4", "DDR4", "ATX"],
        price: "₱7,200",
      },
    ],
    ram: [
      {
        id: "corsair-vengeance-16gb",
        img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80",
        alt: "Corsair Vengeance LPX 16GB",
        brand: "Corsair",
        name: "Vengeance LPX 16GB",
        desc: "High-performance DDR4 RAM for gaming and productivity.",
        ddr_type: "DDR4",
        capacity: "16GB",
        speed: "3200MHz",
        tags: ["DDR4", "16GB", "3200MHz"],
        price: "₱3,200",
      },
    ],
    storage: [
      {
        id: "samsung-970-evo-1tb",
        img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80",
        alt: "Samsung 970 EVO 1TB",
        brand: "Samsung",
        name: "970 EVO 1TB",
        desc: "Fast NVMe SSD for quick boot times and app loading.",
        type: "NVMe SSD",
        capacity: "1TB",
        tags: ["NVMe", "1TB", "PCIe 3.0"],
        price: "₱4,500",
      },
    ],
    gpu: [
      {
        id: "nvidia-rtx-3060",
        img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80",
        alt: "NVIDIA RTX 3060",
        brand: "NVIDIA",
        name: "RTX 3060",
        desc: "Great 1440p gaming GPU with ray tracing support.",
        power_required: 550,
        tags: ["RTX 3060", "12GB", "1440p"],
        price: "₱28,000",
      },
    ],
    psu: [
      {
        id: "corsair-rm650x",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
        alt: "Corsair RM650x",
        brand: "Corsair",
        name: "RM650x",
        desc: "80+ Gold certified power supply with modular cables.",
        wattage: 650,
        efficiency: "80+ Gold",
        tags: ["650W", "80+ Gold", "Modular"],
        price: "₱5,800",
      },
    ],
    case: [
      {
        id: "fractal-design-meshify-c",
        img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80",
        alt: "Fractal Design Meshify C",
        brand: "Fractal Design",
        name: "Meshify C",
        desc: "Excellent airflow case with tempered glass side panel.",
        form_factor: "Mid Tower",
        tags: ["Mid Tower", "Tempered Glass", "Good Airflow"],
        price: "₱4,200",
      },
    ],
  };

  const handleComponentSelect = (component) => {
    const category = steps[currentStep].category;
    const compatibility = checkCompatibility(currentBuild, { ...component, category });

    if (compatibility.compatible) {
      addComponent(category, component);
      setCompatibilityMessage({ type: "success", text: compatibility.message });
      setTimeout(() => setCompatibilityMessage(null), 3000);
    } else {
      setCompatibilityMessage({ type: "error", text: compatibility.reason });
      setTimeout(() => setCompatibilityMessage(null), 5000);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentCategory = steps[currentStep].category;
  const currentComponents = componentsData[currentCategory] || [];
  const selectedComponent = currentBuild[currentCategory];

  return (
    <section id="build" className="build">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge badge-yellow">✕ Component Picker</div>
          <h2 className="section-title">Build Your PC</h2>
          <p className="section-desc">
            Select components one at a time. BuildLab will check compatibility as you go.
          </p>
        </div>

        {/* Compatibility Message */}
        {compatibilityMessage && (
          <div className={`compatibility-message ${compatibilityMessage.type}`}>
            {compatibilityMessage.text}
          </div>
        )}

        {/* Step Navigator */}
        <div className="step-nav">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="step-item">
                <div className="step-wrapper">
                  <div className={`step-circle ${index === currentStep ? "active" : ""} ${currentBuild[step.category] ? "completed" : ""}`}>
                    {currentBuild[step.category] ? "✓" : step.icon}
                  </div>
                  <div className="step-label">{step.label}</div>
                </div>
              </div>
              {index !== steps.length - 1 && <div className="step-connector"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Step Box */}
        <div className="build-step-box">
          <div className="build-step-icon">{steps[currentStep].icon}</div>
          <div>
            <div className="build-step-info">STEP {currentStep + 1} OF {steps.length}</div>
            <div className="build-step-info">
              <h3>Select Your {steps[currentStep].label}</h3>
            </div>
          </div>
        </div>

        {/* Selected Components Summary */}
        {getSelectedComponents().length > 0 && (
          <div className="selected-components">
            <h4>Selected Components:</h4>
            <div className="selected-list">
              {getSelectedComponents().map((comp) => (
                <div key={comp.category} className="selected-item">
                  <span className="selected-category">{comp.category}:</span>
                  <span className="selected-name">{comp.name}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeComponent(comp.category)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Component Cards */}
        <div className="cpu-grid">
          {currentComponents.map((component, index) => (
            <div
              className={`cpu-card ${selectedComponent?.id === component.id ? "selected" : ""}`}
              key={index}
              onClick={() => handleComponentSelect(component)}
            >
              <img src={component.img} alt={component.alt} />
              <div className="cpu-brand">{component.brand}</div>
              <div className="cpu-name">{component.name}</div>
              <div className="cpu-desc">{component.desc}</div>

              <div className="cpu-tags">
                {component.tags.map((tag, i) => (
                  <span className="cpu-tag" key={i}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="cpu-footer">
                <span className="cpu-price">{component.price}</span>
                <span className="cpu-compat">
                  {selectedComponent?.id === component.id ? "✓ Selected" : "Click to select"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="build-nav">
          <button
            className="btn-prev"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            ← Previous
          </button>
          <button
            className="btn-next"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            Next Step →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Build;
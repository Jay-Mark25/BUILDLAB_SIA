import React from "react";
import "./Build.css"; // Import the CSS file for styling

function Build() {
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

        {/* Step Navigator */}
        <div className="step-nav">
          {[
            { icon: "⚙️", label: "CPU", active: true },
            { icon: "🖥", label: "Motherboard" },
            { icon: "💾", label: "RAM" },
            { icon: "🗄", label: "Storage" },
            { icon: "🖱", label: "GPU" },
            { icon: "⚡", label: "Power" },
            { icon: "🖥", label: "PC" },
          ].map((step, index) => (
            <React.Fragment key={index}>
              <div className="step-item">
                <div className="step-wrapper">
                  <div className={`step-circle ${step.active ? "active" : ""}`}>
                    {step.icon}
                  </div>
                  <div className="step-label">{step.label}</div>
                </div>
              </div>
              {index !== 6 && <div className="step-connector"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Step Box */}
        <div className="build-step-box">
          <div className="build-step-icon">⚙️</div>
          <div>
            <div className="build-step-info">STEP 1 OF 7</div>
            <div className="build-step-info">
              <h3>Select Your CPU (Processor)</h3>
            </div>
          </div>
        </div>

        {/* CPU Cards */}
        <div className="cpu-grid">
          {[
            {
              img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80",
              alt: "Intel Core i5-13600K",
              brand: "Intel",
              name: "Core i5-13600K",
              desc: "Great mid-range CPU for gaming and productivity. 14 cores, 20 threads.",
              tags: ["LGA1700", "125", "14"],
              price: "php319",
            },
            {
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
              alt: "Intel Core i3-12100",
              brand: "Intel",
              name: "Core i3-12100",
              desc: "Budget-friendly entry-level CPU. Perfect for learning and basic tasks.",
              tags: ["LGA1700", "60", "4"],
              price: "php129",
            },
            {
              img: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&q=80",
              alt: "AMD Ryzen 5 7600X",
              brand: "AMD",
              name: "Ryzen 5 7600X",
              desc: "High-performance AMD CPU with excellent single-core speed.",
              tags: ["AM5", "105", "6"],
              price: "php249",
            },
            {
              img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=300&q=80",
              alt: "AMD Ryzen 3 4100",
              brand: "AMD",
              name: "Ryzen 3 4100",
              desc: "Entry-level AMD CPU, great for budget builds and learning.",
              tags: ["AM4", "65", "4"],
              price: "php89",
            },
          ].map((cpu, index) => (
            <div className="cpu-card" key={index}>
              <img src={cpu.img} alt={cpu.alt} />
              <div className="cpu-brand">{cpu.brand}</div>
              <div className="cpu-name">{cpu.name}</div>
              <div className="cpu-desc">{cpu.desc}</div>

              <div className="cpu-tags">
                {cpu.tags.map((tag, i) => (
                  <span className="cpu-tag" key={i}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="cpu-footer">
                <span className="cpu-price">{cpu.price}</span>
                <span className="cpu-compat">✓ Compatible</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="build-nav">
          <button className="btn-prev">← Previous</button>
          <button className="btn-next">Next Step →</button>
        </div>
      </div>
    </section>
  );
}

export default Build;
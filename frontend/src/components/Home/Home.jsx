import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css'; // Import the CSS file for styling

function Hero() {
  return (
    <section id="welcome" className="hero">
      <div className="hero-badge">
        <span className="dot"></span> ICT Senior High School Training System
      </div>

      <h1 className="hero-title">
        Build Your First<br />
        <span className="yellow">PC with Confidence</span>
      </h1>

      <p className="hero-sub">
        BuildLab is your interactive PC assembly trainer. Select components, check compatibility in real-time, and learn the concepts behind every decision — no prior experience needed.
      </p>

      <div className="hero-btns">
        <Link to="/build" className="btn-primary">⚙ Start Building Now</Link> {/* Updated to use Link */}
        <a href="#compatibility" className="btn-outline">ℹ How It Works</a>
      </div>

      <div className="hero-features">
        <div className="feat-card">
          <div className="feat-icon">⚙️</div>
          <h4>Component Picker</h4>
          <p>Choose from real PC parts</p>
        </div>

        <div className="feat-card">
          <div className="feat-icon">🛡️</div>
          <h4>Compatibility Check</h4>
          <p>Real-time rule-based verification</p>
        </div>

        <div className="feat-card">
          <div className="feat-icon">🎓</div>
          <h4>Learn As You Build</h4>
          <p>Beginner-friendly explanations</p>
        </div>

        <div className="feat-card">
          <div className="feat-icon">📊</div>
          <h4>Build Summary</h4>
          <p>Full report with pricing</p>
        </div>
      </div>

      <div className="hero-arrow">↓</div>
    </section>
  );
}

export default Hero;
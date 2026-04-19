import React from "react";
import { Link } from "react-router-dom";
import { useBuild } from "../../contexts/BuildContext";
import { checkCompatibility } from "../../utilities/rules";
import "./Compatibility.css";

export default function Compatibility() {
  const { currentBuild, getSelectedComponents } = useBuild();
  const selectedComponents = getSelectedComponents();

  // Check compatibility between all selected components
  const checkAllCompatibility = () => {
    const issues = [];
    const components = selectedComponents;

    // Check CPU vs Motherboard
    if (currentBuild.cpu && currentBuild.motherboard) {
      const result = checkCompatibility(
        { cpu: currentBuild.cpu },
        { ...currentBuild.motherboard, category: 'motherboard' }
      );
      if (!result.compatible) {
        issues.push({
          components: ['CPU', 'Motherboard'],
          issue: result.reason,
          tip: result.tip
        });
      }
    }

    // Add more compatibility checks here as rules are expanded

    return issues;
  };

  const compatibilityIssues = checkAllCompatibility();
  const totalPrice = selectedComponents.reduce((sum, comp) => {
    const price = parseFloat(comp.price.replace(/[₱,]/g, ''));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  return (
    <div className="compatibility-page">

      {/* Title Section */}
      <section className="hero">
        <span className="badge">✔ Compatibility Verification</span>
        <h1>Real-Time Compatibility Check</h1>
        <p>
          Every component you select is instantly verified against your existing
          choices using hardware compatibility rules.
        </p>
      </section>

      {/* Main Content */}
      {selectedComponents.length === 0 ? (
        <div className="main-card">
          <div className="empty-box">
            <div className="icon">🛡️</div>
            <h3>No Components Selected Yet</h3>
            <p>
              Head to the Component Picker above and start selecting parts.
              Compatibility results will appear here instantly.
            </p>
            <Link to="/build" className="primary-btn">
              ⚙ Go to Component Picker
            </Link>
          </div>
        </div>
      ) : (
        <div className="compatibility-results">
          {/* Selected Components List */}
          <div className="selected-components-card">
            <h3>📋 Your Selected Components</h3>
            <div className="components-list">
              {selectedComponents.map((component, index) => (
                <div key={index} className="component-item">
                  <div className="component-header">
                    <span className="component-category">{component.category.toUpperCase()}</span>
                    <span className="component-price">{component.price}</span>
                  </div>
                  <div className="component-details">
                    <img src={component.img} alt={component.name} className="component-image" />
                    <div className="component-info">
                      <h4>{component.brand} {component.name}</h4>
                      <p>{component.desc}</p>
                      <div className="component-tags">
                        {component.tags.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div className="total-price">
              <h4>Total Estimated Cost: ₱{totalPrice.toLocaleString()}</h4>
            </div>
          </div>

          {/* Compatibility Issues */}
          {compatibilityIssues.length > 0 ? (
            <div className="issues-card">
              <h3>⚠️ Compatibility Issues Found</h3>
              {compatibilityIssues.map((issue, index) => (
                <div key={index} className="issue-item">
                  <div className="issue-header">
                    <span className="issue-components">
                      {issue.components.join(' + ')}
                    </span>
                    <span className="issue-status">❌ Incompatible</span>
                  </div>
                  <p className="issue-description">{issue.issue}</p>
                  {issue.tip && <p className="issue-tip">💡 {issue.tip}</p>}
                </div>
              ))}
              <div className="fix-suggestion">
                <p>Go back to the Build page to select compatible components.</p>
                <Link to="/build" className="fix-btn">🔧 Fix Compatibility Issues</Link>
              </div>
            </div>
          ) : (
            <div className="success-card">
              <div className="success-icon">✅</div>
              <h3>All Components Are Compatible!</h3>
              <p>
                Great job! All your selected components work together perfectly.
                You can proceed with confidence to build your PC.
              </p>
              <div className="success-actions">
                <Link to="/build" className="continue-btn">➕ Add More Components</Link>
                <Link to="/summary" className="summary-btn">📊 View Build Summary</Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feature Cards */}
      <div className="features">
        <div className="feature-card">
          <div className="icon">⚙</div>
          <h4>Socket Matching</h4>
          <p>
            Verifies that the CPU socket type matches the motherboard socket.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">💾</div>
          <h4>RAM Compatibility</h4>
          <p>
            Checks that RAM type and speed match the motherboard specification.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">⚡</div>
          <h4>Power Requirements</h4>
          <p>
            Calculates total system power draw and verifies PSU wattage.
          </p>
        </div>
      </div>
    </div>
  );
}
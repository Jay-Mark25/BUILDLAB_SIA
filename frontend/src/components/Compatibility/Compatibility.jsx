import React from 'react';
import './Compatibility.css';

function Compatibility() {
  return (
    <div className="compatibility-container">
      <div className="compatibility-header">
        <span>Compatibility Verification</span>
        <h1>Real-Time Compatibility Check</h1>
        <p>
          Every component you select is instantly verified against your existing choices using hardware compatibility rules.
        </p>
      </div>

      <div className="compatibility-status">
        <div className="status-icon">✔</div>
        <div>
          <h2>All Systems Go!</h2>
          <p>Core i5-13600K is compatible with your build</p>
        </div>
      </div>

      <div className="compatibility-grid">
        <div className="compatibility-card">
          <div className="card-icon">🔧</div>
          <h3>Socket Matching</h3>
          <p>
            Verifies that the CPU socket type matches the motherboard socket. Intel and AMD use different sockets that are not interchangeable.
          </p>
        </div>
        <div className="compatibility-card">
          <div className="card-icon">📂</div>
          <h3>RAM Compatibility</h3>
          <p>
            Checks that RAM type (DDR4/DDR5) matches the motherboard specification and that speed does not exceed the maximum supported.
          </p>
        </div>
        <div className="compatibility-card">
          <div className="card-icon">⚡</div>
          <h3>Power Requirements</h3>
          <p>
            Calculates total system power draw and verifies the PSU wattage is sufficient with a recommended 25% safety buffer.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Compatibility;
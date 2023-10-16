import React from 'react';
import cryptoniteLogo from '/src/assets/cryptonite-logo.png';
import isacLogo from '/src/assets/isac-logo.png';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="logos">
          <img
            src={cryptoniteLogo}
            alt="Cryptonite Logo"
            className="logo"
          />
          <div className="text-section">
            <div>
              Cryptonite 2023
            </div>
            <div>
              &nbsp;MAHE-ISAC COE for Cyber Security&nbsp;
            </div>
            <div>
              Developed by <a href="https://www.linkedin.com/in/siddharth-mittal-/">Siddharth Mittal</a>
            </div>
          </div>
          <img
            src={isacLogo}
            alt="MAHE ISAC Logo"
            className="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
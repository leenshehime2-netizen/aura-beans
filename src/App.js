import React, { useState } from 'react';
import './App.css'; 

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <div className="app-wrapper">
      <nav className="nav-container">
        <div className="nav-brand">AURA BEANS</div>
                <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <button className={`nav-link-btn ${activePage === 'home' ? 'active-link' : ''}`} onClick={() => navigateTo('home')}>Home</button>
          <button className={`nav-link-btn ${activePage === 'about' ? 'active-link' : ''}`} onClick={() => navigateTo('about')}>Our Story</button>
          <button className={`nav-link-btn ${activePage === 'brews' ? 'active-link' : ''}`} onClick={() => navigateTo('brews')}>Our Brews</button>
          <button className={`nav-link-btn ${activePage === 'gear' ? 'active-link' : ''}`} onClick={() => navigateTo('gear')}>Gear & Goods</button>
          <button className={`nav-link-btn ${activePage === 'visit' ? 'active-link' : ''}`} onClick={() => navigateTo('visit')}>Visit Us</button>
        </div>
      </nav>
      <main className="container">
        {activePage === 'home' && <HomeView />}
        {activePage === 'about' && <AboutView />}
        {activePage === 'brews' && <BrewsView />}
        {activePage === 'gear' && <GearView />}
        {activePage === 'visit' && <VisitView />}
      </main>
    </div>
  );
}
function HomeView() {
  const [beanOrigin, setBeanOrigin] = React.useState('Ethiopia');
  const [roastLevel, setRoastLevel] = React.useState('Medium');
  const [bagSize, setBagSize] = React.useState(250);

  const [calculatedPrice, setCalculatedPrice] = React.useState(0);
  const [formulatedBlendName, setFormulatedBlendName] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);

  const handleFormulateBlend = (e) => {
    e.preventDefault();

    let pricePerGram = 0.08;
    if (beanOrigin === 'Colombia') pricePerGram = 0.07;
    if (beanOrigin === 'Sumatra') pricePerGram = 0.09;

    let roastMultiplier = 1.0;
    if (roastLevel === 'Light') roastMultiplier = 1.1;
    if (roastLevel === 'Dark') roastMultiplier = 0.95;

    const totalCost = bagSize * pricePerGram * roastMultiplier;
    
    setCalculatedPrice(totalCost.toFixed(2));
    setFormulatedBlendName(`The Aura ${roastLevel} ${beanOrigin} Special`);
    setShowResult(true);
  };

  return (
    <div className="fade-in">
      <div className="brand-intro-block">
        <h1>Aura Beans</h1>
        <h2>Artisanal Roastery & Cafe</h2>
        <div className="accent-line"></div>
      </div>

      <div className="customizer-box">
        <h3 className="tool-title"> Craft Your Custom Blend</h3>
        <p className="tool-subtitle">Select your parameters to formulate a custom batch and calculate real-time pricing.</p>

        <form onSubmit={handleFormulateBlend} className="customizer-form-grid">
          
          <div className="form-group">
            <label>1. Select Base Bean</label>
            <select value={beanOrigin} onChange={(e) => setBeanOrigin(e.target.value)}>
              <option value="Ethiopia">Ethiopia Yirgacheffe (Floral)</option>
              <option value="Colombia">Colombia El Paraiso (Sweet)</option>
              <option value="Sumatra">Sumatra Mandheling (Earthy)</option>
            </select>
          </div>

          <div className="form-group">
            <label>2. Roast Profile</label>
            <select value={roastLevel} onChange={(e) => setRoastLevel(e.target.value)}>
              <option value="Light">Light Roast (High Acidity)</option>
              <option value="Medium">Medium Roast (Balanced Body)</option>
              <option value="Dark">Dark Roast (Bold & Smoky)</option>
            </select>
          </div>

          <div className="form-group">
            <label>3. Bag Volume (Grams)</label>
            <select value={bagSize} onChange={(e) => setBagSize(Number(e.target.value))}>
              <option value="250">250g (Standard Bag)</option>
              <option value="500">500g (Sharing Size)</option>
              <option value="1000">1000g (Bulk Roaster Bag)</option>
            </select>
          </div>

          <div className="form-action-row">
            <button type="submit" className="formulate-btn">
              ⚡ Formulate My Blend
            </button>
          </div>
        </form>

        {showResult && (
          <div className="calculation-output-banner quick-fade">
            <div className="output-status-icon">✓</div>
            <div className="output-details">
              <h4>{formulatedBlendName}</h4>
              <p>Your custom configuration is optimized! Total batch cost calculated at:</p>
              <div className="final-price-tag">${calculatedPrice} USD</div>
            </div>
          </div>
        )}
      </div>

      <div className="intro-footer">
        <p>Welcome to Aura Beans. All custom small-batch formulations are hand-logged, profile-checked, and roasted to order.</p>
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <div className="fade-in">
      <h1 className="section-title">Our Story</h1>
      <h2 className="section-subtitle">Crafting the Perfect Cup</h2>
      <hr className="divider" />
      
      <div className="story-layout">
        <div className="story-card">
          <p>Founded on a passion for exceptional coffee and sustainable practices, Aura Beans sourcing experts travel across regions to bring individual farm stories directly into local communities.</p>
          <p>We roast small scale, highlighting flavor expressions native to soil, elevation, and innovative processing. Every batch is mindfully evaluated to guarantee premium configuration in every cup.</p>
        </div>
      </div>
    </div>
  );
}

function BrewsView() {
  return (
    <div className="fade-in">
      <h1 className="section-title">Signature Single Origins</h1>
      <p className="section-desc">Hand-selected crop variants roasted weekly in small batches.</p>
      <hr className="divider" />
      <div className="item-grid">
        <div className="product-card">
        <div className="img-wrapper" style={{ fontSize: '64px', background: '#FFF1F2', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', borderRadius: '12px' }}>
  🌸☕✨
</div>
          <h3>Ethiopia Yirgacheffe</h3>
          <p className="product-description">Bright, floral notes with hints of bergamot and crisp citrus tea finish.</p>
          <div className="card-btn">Order Beans</div>
        </div>

        <div className="product-card">
          <div className="img-wrapper" style={{ fontSize: '64px', background: '#FEF3C7', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', borderRadius: '12px' }}>
  🍫☕🍯
</div>
          <h3>Colombia El Paraiso</h3>
          <p className="product-description">Velvety body featuring rich milk chocolate, caramel, and red apple profiles.</p>
          <div className="card-btn">Order Beans</div>
        </div>

        <div className="product-card">
        <div className="img-wrapper" style={{ fontSize: '64px', background: '#ECFDF5', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', borderRadius: '12px' }}>
  🌲☕🍂
</div>
          <h3>Sumatra Mandheling</h3>
          <p className="product-description">Deep, full-bodied profile carrying rustic cedarwood, sweet tobacco, and spice notes.</p>
          <div className="card-btn">Order Beans</div>
        </div>
      </div>

      <h1 className="section-title" style={{ marginTop: '60px' }}>Roastery Price Guide</h1>
      <div className="table-wrapper">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Origin Variety</th>
              <th>Standard Bag (250g)</th>
              <th>Roast Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Ethiopia Yirgacheffe</strong></td>
              <td className="price-text">$12.00</td>
              <td><span className="roast-badge light">Light Roast</span></td>
            </tr>
            <tr>
              <td><strong>Colombia El Paraiso</strong></td>
              <td className="price-text">$10.50</td>
              <td><span className="roast-badge medium">Medium Roast</span></td>
            </tr>
            <tr>
              <td><strong>Sumatra Mandheling</strong></td>
              <td className="price-text">$9.00</td>
              <td><span className="roast-badge dark">Dark Roast</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GearView() {
  return (
    <div className="fade-in">
      <h1 className="section-title">Brewing Equipment</h1>
      <p className="section-desc">Elevate your morning ritual with commercial-grade home equipment.</p>
      <hr className="divider" />

      <div className="item-grid">
        <div className="product-card">
          <div className="img-wrapper">
            <img src="Ceramic Pour-Over V60.png" alt="Ceramic Coffee Dripper" />
          </div>
          <h3>Ceramic Pour-Over V60</h3>
          <p className="product-description">Optimal heat retention design for pristine extraction clarity.</p>
          <div className="card-btn">Explore Gear</div>
        </div>

        <div className="product-card">
          <div className="img-wrapper">
            <img src="Precision Hand Grinder.png" alt="Hand Coffee Grinder" />
          </div>
          <h3>Precision Hand Grinder</h3>
          <p className="product-description">Stepless conical steel burrs built for uniform grinding mechanics.</p>
          <div className="card-btn">Explore Gear</div>
        </div>

        <div className="product-card">
          <div className="img-wrapper">
            <img src="Gooseneck Temperature Kettle.png" alt="Gooseneck Kettle" />
          </div>
          <h3>Gooseneck Temperature Kettle</h3>
          <p className="product-description">Precision pour flow spout control with counterbalanced base weight.</p>
          <div className="card-btn">Explore Gear</div>
        </div>
      </div>
    </div>
  );
}

function VisitView() {
  return (
    <div className="fade-in">
      <h1 className="section-title">Connect With Our Roastery</h1>
      <p className="section-desc">Have questions about grind sizes or wholesale accounts? Reach out anytime.</p>
      <hr className="divider" />

      <div className="contact-container">
        <div className="contact-brand-card">
          <img src="logo.png" alt="Aura Beans Logo" className="contact-logo" />
        </div>
                <div className="contact-links-list">
          <div className="contact-item">
            <span className="contact-label">Converse</span>
            <span className="contact-val">+961 71 852 615</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Write Us</span>
            <span className="contact-val">hello@aurabeans.com</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Instagram</span>
            <span className="contact-val">@aurabeans.roasters</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">TikTok</span>
            <span className="contact-val">@aurabeans</span>
          </div>
        </div>
      </div>
    </div>
  );
}
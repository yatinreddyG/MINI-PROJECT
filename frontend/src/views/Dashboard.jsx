// ═══════════════════════════════════════════════════════
// NEW MINI — DASHBOARD VIEW
// Hero + Disease cards + How it works + Features
// ═══════════════════════════════════════════════════════


// ─── HEADER ───────────────────────────────────────────
function Header({ onGetStarted }) {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="header-logo-icon">🩺</div>
        <span className="header-logo-text">MedPredict</span>
      </div>

      <nav className="header-nav">
        <span className="header-nav-link" onClick={onGetStarted}>Predict</span>
        <a className="header-nav-link" href="#how-it-works">How It Works</a>
        <a className="header-nav-link" href="#features">Features</a>
      </nav>

      <button className="btn-primary" onClick={onGetStarted} style={{ padding: '10px 24px', fontSize: '14px' }}>
        <span>Get Started</span>
      </button>
    </header>
  );
}

// ─── HERO SECTION ─────────────────────────────────────
function HeroSection({ onGetStarted }) {
  return (
    <section className="hero-section">
      <div className="hero-content">

        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          AI-Powered Health Analytics
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Predict. Prevent.
          <br />
          <span className="gradient-text">Protect Your Health.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Advanced machine learning models analyze your health parameters
          to predict risks for Heart Disease, Brain Stroke, Kidney Disease
          and Diabetes — enabling early detection and preventive care.
        </p>

        {/* Actions */}
        <div className="hero-actions">
          <button className="btn-primary" onClick={onGetStarted}>
            <span>Start Health Check →</span>
          </button>
          <a href="#how-it-works" className="btn-ghost">Learn How It Works</a>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">4</div>
            <div className="hero-stat-label">Diseases Covered</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-number">3</div>
            <div className="hero-stat-label">ML Models</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-number">8</div>
            <div className="hero-stat-label">Parameters Each</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-number">~90%</div>
            <div className="hero-stat-label">Avg Accuracy</div>
          </div>
        </div>

        {/* Feature chips */}
        <div className="features-row">
          {[
            '🧠 Decision Tree',
            '🌲 Random Forest',
            '📈 Logistic Regression',
            '⚡ Instant Results',
            '🔒 Private & Secure',
          ].map((chip, i) => (
            <div key={i} className="feature-chip">
              <span className="feature-chip-dot" />
              {chip}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── DISEASE CARDS SECTION ─────────────────────────── 
function DiseasesSection({ onSelectDisease }) {
  const sectionRef = useRef(null);

  return (
    <section id="diseases" className="diseases-section" ref={sectionRef}>
      <div className="diseases-section-inner">

        <div className="section-heading">
          <h2>Select a Disease to Assess</h2>
          <p>
            Choose the health condition you'd like to evaluate.
            Our ML models are trained on validated medical datasets.
          </p>
        </div>

        <div className="disease-grid">
          {DISEASE_LIST.map((id, i) => (
            <DiseaseCard
              key={id}
              disease={id}
              onClick={() => onSelectDisease(id)}
              delay={i * 120}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── HOW IT WORKS ──────────────────────────────────── 
function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Select Disease', desc: 'Choose from Heart, Brain Stroke, Kidney or Diabetes assessment.' },
    { num: '02', title: 'Enter Parameters', desc: 'Fill in 8 simple health values from your latest checkup.' },
    { num: '03', title: 'AI Analyzes', desc: '3 ML models run simultaneously and the best result is selected.' },
    { num: '04', title: 'Get Insights', desc: 'See your risk level, explanation and visual health charts.' },
  ];

  return (
    <section id="how-it-works" className="how-section">
      <div className="how-section-inner">

        <div className="section-heading">
          <h2>How It Works</h2>
          <p>Four simple steps to understand your health risk</p>
        </div>

        <div className="how-grid">
          <div className="how-connector" />
          {steps.map((step, i) => (
            <HowCard key={i} step={step} delay={i * 150} />
          ))}
        </div>

      </div>
    </section>
  );
}

function HowCard({ step, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => ref.current?.classList.add('visible'), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div className="how-card" ref={ref}>
      <div className="how-number">{step.num}</div>
      <h4>{step.title}</h4>
      <p>{step.desc}</p>
    </div>
  );
}

// ─── FEATURES SECTION ─────────────────────────────── 
function FeaturesSection() {
  const features = [
    { icon: '🧬', title: 'Multi-Model Analysis',   desc: 'Decision Tree, Random Forest and Logistic Regression run simultaneously on every prediction for maximum accuracy.' },
    { icon: '📊', title: 'Visual Health Charts',   desc: 'Radar and bar charts show exactly how each of your parameters compares to healthy reference ranges.' },
    { icon: '🩺', title: 'Plain English Results',  desc: 'No medical jargon. We explain your risk factors in simple language anyone can understand.' },
    { icon: '⚡', title: 'Instant Prediction',     desc: 'Results in seconds. No waiting, no appointments, no complicated lab work required.' },
    { icon: '🎯', title: '4 Disease Coverage',     desc: 'Heart Disease, Brain Stroke, Kidney Disease and Diabetes all in one platform.' },
    { icon: '🔒', title: 'Private by Design',      desc: 'Your health data never leaves your browser. No accounts, no storage, no tracking.' },
  ];

  return (
    <section id="features" className="features-section">
      <div className="features-section-inner">

        <div className="section-heading">
          <h2>Why MedPredict</h2>
          <p>Built for early detection and preventive healthcare</p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} delay={i * 100} />
          ))}
        </div>

      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => ref.current?.classList.add('visible'), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div className="feature-card" ref={ref}>
      <div className="feature-icon">{feature.icon}</div>
      <div className="feature-title">{feature.title}</div>
      <p className="feature-desc">{feature.desc}</p>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────── 
function Footer() {
  return (
    <footer className="footer">
      <p>
        Built for early disease detection &amp; preventive care.
        Made with <span>♥</span> — Not a substitute for medical advice.
      </p>
    </footer>
  );
}

// ─── MAIN DASHBOARD VIEW ───────────────────────────── 
function Dashboard({ onSelectDisease }) {
  const diseasesRef = useRef(null);

  const scrollToDiseases = () => {
    document.getElementById('diseases')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dashboard-view">
      <Header onGetStarted={scrollToDiseases} />
      <FloatingElements />

      <HeroSection onGetStarted={scrollToDiseases} />
      <div className="divider" />
      <DiseasesSection onSelectDisease={onSelectDisease} />
      <div className="divider" />
      <HowItWorksSection />
      <div className="divider" />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
// ═══════════════════════════════════════════════════════
// NEW MINI — DISEASE CARD
// Individual clickable card for each disease
// ═══════════════════════════════════════════════════════

const { useEffect, useRef } = React;

function DiseaseCard({ disease, onClick, delay = 0 }) {
  const config  = getDisease(disease);
  const cardRef = useRef(null);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('visible');
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`disease-card ${disease}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{ transitionDelay: `${delay}ms` }}
    >

      {/* Corner decoration */}
      <div className="card-corner" style={{ color: config.color }}>
        <svg viewBox="0 0 80 80" fill="none">
          <circle cx="80" cy="0" r="60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          <circle cx="80" cy="0" r="40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        </svg>
      </div>

      {/* Pulse at bottom right */}
      <div className="card-pulse" />

      {/* Icon */}
      <div className="card-icon-wrap">
        <span style={{ fontSize: '28px' }}>{config.emoji}</span>
      </div>

      {/* Title and description */}
      <h3 className="card-title">{config.name}</h3>
      <p className="card-desc">{config.description}</p>

      {/* Features list */}
      <div className="card-features">
        {config.features.map((feature, i) => (
          <div key={i} className="card-feature">
            <span className="card-feature-dot" />
            {feature}
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className="card-cta">
        <span className="card-cta-text">Start Assessment</span>
        <div className="card-arrow">→</div>
      </div>

    </div>
  );
}
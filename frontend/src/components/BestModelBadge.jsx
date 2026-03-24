// ═══════════════════════════════════════════════════════
// NEW MINI — ANALYSIS SUMMARY BADGE
// Shows analysis complete with confidence — user friendly
// ═══════════════════════════════════════════════════════

const { useEffect, useRef } = React;

function BestModelBadge({ result }) {
  const barRef = useRef(null);

  // Animate confidence bar on mount
  useEffect(() => {
    setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.width = `${result.confidence}%`;
      }
    }, 400);
  }, []);

  const riskConfig = getRiskConfig(result.riskLevel);

  return (
    <div className="best-model-card">

      {/* Icon */}
      <div className="best-model-trophy">🔬</div>

      {/* Info */}
      <div className="best-model-info">
        <div className="best-model-name">Analysis Complete</div>
        <div className="best-model-reason">
          3 AI models analyzed your health data and produced this result
        </div>

        {/* Confidence bar */}
        <div style={{ marginTop: '16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
              Prediction Confidence
            </span>
            <span style={{
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              color: riskConfig.color,
            }}>
              {result.confidence}%
            </span>
          </div>
          <div className="model-bar-track" style={{ height: '10px' }}>
            <div
              ref={barRef}
              className="model-bar-fill best"
              style={{
                width: '0%',
                transition: 'width 1.2s cubic-bezier(0,0,0.2,1) 0.4s',
                background: `linear-gradient(90deg, ${riskConfig.color}, var(--teal-light))`,
                boxShadow: `0 0 12px ${riskConfig.color}40`,
              }}
            />
          </div>
        </div>

        {/* 3 model pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '14px',
          flexWrap: 'wrap',
        }}>
          {['Decision Tree', 'Random Forest', 'Logistic Regression'].map((model, i) => (
            <div key={model} style={{
              padding: '4px 12px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)',
            }}>
              ✓ {model}
            </div>
          ))}
        </div>
      </div>

      {/* Confidence number */}
      <div className="best-model-accuracy">
        <div
          className="accuracy-number"
          style={{ color: riskConfig.color, WebkitTextFillColor: riskConfig.color }}
        >
          {result.confidence}%
        </div>
        <div className="accuracy-label">Confidence</div>
      </div>

    </div>
  );
}
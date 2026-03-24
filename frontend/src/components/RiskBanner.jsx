// ═══════════════════════════════════════════════════════
// NEW MINI — RISK BANNER
// Shows prediction result with confidence circle
// ═══════════════════════════════════════════════════════

const { useEffect, useRef } = React;

function RiskBanner({ result }) {
  const config     = getRiskConfig(result.riskLevel);
  const circleRef  = useRef(null);
  const circumference = 251; // 2 * π * 40

  useEffect(() => {
    if (!circleRef.current) return;
    const offset = circumference - (result.confidence / 100) * circumference;
    setTimeout(() => {
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = offset;
      }
    }, 400);
  }, [result.confidence]);

  return (
    <div className={`risk-banner ${config.bgClass}`}>
      <div className="risk-banner-content">

        {/* Risk icon */}
        <div className="risk-icon-wrap">
          <span style={{ fontSize: '36px' }}>{config.emoji}</span>
        </div>

        {/* Risk info */}
        <div className="risk-info">
          <div className="risk-label">{config.label}</div>
          <div className="risk-prediction">{result.prediction}</div>
          <p className="risk-message">{config.message}</p>
        </div>

        {/* Confidence circle */}
        <div className="confidence-wrap">
          <div className="confidence-circle">
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Track */}
              <circle
                cx="50" cy="50" r="40"
                className="confidence-track"
              />
              {/* Fill */}
              <circle
                ref={circleRef}
                cx="50" cy="50" r="40"
                className="confidence-fill"
                style={{
                  strokeDasharray:  circumference,
                  strokeDashoffset: circumference,
                  transition: 'stroke-dashoffset 1.5s cubic-bezier(0,0,0.2,1) 0.4s',
                }}
              />
            </svg>
            {/* Number inside circle */}
            <div className="confidence-number">
              {Math.round(result.confidence)}%
            </div>
          </div>
          <div className="confidence-label">Confidence</div>
        </div>

      </div>
    </div>
  );
}
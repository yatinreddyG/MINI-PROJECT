// ═══════════════════════════════════════════════════════
// NEW MINI — EXPLANATION
// Plain english explanation + factor tags
// ═══════════════════════════════════════════════════════

function Explanation({ result, disease, userInputs }) {
  const config = getDisease(disease);
  const ranges = config.healthyRanges;

  // Build factor tags from user inputs vs healthy ranges
  const factors = Object.entries(ranges).map(([key, range]) => {
    const userVal     = parseFloat(userInputs[key]) || 0;
    const healthyVal  = range.healthy;
    const normalized  = ((userVal - range.min) / (range.max - range.min)) * 100;
    const healthyNorm = ((healthyVal - range.min) / (range.max - range.min)) * 100;
    const isRisky     = normalized > healthyNorm + 10;
    const label       = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return { key, label, isRisky, userVal };
  });

  const riskyFactors = factors.filter(f => f.isRisky);
  const safeFactors  = factors.filter(f => !f.isRisky);

  return (
    <div className="explanation-card">

      {/* Header */}
      <div className="explanation-header">
        <div className="explanation-icon">🩺</div>
        <div className="explanation-title">What This Means For You</div>
      </div>

      {/* Explanation text from backend */}
      <div className="explanation-text">
        {result.explanation}
      </div>

      {/* Factor tags */}
      {(riskyFactors.length > 0 || safeFactors.length > 0) && (
        <div style={{ marginTop: '20px' }}>

          {/* Risky factors */}
          {riskyFactors.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '8px',
              }}>
                ⚠ Needs Attention
              </div>
              <div className="factor-tags">
                {riskyFactors.map(f => (
                  <div key={f.key} className="factor-tag risk">
                    <span>⬆</span>
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safe factors */}
          {safeFactors.length > 0 && (
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '8px',
              }}>
                ✓ Within Range
              </div>
              <div className="factor-tags">
                {safeFactors.map(f => (
                  <div key={f.key} className="factor-tag safe">
                    <span>✓</span>
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Disclaimer */}
      <div style={{
        marginTop: '20px',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        fontSize: '12px',
        color: 'var(--text-dim)',
        lineHeight: '1.6',
      }}>
        <strong style={{ color: 'var(--text-muted)' }}>Disclaimer:</strong> This
        prediction is for informational purposes only and should not replace
        professional medical advice. Please consult a qualified healthcare
        provider for proper diagnosis and treatment.
      </div>

    </div>
  );
}
// ═══════════════════════════════════════════════════════
// NEW MINI — LOADER
// Full screen analyzing overlay shown during prediction
// ═══════════════════════════════════════════════════════

const { useState, useEffect } = React;

function Loader({ disease }) {
  const [step, setStep]     = useState(0);
  const [progress, setProgress] = useState(0);

  const config = getDisease(disease) || {
    emoji: '🔬', name: 'Disease', color: 'var(--teal)'
  };

  const steps = [
    'Preprocessing your inputs...',
    'Running Decision Tree model...',
    'Running Random Forest model...',
    'Running Logistic Regression...',
    'Selecting best model...',
    'Generating explanation...',
  ];

  useEffect(() => {
    // Step timer
    const stepTimer = setInterval(() => {
      setStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(stepTimer);
        return prev;
      });
    }, 400);

    // Progress timer
    const progTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progTimer);
          return 95;
        }
        return prev + Math.random() * 8;
      });
    }, 150);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progTimer);
    };
  }, []);

  return (
    <div className="analyzing-overlay">

      {/* Pulse ring */}
      <div
        className="analyzing-pulse"
        style={{ background: `rgba(${config.colorRgb}, 0.1)` }}
      >
        <span style={{ fontSize: '42px' }}>{config.emoji}</span>
        <div style={{
          position: 'absolute',
          inset: '-10px',
          borderRadius: '50%',
          border: `2px solid ${config.color}`,
          opacity: 0,
          animation: 'pulse-ring 1.5s ease-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '-10px',
          borderRadius: '50%',
          border: `2px solid ${config.color}`,
          opacity: 0,
          animation: 'pulse-ring 1.5s ease-out 0.75s infinite',
        }} />
      </div>

      {/* Text */}
      <div className="analyzing-text">
        Analyzing {config.name} Risk
      </div>

      {/* Current step */}
      <div
        className="analyzing-sub"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: config.color,
          minHeight: '20px',
          transition: 'all 0.3s',
        }}
      >
        {steps[step]}
      </div>

      {/* Progress bar */}
      <div className="analyzing-bar">
        <div
          className="analyzing-bar-fill"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${config.color}, var(--coral))`,
            transition: 'width 0.15s ease',
            animation: 'none',
          }}
        />
      </div>

      {/* Progress percent */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        color: 'var(--text-dim)',
      }}>
        {Math.round(progress)}%
      </div>

      {/* 3 model dots */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginTop: '8px',
      }}>
        {['DT', 'RF', 'LR'].map((model, i) => (
          <div key={model} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: step > i ? 1 : 0.3,
            transition: 'opacity 0.4s',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: step > i
                ? `rgba(${config.colorRgb}, 0.15)`
                : 'var(--border)',
              border: `1px solid ${step > i ? config.color : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              transition: 'all 0.4s',
            }}>
              {step > i ? '✓' : '○'}
            </div>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: step > i ? config.color : 'var(--text-dim)',
            }}>
              {model}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
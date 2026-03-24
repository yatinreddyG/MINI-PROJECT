// ═══════════════════════════════════════════════════════
// NEW MINI — FLOATING ELEMENTS
// Medical background animations — DNA, ECG, molecules
// ═══════════════════════════════════════════════════════


// ─── ECG SVG ──────────────────────────────────────────
function ECGLine({ style }) {
  return (
    <svg
      viewBox="0 0 800 80"
      style={{
        width: '100%',
        height: '80px',
        ...style,
      }}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        className="ecg-path"
        d="M0 40 L60 40 L80 40 L95 10 L110 70 L125 20 L140 60 L155 40
           L220 40 L240 40 L255 10 L270 70 L285 20 L300 60 L315 40
           L380 40 L400 40 L415 10 L430 70 L445 20 L460 60 L475 40
           L540 40 L560 40 L575 10 L590 70 L605 20 L620 60 L635 40
           L700 40 L720 40 L735 10 L750 70 L765 20 L780 60 L800 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── DNA HELIX SVG ────────────────────────────────────
function DNAHelix({ size = 60, color = 'var(--teal)' }) {
  return (
    <svg
      width={size}
      height={size * 2.5}
      viewBox="0 0 60 150"
      fill="none"
      style={{ color }}
    >
      {/* Left strand */}
      <path
        d="M10 10 Q30 30 50 10 Q30 50 10 30 Q30 70 50 50 Q30 90 10 70 Q30 110 50 90 Q30 130 10 110 Q30 150 50 130"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
        style={{
          strokeDasharray: 400,
          strokeDashoffset: 400,
          animation: 'draw-line 3s ease forwards, ecg-loop 6s linear 3s infinite',
        }}
      />
      {/* Rungs */}
      {[20, 50, 80, 110].map((y, i) => (
        <line
          key={i}
          x1="15"
          y1={y}
          x2="45"
          y2={y}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
      {/* Dots */}
      {[10, 30, 50, 70, 90, 110, 130].map((y, i) => (
        <circle
          key={i}
          cx={i % 2 === 0 ? 10 : 50}
          cy={y}
          r="3.5"
          fill="currentColor"
          opacity="0.7"
          style={{
            animation: `pulse-glow 2s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}

// ─── MOLECULE SVG ─────────────────────────────────────
function Molecule({ size = 80, color = 'var(--coral)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ color }}
    >
      {/* Bonds */}
      <line x1="50" y1="50" x2="20" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="50" x2="80" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="50" x2="20" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="50" x2="80" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Center atom */}
      <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.8"
        style={{ animation: 'pulse-glow 3s ease-in-out infinite' }} />
      {/* Outer atoms */}
      {[
        { cx: 20, cy: 25 }, { cx: 80, cy: 25 },
        { cx: 20, cy: 75 }, { cx: 80, cy: 75 },
        { cx: 50, cy: 15 },
      ].map((pos, i) => (
        <circle
          key={i}
          cx={pos.cx}
          cy={pos.cy}
          r="7"
          fill="currentColor"
          opacity="0.5"
          style={{ animation: `pulse-glow 2.5s ease-in-out ${i * 0.4}s infinite` }}
        />
      ))}
    </svg>
  );
}

// ─── HEARTBEAT SVG ────────────────────────────────────
function HeartBeat({ size = 48, color = 'var(--coral)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ color }}>
      <path
        d="M50 85 C20 60 5 40 5 25 C5 12 15 5 28 5 C38 5 46 12 50 20
           C54 12 62 5 72 5 C85 5 95 12 95 25 C95 40 80 60 50 85Z"
        fill="currentColor"
        style={{ animation: 'heartbeat 1.4s ease-in-out infinite' }}
      />
    </svg>
  );
}

// ─── CROSS / PLUS ─────────────────────────────────────
function MedCross({ size = 40, color = 'var(--sage)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="currentColor" style={{ color }}>
      <rect x="22" y="5"  width="16" height="50" rx="6" opacity="0.8" />
      <rect x="5"  y="22" width="50" height="16" rx="6" opacity="0.8" />
    </svg>
  );
}

// ─── PILL ─────────────────────────────────────────────
function Pill({ size = 50, color = 'var(--blue)' }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 100 50" fill="none" style={{ color }}>
      <rect x="2" y="2" width="96" height="46" rx="23" stroke="currentColor" strokeWidth="3" opacity="0.6" />
      <line x1="50" y1="2" x2="50" y2="48" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <rect x="2" y="2" width="48" height="46" rx="23" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─── MAIN FLOATING ELEMENTS COMPONENT ─────────────────
function FloatingElements() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>

      {/* ── GRADIENT BLOBS ── */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ── DNA TOP LEFT ── */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '3%',
        opacity: 0.18,
        color: 'var(--teal)',
        animation: 'float 9s ease-in-out infinite',
      }}>
        <DNAHelix size={50} />
      </div>

      {/* ── MOLECULE TOP RIGHT ── */}
      <div style={{
        position: 'absolute',
        top: '12%',
        right: '5%',
        opacity: 0.2,
        color: 'var(--coral)',
        animation: 'float-delayed 8s ease-in-out infinite',
      }}>
        <Molecule size={70} />
      </div>

      {/* ── HEARTBEAT LEFT MIDDLE ── */}
      <div style={{
        position: 'absolute',
        top: '42%',
        left: '4%',
        opacity: 0.2,
        color: 'var(--coral)',
        animation: 'float 7s ease-in-out 1s infinite',
      }}>
        <HeartBeat size={52} />
      </div>

      {/* ── MED CROSS RIGHT MIDDLE ── */}
      <div style={{
        position: 'absolute',
        top: '55%',
        right: '6%',
        opacity: 0.18,
        color: 'var(--sage)',
        animation: 'float-delayed 11s ease-in-out infinite',
      }}>
        <MedCross size={44} />
      </div>

      {/* ── DNA BOTTOM RIGHT ── */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        opacity: 0.15,
        color: 'var(--teal-light)',
        animation: 'float 10s ease-in-out 2s infinite',
      }}>
        <DNAHelix size={40} />
      </div>

      {/* ── MOLECULE BOTTOM LEFT ── */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '8%',
        opacity: 0.18,
        color: 'var(--brain-color)',
        animation: 'float-delayed 8s ease-in-out 3s infinite',
      }}>
        <Molecule size={60} />
      </div>

      {/* ── PILL CENTER RIGHT ── */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '2%',
        opacity: 0.15,
        color: 'var(--diabetes-color)',
        animation: 'float 12s ease-in-out 1s infinite',
      }}>
        <Pill size={60} />
      </div>

      {/* ── SMALL CROSSES SCATTERED ── */}
      {[
        { top: '20%', left: '20%',  size: 20, color: 'var(--teal)',        delay: '0s'  },
        { top: '70%', left: '25%',  size: 16, color: 'var(--coral)',       delay: '2s'  },
        { top: '35%', right: '22%', size: 18, color: 'var(--sage)',        delay: '4s'  },
        { top: '80%', right: '30%', size: 14, color: 'var(--teal-light)',  delay: '1s'  },
        { top: '15%', left: '45%',  size: 12, color: 'var(--coral-light)', delay: '3s'  },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top:    item.top,
            left:   item.left,
            right:  item.right,
            opacity: 0.12,
            color: item.color,
            animation: `float ${7 + i}s ease-in-out ${item.delay} infinite`,
          }}
        >
          <MedCross size={item.size} color={item.color} />
        </div>
      ))}

      {/* ── ECG LINE BOTTOM ── */}
      <div className="ecg-container" style={{ color: 'var(--teal)' }}>
        <ECGLine />
      </div>

      {/* ── SECOND ECG LINE (offset) ── */}
      <div style={{
        position: 'fixed',
        top: '8px',
        left: 0,
        width: '100%',
        height: '60px',
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0.08,
        zIndex: 1,
        color: 'var(--coral)',
      }}>
        <ECGLine style={{ animationDelay: '-2s' }} />
      </div>

    </div>
  );
}
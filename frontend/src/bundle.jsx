// Global React hooks
var useState    = React.useState;
var useEffect   = React.useEffect;
var useRef      = React.useRef;
var useCallback = React.useCallback;

// ═══════════════════════════════════════════════════════
// NEW MINI — DISEASES CONFIG
// Single source of truth for all 4 diseases
// ═══════════════════════════════════════════════════════

const DISEASES = {

  // ─── HEART ────────────────────────────────────────────
  heart: {
    id:       'heart',
    name:     'Heart Disease',
    emoji:    '❤️',
    color:    '#ef4444',
    colorRgb: '239, 68, 68',
    apiRoute: 'heart',
    description: 'Evaluate cardiovascular health through blood pressure, cholesterol and heart rate.',
    features: ['Cholesterol Analysis', 'Blood Pressure', 'Heart Rate'],
    fields: [
      {
        key:         'age',
        label:       'Age',
        type:        'number',
        placeholder: '45',
        unit:        'years',
        min:         1,
        max:         120,
        required:    true,
      },
      {
        key:         'sex',
        label:       'Gender',
        type:        'toggle',
        options:     [{ label: '♀ Female', value: 0 }, { label: '♂ Male', value: 1 }],
        required:    true,
      },
      {
        key:         'cp',
        label:       'Chest Pain Type',
        type:        'select',
        options:     [
          { label: 'Typical Angina',     value: 0 },
          { label: 'Atypical Angina',    value: 1 },
          { label: 'Non-Anginal Pain',   value: 2 },
          { label: 'Asymptomatic',       value: 3 },
        ],
        required:    true,
      },
      {
        key:         'trestbps',
        label:       'Resting Blood Pressure',
        type:        'number',
        placeholder: '120',
        unit:        'mm Hg',
        min:         50,
        max:         250,
        required:    true,
      },
      {
        key:         'chol',
        label:       'Cholesterol Level',
        type:        'number',
        placeholder: '200',
        unit:        'mg/dl',
        min:         50,
        max:         700,
        required:    true,
      },
      {
        key:         'fbs',
        label:       'Fasting Blood Sugar > 120',
        type:        'toggle',
        options:     [{ label: '✗ No', value: 0 }, { label: '✓ Yes', value: 1 }],
        required:    true,
      },
      {
        key:         'thalach',
        label:       'Maximum Heart Rate',
        type:        'number',
        placeholder: '150',
        unit:        'bpm',
        min:         50,
        max:         250,
        required:    true,
      },
      {
        key:         'exang',
        label:       'Chest Pain During Exercise',
        type:        'toggle',
        options:     [{ label: '✗ No', value: 0 }, { label: '✓ Yes', value: 1 }],
        required:    true,
      },
    ],
    // Healthy ranges for radar chart
    healthyRanges: {
      age:      { min: 0,   max: 120, healthy: 40  },
      sex:      { min: 0,   max: 1,   healthy: 0   },
      cp:       { min: 0,   max: 3,   healthy: 0   },
      trestbps: { min: 50,  max: 250, healthy: 110 },
      chol:     { min: 50,  max: 700, healthy: 180 },
      fbs:      { min: 0,   max: 1,   healthy: 0   },
      thalach:  { min: 50,  max: 250, healthy: 160 },
      exang:    { min: 0,   max: 1,   healthy: 0   },
    },
  },

  // ─── BRAIN ────────────────────────────────────────────
  brain: {
    id:       'brain',
    name:     'Brain Stroke',
    emoji:    '🧠',
    color:    '#8b5cf6',
    colorRgb: '139, 92, 246',
    apiRoute: 'brain',
    description: 'Assess stroke risk through blood pressure, glucose levels and lifestyle factors.',
    features: ['Glucose Analysis', 'Hypertension Check', 'Lifestyle Factors'],
    fields: [
      {
        key:         'age',
        label:       'Age',
        type:        'number',
        placeholder: '50',
        unit:        'years',
        min:         1,
        max:         120,
        required:    true,
      },
      {
        key:         'gender',
        label:       'Gender',
        type:        'toggle',
        options:     [{ label: '♀ Female', value: 'Female' }, { label: '♂ Male', value: 'Male' }],
        required:    true,
      },
      {
        key:         'hypertension',
        label:       'High Blood Pressure',
        type:        'toggle',
        options:     [{ label: '✗ No', value: 0 }, { label: '✓ Yes', value: 1 }],
        required:    true,
      },
      {
        key:         'heart_disease',
        label:       'Heart Disease History',
        type:        'toggle',
        options:     [{ label: '✗ No', value: 0 }, { label: '✓ Yes', value: 1 }],
        required:    true,
      },
      {
        key:         'avg_glucose_level',
        label:       'Average Blood Sugar',
        type:        'number',
        placeholder: '90',
        unit:        'mg/dl',
        min:         0,
        max:         400,
        required:    true,
      },
      {
        key:      'bmi',
        label:    'BMI',
        type:     'bmi',
        required: true,
      },
      {
        key:     'smoking_status',
        label:   'Smoking Status',
        type:    'select',
        options: [
          { label: 'Never Smoked',     value: 'never smoked' },
          { label: 'Formerly Smoked',  value: 'formerly smoked' },
          { label: 'Currently Smokes', value: 'smokes' },
          { label: 'Unknown',          value: 'Unknown' },
        ],
        required: true,
      },
      {
        key:     'work_type',
        label:   'Work Type',
        type:    'select',
        options: [
          { label: 'Private',       value: 'Private' },
          { label: 'Self Employed', value: 'Self-employed' },
          { label: 'Government',    value: 'Govt_job' },
          { label: 'Other',         value: 'Never_worked' },
        ],
        required: true,
      },
    ],
    healthyRanges: {
      age:               { min: 0,   max: 120, healthy: 35  },
      hypertension:      { min: 0,   max: 1,   healthy: 0   },
      heart_disease:     { min: 0,   max: 1,   healthy: 0   },
      avg_glucose_level: { min: 0,   max: 400, healthy: 90  },
      bmi:               { min: 5,   max: 70,  healthy: 22  },
    },
  },

  // ─── KIDNEY ───────────────────────────────────────────
  kidney: {
    id:       'kidney',
    name:     'Kidney Disease',
    emoji:    '🫘',
    color:    '#f59e0b',
    colorRgb: '245, 158, 11',
    apiRoute: 'kidney',
    description: 'Monitor kidney function through blood pressure, sugar levels and symptoms.',
    features: ['Blood Pressure', 'Sugar Levels', 'Symptom Analysis'],
    fields: [
      {
        key:         'age',
        label:       'Age',
        type:        'number',
        placeholder: '45',
        unit:        'years',
        min:         1,
        max:         120,
        required:    true,
      },
      {
        key:         'blood_pressure',
        label:       'Blood Pressure',
        type:        'number',
        placeholder: '80',
        unit:        'mm Hg',
        min:         50,
        max:         200,
        required:    true,
      },
      {
        key:         'blood_sugar',
        label:       'Blood Sugar Level',
        type:        'number',
        placeholder: '100',
        unit:        'mg/dl',
        min:         50,
        max:         500,
        required:    true,
      },
      {
        key:      'hypertension',
        label:    'High Blood Pressure',
        type:     'toggle',
        options:  [{ label: '✗ No', value: 'no' }, { label: '✓ Yes', value: 'yes' }],
        required: true,
      },
      {
        key:      'diabetes',
        label:    'Diabetes',
        type:     'toggle',
        options:  [{ label: '✗ No', value: 'no' }, { label: '✓ Yes', value: 'yes' }],
        required: true,
      },
      {
        key:      'appetite',
        label:    'Appetite',
        type:     'toggle',
        options:  [{ label: '😊 Good', value: 'good' }, { label: '😔 Poor', value: 'poor' }],
        required: true,
      },
      {
        key:      'swelling',
        label:    'Swelling in Feet',
        type:     'toggle',
        options:  [{ label: '✗ No', value: 'no' }, { label: '✓ Yes', value: 'yes' }],
        required: true,
      },
      {
        key:      'anaemia',
        label:    'Anaemia',
        type:     'toggle',
        options:  [{ label: '✗ No', value: 'no' }, { label: '✓ Yes', value: 'yes' }],
        required: true,
      },
    ],
    healthyRanges: {
      age:            { min: 0,  max: 120, healthy: 35  },
      blood_pressure: { min: 50, max: 200, healthy: 70  },
      blood_sugar:    { min: 50, max: 500, healthy: 100 },
    },
  },

  // ─── DIABETES ─────────────────────────────────────────
  diabetes: {
    id:       'diabetes',
    name:     'Diabetes',
    emoji:    '🩸',
    color:    '#3b82f6',
    colorRgb: '59, 130, 246',
    apiRoute: 'diabetes',
    description: 'Analyze glucose levels, BMI and metabolic indicators to predict diabetes risk.',
    features: ['Glucose Analysis', 'BMI Evaluation', 'Family History'],
    fields: [
      {
        key:         'age',
        label:       'Age',
        type:        'number',
        placeholder: '35',
        unit:        'years',
        min:         1,
        max:         120,
        required:    true,
      },
      {
        key:         'pregnancies',
        label:       'Number of Pregnancies',
        type:        'number',
        placeholder: '0',
        unit:        'count',
        min:         0,
        max:         20,
        required:    true,
      },
      {
        key:         'glucose',
        label:       'Blood Sugar Level',
        type:        'number',
        placeholder: '100',
        unit:        'mg/dl',
        min:         0,
        max:         300,
        required:    true,
      },
      {
        key:         'blood_pressure',
        label:       'Blood Pressure',
        type:        'number',
        placeholder: '72',
        unit:        'mm Hg',
        min:         0,
        max:         150,
        required:    true,
      },
      {
        key:      'bmi',
        label:    'BMI',
        type:     'bmi',
        required: true,
      },
      {
        key:      'pedigree',
        label:    'Family History of Diabetes',
        type:     'toggle',
        options:  [{ label: '✗ No', value: 0.1 }, { label: '✓ Yes', value: 0.8 }],
        required: true,
      },
      {
        key:     'skin_thickness',
        label:   'Physical Activity Level',
        type:    'select',
        options: [
          { label: 'High Activity',     value: 10 },
          { label: 'Moderate Activity', value: 25 },
          { label: 'Low Activity',      value: 40 },
        ],
        required: true,
      },
      {
        key:     'insulin',
        label:   'Diet Type',
        type:    'select',
        options: [
          { label: 'Healthy Diet',   value: 50  },
          { label: 'Moderate Diet',  value: 100 },
          { label: 'Unhealthy Diet', value: 200 },
        ],
        required: true,
      },
    ],
    healthyRanges: {
      age:            { min: 0, max: 120, healthy: 30  },
      pregnancies:    { min: 0, max: 20,  healthy: 0   },
      glucose:        { min: 0, max: 300, healthy: 90  },
      blood_pressure: { min: 0, max: 150, healthy: 70  },
      bmi:            { min: 5, max: 70,  healthy: 22  },
    },
  },
};

// ─── DISEASE LIST (for dashboard cards) ───────────────
const DISEASE_LIST = ['heart', 'brain', 'kidney', 'diabetes'];

// ─── HELPER: get disease config ───────────────────────
function getDisease(id) {
  return DISEASES[id];
}

// ─── HELPER: get all diseases ─────────────────────────
function getAllDiseases() {
  return DISEASE_LIST.map(id => DISEASES[id]);
}
// ═══════════════════════════════════════════════════════
// NEW MINI — API SERVICE
// All fetch calls to Flask backend
// ═══════════════════════════════════════════════════════

const API_BASE = 'http://127.0.0.1:5001';

// ─── HEALTH CHECK ─────────────────────────────────────
async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    console.error('Backend not reachable:', err);
    return null;
  }
}

// ─── MAIN PREDICT FUNCTION ────────────────────────────
async function predictDisease(disease, formData) {
  try {
    const res = await fetch(`${API_BASE}/predict/${disease}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Prediction failed');
    }

    return { success: true, data };

  } catch (err) {
    return {
      success: false,
      error: err.message || 'Could not connect to backend. Make sure Flask is running on port 5001.'
    };
  }
}
// ═══════════════════════════════════════════════════════
// NEW MINI — FORMAT RESULT UTILITY
// Shapes API response for frontend components
// ═══════════════════════════════════════════════════════

// ─── FORMAT FULL RESULT ───────────────────────────────
function formatResult(apiResponse) {
  const {
    disease,
    best_model,
    prediction,
    confidence,
    risk_level,
    model_accuracies,
    explanation,
  } = apiResponse;

  return {
    disease,
    bestModel:       best_model,
    prediction,
    confidence,
    riskLevel:       risk_level,       // 'high' | 'moderate' | 'low'
    isHighRisk:      prediction === 'High Risk',
    modelAccuracies: model_accuracies,
    explanation,
    confidencePct:   confidence,       // already a number 0-100
  };
}

// ─── GET RISK CONFIG ──────────────────────────────────
function getRiskConfig(riskLevel) {
  const configs = {
    high: {
      emoji:       '⚠️',
      label:       'High Risk',
      message:     'Your parameters indicate elevated risk. Please consult a healthcare professional promptly.',
      color:       '#ef4444',
      colorRgb:    '239, 68, 68',
      bgClass:     'high',
    },
    moderate: {
      emoji:       '⚡',
      label:       'Moderate Risk',
      message:     'Some indicators suggest moderate risk. Consider consulting a healthcare professional.',
      color:       '#f59e0b',
      colorRgb:    '245, 158, 11',
      bgClass:     'moderate',
    },
    low: {
      emoji:       '✅',
      label:       'Low Risk',
      message:     'Your health parameters indicate a low risk. Continue maintaining a healthy lifestyle.',
      color:       '#22c55e',
      colorRgb:    '34, 197, 94',
      bgClass:     'low',
    },
  };
  return configs[riskLevel] || configs.low;
}

// ─── GET MODEL DISPLAY NAME ───────────────────────────
function getModelName(key) {
  const names = {
    'Decision Tree':       'Decision Tree',
    'Random Forest':       'Random Forest',
    'Logistic Regression': 'Logistic Regression',
  };
  return names[key] || key;
}

// ─── NORMALIZE VALUE 0-100 FOR RADAR CHART ────────────
function normalizeValue(value, min, max) {
  if (max === min) return 0;
  return Math.round(((value - min) / (max - min)) * 100);
}

// ─── BUILD RADAR DATA FROM USER INPUTS ────────────────
function buildRadarData(disease, userInputs) {
  const config  = getDisease(disease);
  const ranges  = config.healthyRanges;
  const labels  = [];
  const user    = [];
  const healthy = [];

  Object.entries(ranges).forEach(([key, range]) => {
    const userVal    = parseFloat(userInputs[key]) || 0;
    const healthyVal = range.healthy;
    labels.push(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    user.push(normalizeValue(userVal, range.min, range.max));
    healthy.push(normalizeValue(healthyVal, range.min, range.max));
  });

  return { labels, user, healthy };
}

// ─── BUILD BAR DATA FROM MODEL ACCURACIES ─────────────
function buildBarData(modelAccuracies, bestModel) {
  const labels = Object.keys(modelAccuracies);
  const values = Object.values(modelAccuracies);
  const isBest = labels.map(l => l === bestModel);
  return { labels, values, isBest };
}
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
// ═══════════════════════════════════════════════════════
// NEW MINI — LOADER
// Full screen analyzing overlay shown during prediction
// ═══════════════════════════════════════════════════════


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
// ═══════════════════════════════════════════════════════
// NEW MINI — DISEASE CARD
// Individual clickable card for each disease
// ═══════════════════════════════════════════════════════


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
// ═══════════════════════════════════════════════════════
// NEW MINI — RISK BANNER
// Shows prediction result with confidence circle
// ═══════════════════════════════════════════════════════


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
// ═══════════════════════════════════════════════════════
// NEW MINI — ANALYSIS SUMMARY BADGE
// Shows analysis complete with confidence — user friendly
// ═══════════════════════════════════════════════════════


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
// ═══════════════════════════════════════════════════════
// NEW MINI — RADAR CHART
// User values vs healthy ranges using Chart.js
// ═══════════════════════════════════════════════════════


function RadarChart({ disease, userInputs }) {
  const canvasRef  = useRef(null);
  const chartRef   = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !userInputs) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const { labels, user, healthy } = buildRadarData(disease, userInputs);
    const config = getDisease(disease);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label:                'Your Values',
            data:                 user,
            borderColor:          config.color,
            backgroundColor:      `rgba(${config.colorRgb}, 0.15)`,
            borderWidth:          2,
            pointBackgroundColor: config.color,
            pointBorderColor:     '#fff',
            pointBorderWidth:     2,
            pointRadius:          5,
            pointHoverRadius:     7,
          },
          {
            label:                'Healthy Range',
            data:                 healthy,
            borderColor:          'rgba(100, 200, 180, 0.7)',
            backgroundColor:      'rgba(100, 200, 180, 0.08)',
            borderWidth:          2,
            borderDash:           [6, 3],
            pointBackgroundColor: 'rgba(100, 200, 180, 0.7)',
            pointBorderColor:     '#fff',
            pointBorderWidth:     2,
            pointRadius:          4,
            pointHoverRadius:     6,
          },
        ],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: true,
        animation: {
          duration: 1000,
          easing:   'easeOutQuart',
        },
        scales: {
          r: {
            min:         0,
            max:         100,
            beginAtZero: true,
            ticks: { display: false, stepSize: 25 },
            grid:        { color: 'rgba(255,255,255,0.06)' },
            angleLines:  { color: 'rgba(255,255,255,0.06)' },
            pointLabels: {
              color:  'rgba(255,255,255,0.6)',
              font:   { size: 11, family: 'DM Sans' },
              padding: 12,
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color:         'rgba(255,255,255,0.5)',
              font:          { size: 11, family: 'DM Sans' },
              padding:       16,
              boxWidth:      12,
              boxHeight:     12,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(10,12,20,0.95)',
            borderColor:     'rgba(255,255,255,0.08)',
            borderWidth:     1,
            titleColor:      '#fff',
            bodyColor:       'rgba(255,255,255,0.6)',
            padding:         12,
            cornerRadius:    10,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [disease, userInputs]);

  return (
    <div className="chart-card" style={{ animationDelay: '0.3s' }}>
      <div className="chart-card-title">Health Parameters</div>
      <div className="chart-card-subtitle">
        Your values vs healthy reference range
      </div>
      <div className="chart-canvas-wrap">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════
// NEW MINI — BAR CHART
// Health parameter risk levels — green=safe, red=risky
// ═══════════════════════════════════════════════════════


function BarChart({ disease, userInputs }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !userInputs) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const config  = getDisease(disease);
    const ranges  = config.healthyRanges;

    const labels  = [];
    const values  = [];
    const healthy = [];
    const colors  = [];
    const borders = [];

    Object.entries(ranges).forEach(([key, range]) => {
      const userVal    = parseFloat(userInputs[key]) || 0;
      const healthyVal = range.healthy;
      const normalized = Math.round(((userVal - range.min) / (range.max - range.min)) * 100);
      const healthyNorm= Math.round(((healthyVal - range.min) / (range.max - range.min)) * 100);
      const isRisky    = normalized > healthyNorm + 10;

      labels.push(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      values.push(normalized);
      healthy.push(healthyNorm);

      colors.push(isRisky
        ? 'rgba(239, 68, 68, 0.7)'
        : 'rgba(34, 197, 94, 0.7)'
      );
      borders.push(isRisky
        ? 'rgba(239, 68, 68, 1)'
        : 'rgba(34, 197, 94, 1)'
      );
    });

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label:           'Your Level',
            data:            values,
            backgroundColor: colors,
            borderColor:     borders,
            borderWidth:     1,
            borderRadius:    8,
            borderSkipped:   false,
          },
          {
            label:           'Healthy Range',
            data:            healthy,
            backgroundColor: 'rgba(100, 200, 180, 0.12)',
            borderColor:     'rgba(100, 200, 180, 0.5)',
            borderWidth:     1,
            borderRadius:    8,
            borderSkipped:   false,
            borderDash:      [4, 4],
          },
        ],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: true,
        animation: {
          duration: 900,
          easing:   'easeOutQuart',
          delay:    ctx => ctx.dataIndex * 120,
        },
        scales: {
          x: {
            grid:   { display: false },
            ticks: {
              color: 'rgba(255,255,255,0.45)',
              font:  { size: 10, family: 'DM Sans' },
              maxRotation: 30,
            },
            border: { color: 'rgba(255,255,255,0.06)' },
          },
          y: {
            min:  0,
            max:  100,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: {
              color:    'rgba(255,255,255,0.35)',
              font:     { size: 10, family: 'DM Mono' },
              callback: val => `${val}%`,
              stepSize: 25,
            },
            border: { color: 'rgba(255,255,255,0.06)' },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color:         'rgba(255,255,255,0.5)',
              font:          { size: 11, family: 'DM Sans' },
              padding:       16,
              boxWidth:      12,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(10,12,20,0.95)',
            borderColor:     'rgba(255,255,255,0.08)',
            borderWidth:     1,
            titleColor:      '#fff',
            bodyColor:       'rgba(255,255,255,0.6)',
            padding:         12,
            cornerRadius:    10,
            callbacks: {
              label: ctx => {
                const status = ctx.datasetIndex === 0
                  ? (ctx.raw > (healthy[ctx.dataIndex] + 10) ? ' ⚠ Above healthy range' : ' ✓ Within healthy range')
                  : ' Healthy reference';
                return ` ${ctx.dataset.label}: ${ctx.raw}%${status}`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [disease, userInputs]);

  return (
    <div className="chart-card" style={{ animationDelay: '0.4s' }}>
      <div className="chart-card-title">Risk Factor Analysis</div>
      <div className="chart-card-subtitle">
        🔴 Above healthy range &nbsp;|&nbsp; 🟢 Within healthy range
      </div>
      <div className="chart-canvas-wrap">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
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
// ═══════════════════════════════════════════════════════
// NEW MINI — FORM VIEW
// Dynamic prediction form for all 4 diseases
// ═══════════════════════════════════════════════════════


// ─── NUMBER INPUT ──────────────────────────────────── 
function NumberInput({ field, value, onChange, disease, index }) {
  return (
    <div
      className="field-wrap"
      style={{ animationDelay: `${0.05 * index}s` }}
    >
      <label className="field-label" htmlFor={field.key}>
        {field.label}
        {field.unit && <span className="field-unit">({field.unit})</span>}
        <span className="field-required">*</span>
      </label>
      <input
        id={field.key}
        type="number"
        className={`field-input ${disease}-focus`}
        placeholder={field.placeholder}
        value={value || ''}
        min={field.min}
        max={field.max}
        step="any"
        required
        onChange={e => onChange(field.key, e.target.value)}
      />
    </div>
  );
}

// ─── TOGGLE INPUT ──────────────────────────────────── 
function ToggleInput({ field, value, onChange, disease, index }) {
  return (
    <div
      className="field-wrap"
      style={{ animationDelay: `${0.05 * index}s` }}
    >
      <label className="field-label">
        {field.label}
        <span className="field-required">*</span>
      </label>
      <div className={`toggle-wrap ${disease}-toggle`}>
        {field.options.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`toggle-btn ${value === opt.value ? 'active' : ''}`}
            onClick={() => onChange(field.key, opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SELECT INPUT ───────────────────────────────────── 
function SelectInput({ field, value, onChange, disease, index }) {
  return (
    <div
      className="field-wrap"
      style={{ animationDelay: `${0.05 * index}s` }}
    >
      <label className="field-label" htmlFor={field.key}>
        {field.label}
        <span className="field-required">*</span>
      </label>
      <select
        id={field.key}
        className="field-select"
        value={value !== undefined ? value : ''}
        required
        onChange={e => {
          const val = isNaN(e.target.value) ? e.target.value : Number(e.target.value);
          onChange(field.key, val);
        }}
      >
        <option value="" disabled>Select an option</option>
        {field.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

// ─── BMI WIDGET ─────────────────────────────────────── 
function BMIWidget({ value, onChange, disease, index }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi,    setBmi]    = useState(null);
  const [cat,    setCat]    = useState('');

  const calcBMI = (h, w) => {
    const hm = parseFloat(h) / 100;
    const wk = parseFloat(w);
    if (!hm || !wk || hm <= 0) return;
    const b = (wk / (hm * hm)).toFixed(1);
    setBmi(b);
    onChange('bmi', parseFloat(b));

    if (b < 18.5)      setCat('bmi-underweight');
    else if (b < 25)   setCat('bmi-normal');
    else if (b < 30)   setCat('bmi-overweight');
    else               setCat('bmi-obese');
  };

  const catLabel = {
    'bmi-underweight': 'Underweight',
    'bmi-normal':      'Normal',
    'bmi-overweight':  'Overweight',
    'bmi-obese':       'Obese',
  };

  return (
    <div style={{
      gridColumn: '1 / -1',
      background: 'rgba(100, 200, 180, 0.04)',
      border: '1px solid rgba(100, 200, 180, 0.15)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      opacity: 0,
      animation: `slide-up 0.4s var(--ease-out) ${0.05 * index}s forwards`,
    }}>
      <div className="bmi-widget-title">BMI Calculator</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr auto',
        gap: '16px',
        alignItems: 'end',
      }}>

        {/* Height */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="field-label">
            Height <span className="field-unit">(cm)</span>
            <span className="field-required">*</span>
          </label>
          <input
            type="number"
            className="field-input"
            placeholder="170"
            value={height}
            min="50" max="250"
            onChange={e => { setHeight(e.target.value); calcBMI(e.target.value, weight); }}
          />
        </div>

        {/* Weight */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="field-label">
            Weight <span className="field-unit">(kg)</span>
            <span className="field-required">*</span>
          </label>
          <input
            type="number"
            className="field-input"
            placeholder="70"
            value={weight}
            min="10" max="300"
            onChange={e => { setWeight(e.target.value); calcBMI(height, e.target.value); }}
          />
        </div>

        {/* BMI Result */}
        <div className="bmi-result">
          <span className="bmi-result-label">BMI</span>
          <span className="bmi-result-value">{bmi || '—'}</span>
          {bmi && (
            <span className={`bmi-category ${cat}`}>
              {catLabel[cat]}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── RENDER FIELD ────────────────────────────────────── 
function renderField(field, value, onChange, disease, index) {
  switch (field.type) {
    case 'number': return <NumberInput key={field.key} field={field} value={value} onChange={onChange} disease={disease} index={index} />;
    case 'toggle': return <ToggleInput key={field.key} field={field} value={value} onChange={onChange} disease={disease} index={index} />;
    case 'select': return <SelectInput key={field.key} field={field} value={value} onChange={onChange} disease={disease} index={index} />;
    case 'bmi':    return <BMIWidget   key={field.key} value={value} onChange={onChange} disease={disease} index={index} />;
    default:       return null;
  }
}

// ─── MAIN FORM VIEW ──────────────────────────────────── 
function FormView({ disease, onBack, onSubmit, isLoading }) {
  const config              = getDisease(disease);
  const [formData, setFormData] = useState({});
  const [errors,   setErrors]   = useState({});

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev  => ({ ...prev, [key]: false }));
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;
    config.fields.forEach(field => {
      const val = formData[field.key];
      if (val === undefined || val === null || val === '') {
        newErrors[field.key] = true;
        valid = false;
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      const firstErr = config.fields.find(f => errors[f.key] || formData[f.key] === undefined);
      if (firstErr) {
        document.getElementById(firstErr.key)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="form-view">
      <div className="form-inner">

        {/* Back button */}
        <button className="back-btn" onClick={onBack} type="button">
          ← Back to Disease Selection
        </button>

        {/* Header */}
        <div className="form-header">
          <div className={`form-disease-badge ${disease}`}>
            {config.emoji} {config.name}
          </div>
          <h1 className="form-title">{config.name} Risk Assessment</h1>
          <p className="form-subtitle">
            Enter your health parameters below. All fields are required for accurate prediction.
          </p>
        </div>

        {/* Form card */}
        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>

            <div className="form-section-label">Health Parameters</div>

            <div className="form-grid">
              {config.fields.map((field, i) =>
                renderField(field, formData[field.key], handleChange, disease, i)
              )}
            </div>

            {/* Error summary */}
            {Object.values(errors).some(Boolean) && (
              <div style={{
                padding: '12px 16px',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                color: '#f87171',
                marginBottom: '20px',
              }}>
                ⚠ Please fill in all required fields before submitting.
              </div>
            )}

            <div className="form-divider" />

            {/* Submit */}
            <button
              type="submit"
              className={`submit-btn ${disease}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  {config.emoji} Predict {config.name} Risk
                </>
              )}
            </button>

            {/* Disclaimer */}
            <div className="form-disclaimer">
              <strong>Note:</strong> This tool is for informational purposes only.
              It does not replace professional medical advice or diagnosis.
            </div>

          </form>
        </div>

      </div>

      {/* Loader overlay */}
      {isLoading && <Loader disease={disease} />}

    </div>
  );
}
// ═══════════════════════════════════════════════════════
// NEW MINI — RESULTS VIEW
// Full results page — risk banner, charts, explanation
// ═══════════════════════════════════════════════════════


function ResultsView({ disease, result, userInputs, onBack, onReset }) {
  const config     = getDisease(disease);
  const formatted  = formatResult(result);
  const riskConfig = getRiskConfig(formatted.riskLevel);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="results-view">
      <div className="results-inner">

        {/* ── HEADER ── */}
        <div className="results-header">
          <div className="results-title-wrap">
            <h1>
              {config.emoji} {config.name} Assessment
            </h1>
            <p>Based on your health parameters</p>
          </div>
          <div className="results-actions">
            <button className="btn-ghost" onClick={onBack}>
              ← Modify Inputs
            </button>
            <button className="btn-ghost" onClick={onReset}>
              ↺ New Prediction
            </button>
          </div>
        </div>

        {/* ── RISK BANNER ── */}
        <RiskBanner result={formatted} />

        {/* ── ANALYSIS SUMMARY ── */}
        <BestModelBadge result={formatted} />

        {/* ── CHARTS ROW ── */}
        <div className="charts-row">
          <RadarChart
            disease={disease}
            userInputs={userInputs}
          />
          <BarChart
            disease={disease}
            userInputs={userInputs}
          />
        </div>

        {/* ── EXPLANATION ── */}
        <Explanation
          result={formatted}
          disease={disease}
          userInputs={userInputs}
        />

        {/* ── RECOMMENDATIONS ── */}
        <RecommendationsCard riskLevel={formatted.riskLevel} disease={disease} />

        {/* ── DISCLAIMER ── */}
        <div className="results-disclaimer">
          <strong>Medical Disclaimer:</strong> This prediction is generated by machine
          learning models for informational purposes only. It is not a medical diagnosis.
          Please consult a qualified healthcare professional for proper evaluation and treatment.
        </div>

        {/* ── BOTTOM ACTIONS ── */}
        <div className="results-bottom-actions">
          <button className="btn-primary" onClick={onReset}>
            <span>↺ Start New Prediction</span>
          </button>
          <button className="btn-ghost" onClick={onBack}>
            ← Modify Parameters
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── RECOMMENDATIONS CARD ─────────────────────────────
function RecommendationsCard({ riskLevel, disease }) {
  const allRecs = {
    low: [
      { icon: '🥗', title: 'Maintain Healthy Diet',   desc: 'Continue with balanced nutrition rich in fruits, vegetables and whole grains.' },
      { icon: '🏃', title: 'Regular Exercise',         desc: 'Keep up 150 minutes of moderate physical activity every week.' },
      { icon: '😴', title: 'Quality Sleep',            desc: 'Maintain 7 to 9 hours of restful sleep each night for optimal health.' },
      { icon: '🩺', title: 'Annual Checkup',           desc: 'Keep scheduling routine health checkups even when you feel well.' },
    ],
    moderate: [
      { icon: '👨‍⚕️', title: 'Schedule a Checkup',   desc: 'Visit your healthcare provider soon for a proper evaluation of your parameters.' },
      { icon: '🥗', title: 'Improve Your Diet',        desc: 'Reduce processed foods, sugar and sodium. Focus on whole and natural foods.' },
      { icon: '🏃', title: 'Increase Activity',        desc: 'Aim for at least 30 minutes of physical activity every day.' },
      { icon: '📋', title: 'Monitor Symptoms',         desc: 'Track any new or worsening symptoms and report them to your doctor promptly.' },
    ],
    high: [
      { icon: '🚨', title: 'Consult a Doctor Soon',    desc: 'Please schedule an appointment with a specialist as soon as possible.' },
      { icon: '💊', title: 'Review Medications',       desc: 'Discuss preventive treatments and medication options with your healthcare provider.' },
      { icon: '🔄', title: 'Lifestyle Changes',        desc: 'Make immediate changes to your diet, exercise routine and stress management.' },
      { icon: '📊', title: 'Regular Monitoring',       desc: 'Establish a routine health monitoring schedule with your medical team.' },
    ],
  };

  const diseaseRec = {
    heart:    { icon: '❤️',  title: 'Heart Health',    desc: 'Limit saturated fats, quit smoking and manage stress for better cardiovascular health.' },
    brain:    { icon: '🧠',  title: 'Brain Health',    desc: 'Control blood pressure, maintain healthy glucose and stay mentally active.' },
    kidney:   { icon: '🫘',  title: 'Kidney Care',     desc: 'Stay hydrated, control blood pressure, limit sodium and avoid overuse of painkillers.' },
    diabetes: { icon: '🩸',  title: 'Blood Sugar',     desc: 'Monitor glucose regularly, reduce carbs and maintain a healthy body weight.' },
  };

  const recs = [diseaseRec[disease], ...allRecs[riskLevel]];

  return (
    <div
      className="explanation-card"
      style={{ animationDelay: '0.6s' }}
    >
      <div className="explanation-header">
        <div className="explanation-icon">💡</div>
        <div className="explanation-title">Personalized Recommendations</div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
      }}>
        {recs.map((rec, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '12px',
              padding: '14px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-md)',
              transition: 'all 0.3s var(--ease-smooth)',
              cursor: 'default',
              opacity: 0,
              animation: `slide-up 0.4s var(--ease-out) ${0.6 + i * 0.08}s forwards`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--teal-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
            }}>
              {rec.icon}
            </div>
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text)',
                marginBottom: '4px',
                fontFamily: 'var(--font-display)',
              }}>
                {rec.title}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                lineHeight: '1.5',
              }}>
                {rec.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════
// NEW MINI — APP.JSX
// Main app — view switching, state, API calls
// ═══════════════════════════════════════════════════════


// ─── VIEW TRANSITION WRAPPER ──────────────────────────
function ViewWrapper({ children, viewKey }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, [viewKey]);

  return (
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.45s cubic-bezier(0,0,0.2,1), transform 0.45s cubic-bezier(0,0,0.2,1)',
    }}>
      {children}
    </div>
  );
}

// ─── ERROR TOAST ──────────────────────────────────────
function ErrorToast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position:     'fixed',
      bottom:       '32px',
      left:         '50%',
      transform:    'translateX(-50%)',
      zIndex:       999,
      background:   'rgba(239,68,68,0.12)',
      border:       '1px solid rgba(239,68,68,0.3)',
      borderRadius: 'var(--radius-lg)',
      padding:      '14px 24px',
      display:      'flex',
      alignItems:   'center',
      gap:          '12px',
      backdropFilter: 'blur(20px)',
      boxShadow:    '0 8px 32px rgba(0,0,0,0.3)',
      animation:    'slide-up 0.3s var(--ease-bounce) forwards',
      maxWidth:     '480px',
      width:        '90%',
    }}>
      <span style={{ fontSize: '20px' }}>⚠️</span>
      <span style={{ fontSize: '14px', color: '#f87171', flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border:     'none',
          color:      'var(--text-dim)',
          cursor:     'pointer',
          fontSize:   '18px',
          lineHeight: 1,
          padding:    '0 4px',
        }}
      >×</button>
    </div>
  );
}

// ─── BACKEND STATUS ───────────────────────────────────
function BackendStatus({ status }) {
  if (status === 'ok') return null;

  return (
    <div style={{
      position:   'fixed',
      top:        '80px',
      right:      '24px',
      zIndex:     200,
      padding:    '8px 16px',
      background: status === 'checking'
        ? 'rgba(100,200,180,0.1)'
        : 'rgba(239,68,68,0.1)',
      border: `1px solid ${status === 'checking'
        ? 'rgba(100,200,180,0.2)'
        : 'rgba(239,68,68,0.2)'}`,
      borderRadius: 'var(--radius-full)',
      fontSize:   '12px',
      color: status === 'checking'
        ? 'var(--teal-light)'
        : '#f87171',
      backdropFilter: 'blur(10px)',
      display:    'flex',
      alignItems: 'center',
      gap:        '8px',
    }}>
      <span style={{
        width:        '6px',
        height:       '6px',
        borderRadius: '50%',
        background:   status === 'checking' ? 'var(--teal)' : '#ef4444',
        animation:    'pulse-glow 1.5s ease-in-out infinite',
        display:      'inline-block',
      }} />
      {status === 'checking' ? 'Connecting to backend...' : 'Backend offline — start Flask on port 5001'}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────
function App() {
  const [view,       setView]       = useState('dashboard');
  const [disease,    setDisease]    = useState(null);
  const [result,     setResult]     = useState(null);
  const [userInputs, setUserInputs] = useState(null);
  const [isLoading,  setIsLoading]  = useState(false);
  const [error,      setError]      = useState(null);
  const [backend,    setBackend]    = useState('checking');

  // ── Check backend on load ──
  useEffect(() => {
    checkHealth().then(res => {
      setBackend(res ? 'ok' : 'offline');
    });
  }, []);

  // ── Scroll to top on view change ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // ── Handlers ──
  const handleSelectDisease = (id) => {
    setDisease(id);
    setResult(null);
    setUserInputs(null);
    setView('form');
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setUserInputs(formData);

    const res = await predictDisease(disease, formData);

    setIsLoading(false);

    if (res.success) {
      setResult(res.data);
      setView('results');
    } else {
      setError(res.error);
    }
  };

  const handleBack = () => {
    setView('dashboard');
    setDisease(null);
    setResult(null);
    setUserInputs(null);
  };

  const handleBackToForm = () => {
    setView('form');
  };

  const handleReset = () => {
    setView('dashboard');
    setDisease(null);
    setResult(null);
    setUserInputs(null);
  };

  // ── Render ──
  return (
    <div>

      {/* Backend status indicator */}
      <BackendStatus status={backend} />

      {/* Error toast */}
      {error && (
        <ErrorToast
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Views */}
      {view === 'dashboard' && (
        <ViewWrapper viewKey="dashboard">
          <Dashboard onSelectDisease={handleSelectDisease} />
        </ViewWrapper>
      )}

      {view === 'form' && disease && (
        <ViewWrapper viewKey={`form-${disease}`}>
          <FloatingElements />
          <FormView
            disease={disease}
            onBack={handleBack}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        </ViewWrapper>
      )}

      {view === 'results' && result && disease && (
        <ViewWrapper viewKey="results">
          <FloatingElements />
          <ResultsView
            disease={disease}
            result={result}
            userInputs={userInputs}
            onBack={handleBackToForm}
            onReset={handleReset}
          />
        </ViewWrapper>
      )}

    </div>
  );
}

// ─── MOUNT ────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
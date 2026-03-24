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
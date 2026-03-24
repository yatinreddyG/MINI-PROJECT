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
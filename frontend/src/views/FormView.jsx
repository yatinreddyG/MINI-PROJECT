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
    <div
      className="field-wrap bmi-widget"
      style={{ animationDelay: `${0.05 * index}s` }}
    >
      <div className="bmi-widget-title">BMI Calculator</div>
      <div className="bmi-inputs">

        <div className="field-wrap" style={{ animation: 'none' }}>
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

        <div className="field-wrap" style={{ animation: 'none' }}>
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
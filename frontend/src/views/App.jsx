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
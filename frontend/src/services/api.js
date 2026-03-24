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
// ═══════════════════════════════════════════════════════
// NEW MINI — BAR CHART
// Health parameter risk levels — green=safe, red=risky
// ═══════════════════════════════════════════════════════

const { useEffect, useRef } = React;

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
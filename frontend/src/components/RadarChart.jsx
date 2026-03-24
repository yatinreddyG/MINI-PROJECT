// ═══════════════════════════════════════════════════════
// NEW MINI — RADAR CHART
// User values vs healthy ranges using Chart.js
// ═══════════════════════════════════════════════════════

const { useEffect, useRef } = React;

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
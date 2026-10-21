const metrics = [
  { label: 'Mean beta', value: '0.41', delta: '+4.2%', meta: 'vs prior week' },
  { label: 'Signal score', value: '82.6', delta: '+6.1%', meta: 'market confidence' },
  { label: 'Avg lag', value: '6.5d', delta: '-1.2d', meta: 'response time' },
  { label: 'Meeting impact', value: '1.28x', delta: '+0.15x', meta: 'post-FOMC lift' }
];

const evidenceRows = [
  { metric: 'Connected frequency', reading: 'High', signal: 'Strong', beta: '0.43', lag: '5.8d' },
  { metric: 'Modern lags', reading: 'Moderate', signal: 'Watch', beta: '0.36', lag: '7.1d' },
  { metric: 'Meeting T20', reading: 'Elevated', signal: 'Strong', beta: '0.49', lag: '4.9d' },
  { metric: 'Rev shares', reading: 'Stable', signal: 'Stable', beta: '0.29', lag: '8.2d' },
  { metric: 'Qlike tests', reading: 'Improved', signal: 'Strong', beta: '0.44', lag: '6.1d' }
];

const kpiRow = document.getElementById('kpiRow');

metrics.forEach((item) => {
  const card = document.createElement('article');
  card.className = 'kpi-card';
  card.innerHTML = `
    <div class="label">
      <span>${item.label}</span>
      <span class="delta">${item.delta}</span>
    </div>
    <div class="value">${item.value}</div>
    <div class="meta">${item.meta}</div>
  `;
  kpiRow.appendChild(card);
});

new Chart(document.getElementById('signalChart'), {
  type: 'bar',
  data: {
    labels: ['Fed', 'Rates', 'Inflation', 'Growth', 'Credit', 'Sentiment'],
    datasets: [{
      label: 'Signal strength',
      data: [72, 84, 91, 77, 68, 86],
      backgroundColor: ['#62d6ff', '#70e0a3', '#ffbe5c', '#b69dff', '#ff7f7f', '#85d0ff'],
      borderRadius: 8,
      borderSkipped: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.08)' }, ticks: { color: '#9fafd6' } },
      x: { grid: { display: false }, ticks: { color: '#9fafd6' } }
    }
  }
});

new Chart(document.getElementById('regimeChart'), {
  type: 'doughnut',
  data: {
    labels: ['Expansion', 'Cooling', 'Risk-off'],
    datasets: [{
      data: [48, 31, 21],
      backgroundColor: ['#62d6ff', '#53d7a2', '#ffbe5c'],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        labels: {
          color: '#ecf2ff',
          usePointStyle: true,
          boxWidth: 8
        }
      }
    }
  }
});

new Chart(document.getElementById('pathChart'), {
  type: 'line',
  data: {
    labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
    datasets: [{
      label: 'Expected repricing',
      data: [0.36, 0.44, 0.57, 0.63, 0.7, 0.82],
      borderColor: '#62d6ff',
      backgroundColor: 'rgba(98,214,255,0.15)',
      pointBackgroundColor: '#62d6ff',
      pointBorderColor: '#dff8ff',
      pointRadius: 4,
      borderWidth: 2,
      fill: true,
      tension: 0.38
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 1, grid: { color: 'rgba(255,255,255,0.08)' }, ticks: { color: '#9fafd6' } },
      x: { grid: { display: false }, ticks: { color: '#9fafd6' } }
    }
  }
});

const tableBody = document.getElementById('evidenceTable');
const signalClass = (signal) => signal === 'Strong' ? 'signal-good' : signal === 'Watch' ? 'signal-watch' : '';

evidenceRows.forEach((row) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${row.metric}</td>
    <td>${row.reading}</td>
    <td class="${signalClass(row.signal)}">${row.signal}</td>
    <td>${row.beta}</td>
    <td>${row.lag}</td>
  `;
  tableBody.appendChild(tr);
});

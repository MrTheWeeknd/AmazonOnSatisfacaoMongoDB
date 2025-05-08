async function renderMealChoices() {
  try {
    const res = await fetch(`${API_BASE}/satisfacao`);
    if (!res.ok) throw new Error('Falha ao buscar dados de refeição');
    const data = await res.json();
    const categorias = ['proteina', 'carboidrato', 'salada', 'sobremesa'];

    let html = `<h2 class="titulo">Preferências de Refeições</h2>`;
    categorias.forEach(cat => {
      html += `<div class="mb-5">
        <h5>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h5>
        <canvas id="chart_${cat}" class="administracao__refeicao__canva"></canvas>
      </div>`;
    });
    document.getElementById('adminContent').innerHTML = html;

    categorias.forEach(cat => {
      const contagem = {};
      data.forEach(r => {
        const item = r.escolhaCardapio?.[cat];
        if (item) contagem[item] = (contagem[item] || 0) + 1;
      });

      const ctx = document.getElementById(`chart_${cat}`).getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(contagem),
          datasets: [{
            data: Object.values(contagem),
            backgroundColor: ['#C4E1F6', '#FEEE91', '#FFBD73', '#FF9D3D', '#4B8DAA'],
          }]
        },
        options: {
          plugins: {
            legend: { position: 'right' },
            tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}` } }
          }
        }
      });
    });
  } catch (err) {
    console.error('Erro ao carregar dados de refeição:', err);
  }
}
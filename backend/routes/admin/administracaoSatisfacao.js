;(function() {

  async function renderSatisfaction() {
    try {
      const res = await fetch(`${API_BASE}/satisfacao`);
      if (!res.ok) throw new Error('Falha ao buscar respostas');
      const data = await res.json();

      const setores = [...new Set(data.map(d => d.setor))];
      const html = `
        <h2 class="administracao__satisfacao__titulo">Satisfação dos Usuários</h2>
        <label for="setorFiltro" class="administracao__satisfacao__texto">Filtrar por setor:</label>
        <select id="setorFiltro" class="form-select w-auto d-inline-block mb-3 ms-2">
          <option value="todos">Todos</option>
          ${setores.map(s => `<option value="${s}">${s}</option>`).join('')}
        </select>
        <canvas id="satisfactionChart" class="administracao__satisfacao__canva"></canvas>
        <h4 class="administracao__satisfacao__texto mt-4">Comentários dos Usuários</h4>
        <ul class="list-group administracao__satisfacao__comentarios" id="commentList"></ul>
        <img src="../../frontend/img/parceiros2.svg" alt="Parceiros" class="administracao__satisfacao__imagem mt-3">
      `;

      document.getElementById('adminContent').innerHTML = html;

      // primeiro desenho
      updateSatisfactionView(data);

      // refaz ao mudar o filtro
      document
        .getElementById('setorFiltro')
        .addEventListener('change', () => updateSatisfactionView(data));

    } catch (err) {
      console.error('Erro ao renderizar satisfação:', err);
      document.getElementById('adminContent').innerHTML =
        `<p class="text-danger">Não foi possível carregar os dados: ${err.message}</p>`;
    }
  }

  function updateSatisfactionView(allData) {
    const setor = document.getElementById('setorFiltro').value;
    const filtrados = setor === 'todos'
      ? allData
      : allData.filter(d => d.setor === setor);

    // conta níveis
    const contagem = {};
    filtrados.forEach(r => {
      if (!r.nivel) return;
      contagem[r.nivel] = (contagem[r.nivel] || 0) + 1;
    });

    // desenha gráfico
    const ctx = document.getElementById('satisfactionChart').getContext('2d');
    if (window.satisfacaoChart) window.satisfacaoChart.destroy();
    window.satisfacaoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(contagem),
        datasets: [{
          label: 'Nível de Satisfação',
          data: Object.values(contagem),
          backgroundColor: ['#C96868','#FADFA1','#FFF4EA','#7EACB5','#4B8DAA']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: `Satisfação - ${setor === 'todos' ? 'Todos os Setores' : setor}`
          }
        }
      }
    });

    // lista comentários
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    filtrados.forEach(r => {
      if (r.observacao?.trim()) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `[${r.setor}] ${r.observacao.trim()}`;
        commentList.appendChild(li);
      }
    });
  }

  // Exporta para o escopo global
  window.renderSatisfaction = renderSatisfaction;
  // Inicia ao abrir a página
  window.addEventListener('DOMContentLoaded', renderSatisfaction);
})();

function logoutAdmin() {
    screenAdminLogin(); 
}

function exportData(formato) {
    formato = formato.toLowerCase();
    const data = getStoredData();
  
    if (!data.length) {
      alert("Não há dados para exportar.");
      return;
    }
  
    if (formato === 'csv') {
      const header = Object.keys(data[0]).join(',');
      const rows = data.map(obj =>
        Object.values(obj)
              .map(v => JSON.stringify(v))
              .join(',')
      );
      const csv = [header, ...rows].join('\n');
  
      const blob = new Blob([csv], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'respostas.csv';
      link.click();
    }
  
    else if (formato === 'pdf') {
      const win = window.open('', '_blank');
      win.document.write(`
        <html>
          <head>
            <title>Relatório de Respostas</title>
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #333; padding: 4px; text-align: left; }
            </style>
          </head>
          <body>
            <h1>Relatório de Respostas</h1>
            <table>
              <thead>
                <tr>
                  ${Object.keys(data[0]).map(k => `<th>${k}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${data.map(row =>
                  `<tr>${
                    Object.values(row)
                          .map(cell => `<td>${cell}</td>`)
                          .join('')
                  }</tr>`
                ).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      win.document.close();
      win.print();
    }
  
    else {
      alert("Formato inválido. Use CSV ou PDF.");
    }
  }
  
function screenAdminDashboard() {
    showScreen(`
      <div class="d-flex administracao__menu">
        <div class="administracao__menu__opcoes">
          <h4 class="administracao__menu__titulo">Menu - Administração</h4>
          <hr>
          <button class="btn btn-outline-light w-100 mb-2" onclick="renderSatisfaction()">Satisfação</button>
          <button class="btn btn-outline-light w-100 mb-2" onclick="renderMealChoices()">Refeições</button>
  
          <div class="dropdown mb-2">
            <button class="btn btn-outline-light dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Exportar Dados
            </button>
            <ul class="dropdown-menu w-100">
              <li><a class="dropdown-item administracao__menu__opcoes__botao_exportar" href="#" onclick="exportData('csv')">Exportar como CSV</a></li>
              <li><a class="dropdown-item administracao__menu_opcoes__botao_exportar" href="#" onclick="exportData('pdf')">Exportar como PDF</a></li>
            </ul>
          </div>
  
          <button class="btn btn-outline-light w-100 mt-2" onclick="logoutAdmin()">Sair</button>
        </div>
        <div class="p-4 flex-grow-1" id="adminContent" class="administracao__grafico__satisfacao"></div>
      </div>
    `);
    renderSatisfaction();
  }
  
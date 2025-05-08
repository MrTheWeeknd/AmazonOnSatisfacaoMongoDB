function screenSatisfaction() {
    const levels = ['Muito Satisfeito','Satisfeito','Neutro','Insatisfeito','Muito Insatisfeito'];
    let radios = levels.map((l,i) => `
      <div class="form-check form-switch">
        <input class="form-check-input" type="radio" name="satisfaction" value="${l}" id="sat${i}">
        <label class="form-check-label" for="sat${i}">${l}</label>
      </div>`).join('');
    showScreen(`
      <h2 class= "usuario__titulo usuario__titulo__satisfacao">Nível de Satisfação</h2>
      <form id="form-sat" class="usuario__nivel__satisfacao" >${radios}</form>
      <button class="btn usuario__botao__navegacao botao__voltar" onclick="goToHome()">Voltar</button>
      <button class="btn btn-primary usuario__botao__navegacao" onclick="goToComments()">Próximo</button>
    `);
  }
  
  function goToComments() {
    const sel = document.querySelector('input[name="satisfaction"]:checked');
    if (!sel) return alert('Selecione um nível de satisfação');
    tempData.nivel = sel.value;
    screenComments();
  }

  function goToHome() {
    screenSelectSector();
  }
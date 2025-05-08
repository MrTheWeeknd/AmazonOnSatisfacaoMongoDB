function screenSelectSector() {
    const sectors = ['Produção', 'Manutenção', 'Expedição'];
    const buttonsHtml = sectors
      .map(s => `<button class="btn btn-primary usuario__botao__setor" onclick="selectSector('${s}')">${s}</button>`)
      .join('');
    showScreen(`
      <h2 class="usuario__titulo">Qual o seu setor?</h2>
      <div>${buttonsHtml}</div>
      <footer>
        <div class="usuario__footer">
          <img src="../../frontend/img/parceiros.svg" alt="" class="usuario__parceiros">
          <small class="direitos_autorais"> Desenvolvido por Amazon On Soluções Inteligentes. Todos os direitos reservados. ©</small>
        </div>
      </footer>
    `);
  }
  
  function selectSector(sector) {
    tempData.setor = sector;
    screenSatisfaction();
  }
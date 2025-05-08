function screenComments() {
    showScreen(`
      <h2 class= "usuario__titulo usuario__titulo__observacao">Observações</h2>
      <textarea id="obs" class="form-control mb-3" rows="3" placeholder="Digite um breve comentário de agradecimento ou sugestões."></textarea>
      <button class="btn usuario__botao__navegacao botao__voltar" onclick="goToReview()">Voltar</button>
      <button class="btn btn-primary usuario__botao__navegacao" onclick="finishSurvey()">Próximo</button>
    `);
  }
  
  function finishSurvey() {
    tempData.observacao = document.getElementById('obs').value;
    tempData.data = new Date().toISOString();
    screenCategoryProteina();
  }

  function goToReview() {
    screenSatisfaction();
  }
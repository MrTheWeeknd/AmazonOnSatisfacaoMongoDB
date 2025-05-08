function screenMenuSummary() {
    const { proteina, carboidrato, salada, sobremesa } = tempData.escolhaCardapio;
    showScreen(`
      <h2 class= "usuario__titulo">Resumo do Pedido</h2>
      <ul class="usuario__pedido__subtitulo">
        <li class="usuario__pedido__lista" >Proteína: ${proteina} <button class="btn btn-link" onclick="screenCategoryProteina()"> <img src="../../frontend/img/editar.svg" alt="botão de editar" srcset="" class="usuario__img__editar"> </button></li>
        <li class="usuario__pedido__lista">Carboidrato: ${carboidrato} <button class="btn btn-link" onclick="screenCategoryCarboidrato()"> <img src="../../frontend/img/editar.svg" alt="botão de editar" srcset="" class="usuario__img__editar"></button></li>
        <li class="usuario__pedido__lista">Salada: ${salada} <button class="btn btn-link" onclick="screenCategorySalada()"> <img src="../../frontend/img/editar.svg" alt="botão de editar" srcset="" class="usuario__img__editar"> </button></li>
        <li class="usuario__pedido__lista">Sobremesa: ${sobremesa} <button class="btn btn-link" onclick="screenCategorySobremesa()"> <img src="../../frontend/img/editar.svg" alt="botão de editar" srcset="" class="usuario__img__editar"> </button></li>
      </ul>
      <button class="btn btn-primary botao__confirmar__pedido" data-bs-toggle="modal" data-bs-target="#confirmOrderModal">Confirmar Pedido</button>
  
      <!-- Modal de confirmação -->
      <div class="modal fade" id="confirmOrderModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header "><h5 class="modal-title usuario__titulo__modal">Confirmar Pedido</h5></div>
            <div class="modal-body">
              <p class="usuario__pedido__subtitulo__modal" >Tem certeza que deseja enviar este pedido?</p>
            </div>
            <div class="modal-footer">
              <button class="btn usuario__botao__navegacao botao__voltar" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary usuario__botao__navegacao" data-bs-dismiss="modal" onclick="submitFinalOrder()">Sim, enviar</button>
            </div>
          </div>
        </div>
      </div>
    `);
  }
  
function screenThankYouChoice() {
    showScreen(`
      <h2 class= "usuario__titulo usuario__titulo_agradecimento">Obrigado por participar!</h2>
      <p class= "usuario__pedido__subtitulo usuario__pedido__subtitulo__tablet">Deseja escolher a refeição de amanhã?</p>
      <button class="btn botao__voltar botao__usuario__escolhaOpcaoRefeicao" onclick="finalizeWithoutMeal()">
        Não, obrigado!
      </button>
      <button class="btn btn-primary botao__usuario__escolhaOpcaoRefeicao"  data-bs-toggle="modal" data-bs-target="#nextMealModal" onclick="screenCategoryProteina()">
        Sim, quero escolher!
      </button>
    `);
  }
  
async function finalizeWithoutMeal() {
  try {
    if (!tempData._saved) {
      await Storage.saveResponse(tempData);
      tempData._saved = true;
    }
  } catch (err) {
    alert('Erro ao salvar resposta: ' + err.message);
    return;
  }

  showScreen(`
    <h2 class="usuario__titulo">Pesquisa finalizada!</h2>
    <p class="usuario__pedido__subtitulo">Obrigado pela participação.</p>
  `);

  setTimeout(() => {
    resetTempData();
    screenSelectSector();
  }, 2000);
}

function finishSurvey() {
  tempData.observacao = document.getElementById('obs').value;
  tempData.data = new Date().toISOString();

  screenThankYouChoice();
}

  
async function submitFinalOrder() {
  try {
    if (!tempData._saved) {
      await Storage.saveResponse(tempData);
      tempData._saved = true;
    }
  } catch (err) {
    alert('Erro ao salvar pedido: ' + err.message);
    return;
  }

  showScreen(`
    <h2 class="usuario__titulo">Pedido enviado!</h2>
    <p class="usuario__pedido__subtitulo">Obrigado pela participação.</p>
  `);

  setTimeout(() => {
    resetTempData();
    screenSelectSector();
  }, 2000);
}


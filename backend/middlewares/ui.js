let tempData = {
  setor: '',
  nivel: '',
  observacao: '',
  escolhaCardapio: {
    proteina: '',
    carboidrato: '',
    salada: '',
    sobremesa: ''
  },
  data: '',
  _saved: false   
};

function resetTempData() {
  tempData = {
    setor: '',
    nivel: '',
    observacao: '',
    escolhaCardapio: {
      proteina: '',
      carboidrato: '',
      salada: '',
      sobremesa: ''
    },
    data: '',
    _saved: false
  };
}
  
  function showScreen(html) {
    document.getElementById('app').innerHTML = html;
  }

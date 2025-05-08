defaultMenu = {
    proteina: [
      {id:1,name:'Frango Grelhado',img:'../../frontend/img/frangoassado.jpg'},
      {id:2,name:'Peixe Assado',img:'../../frontend/img/peixeassado.jpg'}
    ],
    carboidrato: [
      {id:3,name:'Arroz Integral',img:'../../frontend/img/arroz.jpg'},
      {id:4,name:'Batata Cozida',img:'../../frontend/img/batatacozida.jpg'}
    ],
    salada: [
      {id:5,name:'Salada Verde',img:'../../frontend/img/saladaverde.jpg'},
      {id:6,name:'Tomate',img:'../../frontend/img/tomate.jpg'}
    ],
    sobremesa: [
      {id:7,name:'Fruta',img:'../../frontend/img/fruta.jpg'},
      {id:8,name:'Pudim',img:'../../frontend/img/pudim.jpg'}
    ]
  };
  
  function screenCategoryProteina() {
    const cards = defaultMenu.proteina.map(item => `
      <div class="col-6 mb-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" />
          <div class="card-body">
            <h5 class="usuario__cardapio__titulo__item" >${item.name}</h5>
            <button class="btn usuario__cardapio__botao" onclick="selectCategory('proteina', '${item.name}', screenCategoryCarboidrato)">Escolher</button>
          </div>
        </div>
      </div>`).join('');
    showScreen(`
      <h2 class= "usuario__titulo usuario__cardapio__titulo">Escolha sua proteína</h2>
      <div class="row">${cards}</div>
    `);
  }
  
  function screenCategoryCarboidrato() {
    const cards = defaultMenu.carboidrato.map(item => `
      <div class="col-6 mb-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" />
          <div class="card-body">
            <h5 class="usuario__cardapio__titulo__item">${item.name}</h5>
            <button class="btn  usuario__cardapio__botao" onclick="selectCategory('carboidrato', '${item.name}', screenCategorySalada)">Escolher</button>
          </div>
        </div>
      </div>`).join('');
    showScreen(`
      <h2 class= "usuario__titulo usuario__cardapio__titulo">Escolha seu carboidrato</h2>
      <div class="row">${cards}</div>
    `);
  }
  
  function screenCategorySalada() {
    const cards = defaultMenu.salada.map(item => `
      <div class="col-6 mb-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" />
          <div class="card-body">
            <h5 class="usuario__cardapio__titulo__item">${item.name}</h5>
            <button class="btn usuario__cardapio__botao" onclick="selectCategory('salada', '${item.name}', screenCategorySobremesa)">Escolher</button>
          </div>
        </div>
      </div>`).join('');
    showScreen(`
      <h2 class= "usuario__titulo usuario__cardapio__titulo">Escolha sua salada</h2>
      <div class="row">${cards}</div>
    `);
  }
  
  function screenCategorySobremesa() {
    const cards = defaultMenu.sobremesa.map(item => `
      <div class="col-6 mb-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" />
          <div class="card-body">
            <h5 class="usuario__cardapio__titulo__item">${item.name}</h5>
            <button class="btn usuario__cardapio__botao" onclick="selectCategory('sobremesa', '${item.name}', screenMenuSummary)">Escolher</button>
          </div>
        </div>
      </div>`).join('');
    showScreen(`
      <h2 class= "usuario__titulo usuario__cardapio__titulo">Escolha sua sobremesa</h2>
      <div class="row">${cards}</div>
    `);
  }
  
  function selectCategory(category, name, nextScreen) {
    tempData.escolhaCardapio[category] = name;
    nextScreen();
  }
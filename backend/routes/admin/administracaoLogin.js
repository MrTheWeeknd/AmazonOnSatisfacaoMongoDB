function showScreen(html) {
    document.body.innerHTML = html;
  }

  function screenAdminLogin() {
    showScreen(`
      <div class="container py-5">
        <img src="../../frontend/img/usuario-do-circulo.png" alt="Logo" class="login__icone mb-4">
        <input type="email" id="adminEmail" class="form-control mb-3 login__senha" placeholder="Email">
        <input type="password" id="adminPassword" class="form-control mb-3 login__senha" placeholder="Senha">
        <button class="btn btn-primary login__botao" onclick="loginAdmin()">Entrar</button>
        <img src="../../frontend/img/parceiros.svg" alt="Logo" class="login__parceiros">
      </div>
    `);
  }

  function loginAdmin() {
    const senha = document.getElementById('adminPassword').value;
    if (senha === 'admin123') {
      screenAdminDashboard();
    } else {
      showScreen(`
        <div class="container py-5">
          <img src="img/usuario-do-circulo.png" alt="Logo" class="login__icone mb-4">
          <input type="email" id="adminEmail" class="form-control mb-3 login__senha" placeholder="Email">
          <input type="password" id="adminPassword" class="form-control mb-3 login__senha" placeholder="Senha">
          <div class="alert alert-danger mt-3 login__alerta__senha" role="alert">
            Senha incorreta. Tente novamente.
          </div>
          <button class="btn btn-primary login__botao" onclick="loginAdmin()">Entrar</button>
          <img src="img/parceiros.svg" alt="Logo" class="login__parceiros">
        </div>
      `);
    }
  }


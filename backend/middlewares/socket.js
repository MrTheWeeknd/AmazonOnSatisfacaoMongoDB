const socket = io('http://127.0.0.1:5500');

socket.on('connect', () => {
  console.log('Conectado ao servidor de tempo real');
});

socket.on('new-response', (novoResp) => {
  console.log('🆕 Nova resposta recebida:', novoResp);
  refreshResponseList();
});

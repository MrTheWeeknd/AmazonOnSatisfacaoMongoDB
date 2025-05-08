const API_BASE = 'http://localhost:5500/api';

const Storage = {
  async getResponses() {
    const res = await fetch(`${API_BASE}/satisfacao`);
    if (!res.ok) throw new Error('Falha ao buscar respostas');
    return res.json();
  },
  async saveResponse(resp) {
    const res = await fetch(`${API_BASE}/satisfacao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resp)
    });
    if (!res.ok) throw new Error('Falha ao salvar no servidor');
    return res.json();
  }
};


import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.2:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== PETS ====================
export const petService = {
  listar: async (especie = '') => {
    const params = especie ? { especie } : {};
    const { data } = await api.get('/pets', { params });
    return data;
  },

  buscarPorId: async (id) => {
    const { data } = await api.get(`/pets/${id}`);
    return data;
  },

  criar: async (novoPet) => {
    const { data } = await api.post('/pets', novoPet);
    return data;
  },

  atualizar: async (id, dadosAtualizados) => {
    const { data } = await api.put(`/pets/${id}`, dadosAtualizados);
    return data;
  },

  deletar: async (id) => {
    await api.delete(`/pets/${id}`);
  },
};

// ==================== ONGS ====================
export const ongService = {
  listar: async () => {
    const { data } = await api.get('/ongs');
    return data;
  },

  buscarPorId: async (id) => {
    const { data } = await api.get(`/ongs/${id}`);
    return data;
  },

  criar: async (novaOng) => {
    const { data } = await api.post('/ongs', novaOng);
    return data;
  },

  atualizar: async (id, dadosAtualizados) => {
    const { data } = await api.put(`/ongs/${id}`, dadosAtualizados);
    return data;
  },
};
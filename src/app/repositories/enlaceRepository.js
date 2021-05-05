import http from '../services/http';

const enlaceRepository = {
  getAll: async () => {
    try {
      const textos = await http.get('/api/enlaces');
      return textos;
    } catch (error) {
      throw error;
    }
  },

  getOneId: async (id) => {
    try {
      const textoId = await http.get(`/api/enlaces/${id}`)
      return textoId;
    } catch (error) {
      throw error;
    }
  },

  updateEnlace: async (id, data) => {
    try {
      const texto = await http.post(`/api/enlaces/${id}`, data);
      return texto;
    } catch (error) {
      throw error;
    }
  }
}

export default enlaceRepository;
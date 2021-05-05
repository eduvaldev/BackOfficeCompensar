import http from '../services/http';

const textosRepository = {
  getTextos: async () => {
    try {
      const textos = await http.get('/api/textos');
      return textos;
    } catch (error) {
      throw error;
    }
  },

  getTextoId: async (id) => {
    try {
      const textoId = await http.get(`/api/textos/${id}`)
      return textoId;
    } catch (error) {
      throw error;
    }
  },

  updateTexto: async (id, data) => {
    try {
      const texto = await http.post(`/api/textos/${id}`, data);
      return texto;
    } catch (error) {
      throw error;
    }
  }
}

export default textosRepository;
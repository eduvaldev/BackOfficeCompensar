import http from '../services/http';

const usuariosRepository = {
  getUsers: async () => {
    try {
      const users = await http.get('/api/usuarios');
      return users;
    } catch (error) {
      throw error;
    } 
  }
}

export default usuariosRepository;
import { serialize } from 'object-to-formdata';

import usuariosRepository from '../../repositories/usuariosRepository';

const usuariosService = {
  getUsuarios: async () => {
    try {
      return await usuariosRepository.getUsers();
    } catch (error) {
      throw error;
    }
  }
}

export default usuariosService;
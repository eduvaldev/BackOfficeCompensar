import { serialize } from 'object-to-formdata';

import enlaceRepository from '../../repositories/enlaceRepository'

const enlaceService = {
  getAll: async () => {
    try {
      return await enlaceRepository.getAll();
    } catch (error) {
      throw error;
    }
  },

  getOneId: async ( id ) => {
    try {
      return await enlaceRepository.getOneId(id);
    } catch (error) {
      throw error;
    }
  },

  updateEnlaces: async data => {
    try {
      const { id } = data;
      return await enlaceRepository.updateEnlace(id, data);
    } catch (error) {
      throw error
    }
  }
}

export default enlaceService;
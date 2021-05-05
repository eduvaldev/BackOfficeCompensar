import { serialize } from 'object-to-formdata';

import TextoModel from '../../models/TextoModel';
import textosRepository from '../../repositories/textosRepository';

const textosService = {
  getTextos: async () => {
    try {
      return await textosRepository.getTextos();
    } catch (error) {
      throw error;
    }
  },

  getTextoId: async ( id ) => {
    try {
      return await textosRepository.getTextoId(id);
    } catch (error) {
      throw error;
    }
  },

  updateTexto: async data => {
    try {
      console.log(data);
      const { texto_id } = data;
      const body = TextoModel(data);
      return await textosRepository.updateTexto(texto_id, body);
      //return id
    } catch (error) {
      throw error
    }
  }
}

export default textosService;
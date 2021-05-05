import { serialize } from 'object-to-formdata';

import videosRepository from '../../repositories/videosRepository';

const videosService = {
  getVideos: async () => {
    try {
      return await videosRepository.getVideos();
    } catch (error) {
      throw error;
    }
  },

  getVideo: async (id) => {
    try {
      return await videosRepository.getVideoId(id);
    } catch (error) {
      throw error;
    }
  },

  updateVideo: async (data) =>{
    try{
      const {id} = data;;
      return await videosRepository.updateVideo(id, data);
    }catch (error) {
      throw error;
    }
  } 
}

export default videosService;
import http from '../services/http';

const videosRepository = {
  getVideos: async () => {
    try {
      const videos = await http.get('/api/videos/admin');
      return videos;
    } catch (error) {
      throw error;
    }
  },

  getVideoId: async (id) => {
    try {
      const video = await http.get(`/api/videos/admin/${id}`);
      return video;
    } catch (error) {
      throw error;
    }
  },

  updateVideo: async (id, data) => {
    try {
      const video = await http.post(`/api/videos/admin/${id}`, data);
      return video;
    } catch (error) {
      throw error;
    }
  }
}

export default videosRepository;
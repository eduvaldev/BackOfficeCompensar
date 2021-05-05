import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import videosService from '../../services/apiService/videosService';
import { showMessage } from '../fuse/messageSlice';

export const videosGet = createAsyncThunk('videos/videosGet', async (_, { dispatch, rejectWithValue}) => {
  try {
    return await videosService.getVideos();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const videoGetId = createAsyncThunk('videos/videoGet', async (id, {dispatch, rejectWithValue}) => {
  try {
    return await videosService.getVideo(id);
  } catch (error) {
    rejectWithValue(error); 
  }
})

export const updateVideo = createAsyncThunk('texto/updateTexto', async (data, { dispatch, rejectWithValue}) => {
  try {
    const video = await videosService.updateVideo(data);
    dispatch(
      showMessage({
        message: 'Link del Video actualizado correctamente',
        variant: 'success'
      })
    );
    return video;
  } catch (error) {
    return rejectWithValue(error)
  }
})

const videosAdapter = createEntityAdapter({});

export const { selectAll: selectVideos, selectById: selectVideosById } = videosAdapter.getSelectors(state => state.videos);

const videosSlice = createSlice({
  name: 'videos',
  initialState: videosAdapter.getInitialState({
    
  }),
  reducers: {

  },
  extraReducers: {
    [videosGet.pending]: state => {
      state.loading = true;
    },
    [videosGet.fulfilled]: (state, action) => {
      state.loading = false;
      videosAdapter.setAll(state, action.payload);
    },
    [videosGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [videoGetId.pending]: state =>{
      state.loading = true;
    },
    [videoGetId.fulfilled]: (state, action) => {
      state.loading = false;
      videosAdapter.addOne(state, action.payload);
    },
    [videoGetId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export default videosSlice.reducer;
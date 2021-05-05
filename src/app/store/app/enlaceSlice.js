import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import enlaceService from '../../services/apiService/enlaceService';
import { showMessage } from '../fuse/messageSlice';

export const enlacesGet = createAsyncThunk('enlaces/enlacesGet', async (_, { dispatch, rejectWithValue}) => {
  try {
    return await enlaceService.getAll();
  } catch (error) {
    return rejectWithValue(error)
  }
});

export const enlacesGetId = createAsyncThunk('enlaces/enlacesGetId', async (id, {dispatch, rejectWithValue}) => {
  try {
    return await enlaceService.getOneId(id);
  } catch (error) {
    rejectWithValue(error); 
  }
});

export const updateEnlace = createAsyncThunk('enlaces/updateEnlace', async (data, { dispatch, rejectWithValue}) => {
  try {
    console.log(data);
    const enlace = await enlaceService.updateEnlaces(data);
    dispatch(
      showMessage({
        message: 'Enlace actualizado correctamente',
        variant: 'success'
      })
    );
    return enlace;
  } catch (error) {
    return rejectWithValue(error)
  }
});

const enlacesAdapter = createEntityAdapter({});

export const { selectAll: selectEnlaces, selectById: selectEnlacesById } = enlacesAdapter.getSelectors(state => state.enlaces);

const enlaceSilce = createSlice({
  name: 'enlaces',
  initialState: enlacesAdapter.getInitialState({
    
  }),
  reducers: {

  },
  extraReducers: {
    [enlacesGet.pending]: state =>{
      state.loading = true;
    },
    [enlacesGet.fulfilled]: (state, action) => {
      state.loading = false;
      enlacesAdapter.setAll(state, action.payload);
    },
    [enlacesGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [enlacesGetId.pending]: state =>{
      state.loading = true;
    },
    [enlacesGetId.fulfilled]: (state, action) => {
      state.loading = false;
      enlacesAdapter.addOne(state, action.payload);
    },
    [enlacesGetId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export default enlaceSilce.reducer;
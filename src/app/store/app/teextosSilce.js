import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import textosService from '../../services/apiService/textosService';
import { showMessage } from '../fuse/messageSlice';

export const textosGet = createAsyncThunk('textos/textosGet', async (_, { dispatch, rejectWithValue}) => {
  try {
    return await textosService.getTextos();
  } catch (error) {
    return rejectWithValue(error)
  }
}) 

export const textosGetId = createAsyncThunk('textos/textoGetId', async (id, {dispatch, rejectWithValue}) => {
  try {
    return await textosService.getTextoId(id);
  } catch (error) {
    rejectWithValue(error); 
  }
})

export const updateText = createAsyncThunk('texto/updateTexto', async (data, { dispatch, rejectWithValue}) => {
  try {
    console.log(data);
    const texto = await textosService.updateTexto(data);
    dispatch(
      showMessage({
        message: 'Texto actualizado correctamente',
        variant: 'success'
      })
    );
    return texto;
  } catch (error) {
    return rejectWithValue(error)
  }
})

const textosAdapter = createEntityAdapter({});

export const { selectAll: selectTextos, selectById: selectTextosById } = textosAdapter.getSelectors(state => state.textos);

const textosSilce = createSlice({
  name: 'textos',
  initialState: textosAdapter.getInitialState({
    
  }),
  reducers: {

  },
  extraReducers: {
    [textosGet.pending]: state =>{
      state.loading = true;
    },
    [textosGet.fulfilled]: (state, action) => {
      state.loading = false;
      textosAdapter.setAll(state, action.payload);
    },
    [textosGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [textosGetId.pending]: state =>{
      state.loading = true;
    },
    [textosGetId.fulfilled]: (state, action) => {
      state.loading = false;
      textosAdapter.addOne(state, action.payload);
    },
    [textosGetId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export default textosSilce.reducer;
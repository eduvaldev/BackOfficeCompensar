import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import usuariosService from '../../services/apiService/usuariosService';
import { showMessage } from '../fuse/messageSlice';

export const getUsuarios = createAsyncThunk('usuarios/getUsuarios', async (_, { dispatch, rejectWithValue }) => {
  try {
    return await usuariosService.getUsuarios();
  } catch (error) {
    return rejectWithValue(error);
  }
})

const usuariosAdapter = createEntityAdapter({});

export const { selectAll: selectUsuarios, selectById: selectUsuariosById } = usuariosAdapter.getSelectors(state => state.usuarios);

const usuariosSlice = createSlice({
	name: 'usuarios',
	initialState: usuariosAdapter.getInitialState({

	}),
	reducers: {

	},
	extraReducers: {
		[getUsuarios.pending]: state => {
			state.loading = true;
		},
		[getUsuarios.fulfilled]: (state, action) => {
			state.loading = false;
			usuariosAdapter.setAll(state, action.payload);
		},
		[getUsuarios.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		}
	}
});

export default usuariosSlice.reducer;
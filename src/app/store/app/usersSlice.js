import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import usersService from '../../services/apiService/usersService';
import transformErrors from '../../utils/transformErrors';
import { showMessage } from '../fuse/messageSlice';

export const getUsers = createAsyncThunk('users/getUsers', async (_, { dispatch, rejectWithValue }) => {
	try {
		return await usersService.getUsers();
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getUserSubscription = createAsyncThunk('users/getUserSubscription', async (id, { rejectWithValue }) => {
	try {
		return await usersService.getUserSubscriptions(id);
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const saveUser = createAsyncThunk('users/saveUser', async (data, { dispatch, rejectWithValue }) => {
	try {
		const animal = await usersService.saveUser(data);
		dispatch(
			showMessage({
				message: 'Usuario creado correctamente',
				variant: 'success'
			})
		);
		dispatch(closeNewUserDialog());
		return animal;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const updateUser = createAsyncThunk('users/updateUser', async (data, { dispatch, rejectWithValue }) => {
	try {
		const animal = usersService.updateUser(data);
		dispatch(
			showMessage({
				message: 'Usuario actualizado correctamente',
				variant: 'success'
			})
		);
		dispatch(closeEditUserDialog());
		return animal;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id, { rejectWithValue }) => {
	try {
		return await usersService.deleteUser(id);
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const changeStatusUser = createAsyncThunk(
	'conveyors/changeStatusUser',
	async (data, { dispatch, rejectWithValue }) => {
		try {
			const user = await usersService.changeStatusUser(data);
			dispatch(
				showMessage({
					message:
						user.status_id === 1 ? 'Usuario habilitado de manera correcta' : 'Usuario deshabilitado de manera correcta',
					variant: 'success'
				})
			);
			return user;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(state => state.users);

const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState({
		userDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		searchText: '',
		selectedStatus: 'todos',
		errors: {},
		userSubscriptionDialog: {
			type: 'edit',
			props: {
				open: false
			},
			data: null
		},
		userSubscriptions: []
	}),
	reducers: {
		openNewUserDialog: state => {
			state.userDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewUserDialog: state => {
			state.userDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
			state.errors = {};
		},
		openEditUserDialog: (state, action) => {
			state.userDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditUserDialog: state => {
			state.userDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
			state.errors = {};
		},
		openUserSubscriptionDialog: (state, action) => {
			state.userSubscriptionDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeUserSubscriptionDialog: state => {
			state.userSubscriptionDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
			state.userSubscriptions = [];
		},
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: value => ({ payload: value || '' })
		},
		setSelectedStatus: {
			reducer: (state, action) => {
				state.selectedStatus = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getUsers.pending]: state => {
			state.loading = true;
		},
		[getUsers.fulfilled]: (state, action) => {
			state.loading = false;
			usersAdapter.setAll(state, action.payload);
		},
		[getUsers.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[saveUser.pending]: state => {
			state.loading = true;
		},
		[saveUser.fulfilled]: (state, action) => {
			state.loading = false;
			usersAdapter.addOne(state, action.payload);
		},
		[saveUser.rejected]: (state, action) => {
			state.loading = false;
			state.errors = transformErrors(action.payload);
		},
		[saveUser.fulfilled]: (state, action) => {
			usersAdapter.upsertOne(state, action.payload);
		},
		[updateUser.pending]: (state, action) => {
			state.loading = true;
		},
		[updateUser.fulfilled]: (state, action) => {
			state.loading = false;
			usersAdapter.upsertOne(state, action.payload);
		},
		[updateUser.rejected]: (state, action) => {
			state.loading = false;
			state.errors = transformErrors(action.payload);
		},
		[deleteUser.pending]: (state, action) => {
			state.loading = true;
		},
		[deleteUser.fulfilled]: (state, action) => {
			state.loading = false;
			usersAdapter.removeOne(state, action.payload);
		},
		[deleteUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[getUserSubscription.fulfilled]: (state, action) => {
			state.userSubscriptions = action.payload;
		},
		[changeStatusUser.pending]: (state, action) => {
			state.loading = true;
		},
		[changeStatusUser.fulfilled]: (state, action) => {
			state.loading = false;
			usersAdapter.upsertOne(state, action.payload);
		},
		[changeStatusUser.rejected]: (state, action) => {
			state.loading = false;
			state.errors = transformErrors(action.payload);
		}
	}
});

export const {
	closeEditUserDialog,
	closeNewUserDialog,
	closeUserSubscriptionDialog,
	openEditUserDialog,
	openNewUserDialog,
	openUserSubscriptionDialog,
	setSearchText,
	setSelectedStatus
} = usersSlice.actions;

export default usersSlice.reducer;

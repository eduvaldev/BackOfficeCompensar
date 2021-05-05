import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import blogsService from '../../services/apiService/blogsService';
import commentsService from '../../services/apiService/commentsService';
import transformErrors from '../../utils/transformErrors';
import { showMessage } from '../fuse/messageSlice';

export const getBlogs = createAsyncThunk('blogs/getBlogs', async (_, { dispatch, rejectWithValue }) => {
	try {
		return await blogsService.getBlogs();
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getComments = createAsyncThunk('blogs/comments', async (id, { dispatch, rejectedWithValue }) => {
	try {
		return await commentsService.getComments(id);
	} catch (error) {
		return rejectedWithValue(error);
	}
});

export const deleteComment = createAsyncThunk('blogs/deleteComment', async (id, { dispatch, rejectWithValue }) => {
	try {
		return await commentsService.deleteComment(id);
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const saveBlog = createAsyncThunk('blogs/saveBlog', async (data, { dispatch, rejectWithValue }) => {
	try {
		const blog = await blogsService.saveBlog(data);
		dispatch(closeNewBlogDialog());
		dispatch(
			showMessage({
				message: 'Blog creado correctamente',
				variant: 'success'
			})
		);
		return blog;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (data, { dispatch, rejectWithValue }) => {
	try {
		const blog = await blogsService.updateBlog(data);
		dispatch(closeEditBlogDialog());
		dispatch(
			showMessage({
				message: 'Blog actualizado correctamente',
				variant: 'success'
			})
		);
		return blog;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, { rejectWithValue }) => {
	try {
		return await blogsService.deleteBlog(id);
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const changeStatusBlog = createAsyncThunk(
	'blogs/changeStatusBlog',
	async (data, { dispatch, rejectWithValue }) => {
		try {
			const blog = blogsService.changeStatusBlog(data);
			dispatch(
				showMessage({
					message: (await blog).status_id === 2 ? 'Blog deshabilitado correctamente' : 'Blog habilitado correctamente',
					variant: 'success'
				})
			);
			return blog;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const blogsAdapter = createEntityAdapter({});

export const { selectAll: selectBlogs, selectById: selectBlogById } = blogsAdapter.getSelectors(state => state.blogs);

const blogsSlice = createSlice({
	name: 'blogs',
	initialState: blogsAdapter.getInitialState({
		blogDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		searchText: '',
		selectedStatus: 'todos',
		errors: {},
		commentsDialog: {
			type: 'edit',
			props: {
				open: false
			},
			data: null
		},
		comments: []
	}),
	reducers: {
		openNewBlogDialog: state => {
			state.blogDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewBlogDialog: state => {
			state.blogDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditBlogDialog: (state, action) => {
			state.blogDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditBlogDialog: state => {
			state.blogDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openCommentsDialog: (state, action) => {
			state.commentsDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCommentsDialog: state => {
			state.commentsDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
			state.comments = [];
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
		[getBlogs.pending]: state => {
			state.loading = true;
		},
		[getBlogs.fulfilled]: (state, action) => {
			state.loading = false;
			blogsAdapter.setAll(state, action.payload);
		},
		[getBlogs.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[saveBlog.pending]: state => {
			state.loading = true;
		},
		[saveBlog.fulfilled]: (state, action) => {
			state.loading = false;
			blogsAdapter.addOne(state, action.payload);
		},
		[saveBlog.rejected]: (state, action) => {
			state.loading = false;
			state.errors = transformErrors(action.payload);
		},
		[saveBlog.fulfilled]: (state, action) => {
			blogsAdapter.upsertOne(state, action.payload);
		},
		[updateBlog.pending]: (state, action) => {
			state.loading = true;
		},
		[updateBlog.fulfilled]: (state, action) => {
			state.loading = false;
			blogsAdapter.upsertOne(state, action.payload);
		},
		[updateBlog.rejected]: (state, action) => {
			state.loading = false;
			state.errors = transformErrors(action.payload);
		},
		[deleteBlog.pending]: (state, action) => {
			state.loading = true;
		},
		[deleteBlog.fulfilled]: (state, action) => {
			state.loading = false;
			blogsAdapter.removeOne(state, action.payload);
		},
		[deleteBlog.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[getComments.fulfilled]: (state, action) => {
			state.comments = action.payload;
		},
		[deleteComment.fulfilled]: (state, action) => {
			state.comments = state.comments.filter(a => a.id !== action.payload);
		},
		[changeStatusBlog.pending]: (state, action) => {
			state.loading = true;
		},
		[changeStatusBlog.fulfilled]: (state, action) => {
			state.loading = false;
			blogsAdapter.upsertOne(state, action.payload);
		},
		[changeStatusBlog.rejected]: (state, action) => {
			state.loading = false;
			state.errors = transformErrors(action.payload);
		}
	}
});

export const {
	closeCommentsDialog,
	closeEditBlogDialog,
	closeNewBlogDialog,
	openCommentsDialog,
	openEditBlogDialog,
	openNewBlogDialog,
	setSearchText,
	setSelectedStatus
} = blogsSlice.actions;

export default blogsSlice.reducer;

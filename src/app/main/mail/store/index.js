import { combineReducers } from '@reduxjs/toolkit';
import folders from './foldersSlice';
import mails from './mailsSlice';

const reducer = combineReducers({
	mails,
	folders
});

export default reducer;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import courses from './slices/authoring/coursesViewSlice';
import folders from './slices/authoring/foldersSlice';

const authoringReducer = combineReducers({
	courses,
	folders,
});

export const store = configureStore({
	reducer: {
		authoring: authoringReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

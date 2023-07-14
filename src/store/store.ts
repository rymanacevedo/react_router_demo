import { configureStore, combineReducers } from '@reduxjs/toolkit';
import courses from './slices/authoring/coursesSlice';

const authoringReducer = combineReducers({
	courses,
});

export const store = configureStore({
	reducer: {
		authoring: authoringReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

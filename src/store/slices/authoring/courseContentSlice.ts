import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';
import {
	getCourseContent,
	updateCourseContent as fetchUpdateCourseContent,
} from '../../../services/authoring';
import { requireUser } from '../../../utils/user';
import { RootState } from '../../store';
import { CourseContent } from './coursesViewSlice';

const selectCourseContentState = (store: RootState) =>
	store.authoring.courseContent;

export const selectUid = createSelector(
	selectCourseContentState,
	({ uid }) => uid,
);

export const selectCourseContent = createSelector(
	selectCourseContentState,
	({ courseContent }) => courseContent,
);

export const fetchCourseContent = createAsyncThunk(
	'course/fetchCourse',
	async ({ uid }: { uid: string }, { rejectWithValue }) => {
		const user = requireUser();
		const response = await getCourseContent(user, uid);
		if (response.response.status !== 200) {
			return rejectWithValue('Course content not available');
		}
		return response.data;
	},
);

export const putCourseContent = createAsyncThunk(
	'course/putCourseContent',
	async (
		_,
		{
			rejectWithValue,
			getState,
		}: { rejectWithValue: any; getState: () => any },
	) => {
		const user = requireUser();
		const courseContent = selectCourseContent(getState()) as CourseContent;
		const response = await fetchUpdateCourseContent(user, courseContent);
		if (response.response.status !== 200) {
			return rejectWithValue('Course content not available');
		}
		return response.data;
	},
);

export interface CourseContentState {
	uid: string | null;
	courseContent: CourseContent | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: CourseContentState = {
	uid: null,
	courseContent: null,
	status: 'idle',
	error: null,
};

export const courseContentSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		updateCourseContent: (state, action) => {
			state.courseContent = {
				...state.courseContent,
				...action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourseContent.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCourseContent.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.uid = action.payload.uid;
				state.courseContent = action.payload as CourseContent;
			})
			.addCase(fetchCourseContent.rejected, (state) => {
				state.status = 'failed';
				state.error = 'Error has occurred';
				state.uid = null;
				state.courseContent = null;
			})
			.addCase(putCourseContent.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(putCourseContent.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.courseContent = action.payload;
			})
			.addCase(putCourseContent.rejected, (state) => {
				state.status = 'failed';
				state.error = 'Error has occurred';
			});
	},
});

export const { updateCourseContent } = courseContentSlice.actions;

export default courseContentSlice.reducer;

import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';
import { getCourseContent } from '../../../services/authoring';
import { requireUser } from '../../../utils/user';
import { RootState } from '../../store';
import { CourseContent } from './coursesViewSlice'; // TODO move type to file

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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourseContent.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCourseContent.fulfilled, (state, action) => {
				const { uid, name, descriptionHtml } = action.payload;
				state.status = 'succeeded';
				state.uid = uid;
				state.courseContent = {
					uid: uid,
					name: name,
					descriptionHtml: descriptionHtml,
				} as CourseContent;
			})
			.addCase(fetchCourseContent.rejected, (state) => {
				state.status = 'failed';
				state.error = 'Error has occurred';
				state.uid = null;
				state.courseContent = null;
			});
	},
});

export default courseContentSlice.reducer;
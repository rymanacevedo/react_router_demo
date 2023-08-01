import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';
import {
	getCourseContent,
	getCourseContentTree,
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

export const selectCourseContentTree = createSelector(
	selectCourseContentState,
	({ courseContentTree }) => courseContentTree,
);
export const fetchCourseContent = createAsyncThunk(
	'course/fetchCourse',
	async ({ uid }: { uid: string }, { rejectWithValue }) => {
		const user = requireUser();
		const { response: courseContentResponse, data: courseContentData } =
			await getCourseContent(user, uid);
		const { response: courseContentTreeResponse, data: courseContentTreeData } =
			await getCourseContentTree(user, uid);

		if (courseContentResponse.status !== 200) {
			return rejectWithValue('Course content not available');
		} else if (courseContentTreeResponse.status !== 200) {
			return rejectWithValue('Course content tree not available');
		}

		return {
			courseContent: courseContentData,
			courseContentTree: courseContentTreeData,
		};
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

export interface Module {
	uid: string;
	name: string;
	modifiedTime: number;
	modifiedUserFullName: string;
	type: string;
	children: [
		{
			uid: string;
			name: string;
			modifiedTime: number;
			modifiedUserFullName: string;
			type: string;
			subType: string;
			questions: {
				uid: string;
				name: string;
				modifiedTime: number;
				modifiedUserFullName: string;
				learningUnitUid: string;
				type: string;
			}[];
			learningUnits: {
				uid: string;
				name: string;
				modifiedTime: number;
				modifiedUserFullName: string;
				type: string;
				questions: [
					{
						uid: string;
						name: string;
						modifiedTime: number;
						modifiedUserFullName: string;
						learningUnitUid: string;
						type: string;
					},
				];
			}[];
		},
	];
}

export interface CourseContentTree {
	uid: string;
	name: string;
	modifiedTime: number;
	modifiedUserFullName: string;
	status: string;
	sections: {
		uid: string;
		name: string;
		modifiedTime: number;
		modifiedUserFullName: string;
		modules: Module[];
	};
	modules: Module[];
}
export interface CourseContentState {
	uid: string | null;
	courseContent: CourseContent | null;
	courseContentTree: CourseContentTree | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: CourseContentState = {
	uid: null,
	courseContent: null,
	courseContentTree: null,
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
				state.uid = action.payload.courseContent.uid;
				state.courseContent = action.payload.courseContent as CourseContent;
				state.courseContentTree = action.payload.courseContentTree;
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

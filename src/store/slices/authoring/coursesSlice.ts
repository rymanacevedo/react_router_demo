import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';
import {
	getCourseList,
	copyCourse as fetchCopyCourse,
	deleteCourse as fetchDeleteCourse,
} from '../../../services/authoring';
import { requireUser } from '../../../utils/user';
import { RootState } from '../../store';

const selectCoursesState = (store: RootState) => store.authoring.courses;

export const selectCourseList = createSelector(
	selectCoursesState,
	({ courseList }) => courseList,
);

export const selectCourseActionStatus = createSelector(
	selectCoursesState,
	({ copyCourseStatus, deleteCourseStatus }) => ({
		copyCourseStatus,
		deleteCourseStatus,
	}),
);

export const fetchCourses = createAsyncThunk(
	'courses/fetchCourses',
	async (
		{ currentPage, sortOrder }: { currentPage: number; sortOrder: string },
		{ getState }: { getState: () => any },
	) => {
		const { coursesPerPage } = selectCourseList(getState()) as CourseList;
		const user = requireUser();

		const response = await getCourseList(
			user,
			currentPage,
			coursesPerPage,
			sortOrder,
		);

		return response.data;
	},
);

export const copyCourse = createAsyncThunk(
	'courses/copyCourse',
	async (
		{
			courseUid,
			shareQuestions,
		}: {
			courseUid: string;
			shareQuestions: boolean;
		},
		{ rejectWithValue },
	) => {
		const user = requireUser();
		const { response } = await fetchCopyCourse(user, courseUid, shareQuestions);
		if (response.status === 200) {
			return { ok: true };
		}
		return rejectWithValue("Couldn't copy course");
	},
);

export const deleteCourse = createAsyncThunk(
	'courses/deleteCourse',
	async (courseUid: string, { rejectWithValue }) => {
		const user = requireUser();
		const { response } = await fetchDeleteCourse(user, courseUid);
		if (response.status === 200) {
			return { ok: true };
		}
		return rejectWithValue("Couldn't delete course");
	},
);

export interface Course {
	uid: string;
	name: string;
	modifiedTime: number;
	modifiedUserFullName: string;
	status: 'Published' | 'Draft';
	hasIssues: boolean;
	hasRecommendations: boolean;
	hasUnpublishedEdits: boolean;
	moduleCount: number;
	learningUnitCount: number;
	createdTime: number;
}

export interface CourseList {
	items: Course[] | [];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	totalCount: number;
	coursesPerPage: number;
	pagesTotalCount: number;
}

export interface CoursesState {
	courseList: CourseList;
	copyCourseStatus: {
		status: 'idle' | 'loading' | 'succeeded' | 'failed';
		error: string | null;
	};
	deleteCourseStatus: {
		status: 'idle' | 'loading' | 'succeeded' | 'failed';
		error: string | null;
	};
}

const initialState: CoursesState = {
	courseList: {
		items: [],
		status: 'idle',
		totalCount: 0,
		error: null,
		coursesPerPage: 24,
		pagesTotalCount: 1,
	},
	copyCourseStatus: {
		status: 'idle',
		error: null,
	},
	deleteCourseStatus: {
		status: 'idle',
		error: null,
	},
};

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, (state) => {
				state.courseList.status = 'loading';
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				const { items, totalCount } = action.payload;
				const { coursesPerPage } = state.courseList;
				state.courseList.status = 'succeeded';
				state.courseList.items = items;
				state.courseList.totalCount = totalCount;
				state.courseList.pagesTotalCount = Math.floor(
					(totalCount + coursesPerPage - 1) / coursesPerPage,
				);
			})
			.addCase(fetchCourses.rejected, (state) => {
				state.courseList.status = 'failed';
				state.courseList.error = 'Error has occured';
			})
			.addCase(copyCourse.pending, (state) => {
				state.copyCourseStatus.status = 'loading';
			})
			.addCase(copyCourse.fulfilled, (state) => {
				state.copyCourseStatus.status = 'succeeded';
			})
			.addCase(copyCourse.rejected, (state) => {
				state.copyCourseStatus.status = 'failed';
				state.copyCourseStatus.error = 'Error has occured';
			})
			.addCase(deleteCourse.pending, (state) => {
				state.deleteCourseStatus.status = 'loading';
			})
			.addCase(deleteCourse.fulfilled, (state) => {
				state.deleteCourseStatus.status = 'succeeded';
			})
			.addCase(deleteCourse.rejected, (state) => {
				state.deleteCourseStatus.status = 'failed';
				state.deleteCourseStatus.error = 'Error has occured';
			});
	},
});

export default coursesSlice.reducer;

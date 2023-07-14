import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';
import { getCourseList } from '../../../services/authoring';
import { requireUser } from '../../../utils/user';
import { RootState } from '../../store';

const selectCoursesState = (store: RootState) => store.authoring.courses;

export const selectCourseList = createSelector(
	selectCoursesState,
	({ courseList }) => courseList,
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
			});
	},
});

export default coursesSlice.reducer;

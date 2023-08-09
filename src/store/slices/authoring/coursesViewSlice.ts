import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';
import {
	getCourseList,
	copyCourse as fetchCopyCourse,
	deleteCourse as fetchDeleteCourse,
	getCreators,
} from '../../../services/authoring';
import { requireUser } from '../../../utils/user';
import { RootState } from '../../store';
import { ITEMS_PER_PAGE } from '../../../lib/authoring/constants';

const selectCoursesState = (store: RootState) => store.authoring.courses;

export const selectCreators = createSelector(
	selectCoursesState,
	({ creators }) => creators,
);

export const selectCourseList = createSelector(
	selectCoursesState,
	({ courseList }) => courseList,
);

export const selectCourseListFilter = createSelector(
	selectCoursesState,
	({ courseListFilter }) => courseListFilter,
);

export const selectCourseActionStatus = createSelector(
	selectCoursesState,
	({ copyCourseStatus, deleteCourseStatus }) => ({
		copyCourseStatus,
		deleteCourseStatus,
	}),
);

export const fetchCreators = createAsyncThunk(
	'courses/fetchCreators',
	async () => {
		const user = requireUser();
		const result = await getCreators(user);
		return result.response.status === 200 ? result.data.items : [];
	},
);

export const fetchCourses = createAsyncThunk(
	'courses/fetchCourses',
	async (
		{
			currentPage,
			sortOrder,
		}: {
			currentPage: number;
			sortOrder: string;
		},
		{ getState }: { getState: () => any },
	) => {
		const { coursesPerPage } = selectCourseList(
			getState(),
		) as CourseContentList;
		const filter = selectCourseListFilter(getState());
		const user = requireUser();

		const allStatuses = filter.isDraft === filter.isPublished;
		const status = allStatuses ? null : filter.isDraft ? 'Draft' : 'Published';

		const allAlerts =
			filter.hasIssues &&
			filter.hasRecommendations &&
			filter.hasUnpublishedEdits;
		let alerts = allAlerts
			? null
			: [
					filter.hasUnpublishedEdits && 'UnpublishedEdits',
					filter.hasIssues && 'Issues',
					filter.hasRecommendations && 'Recommendations',
			  ]
					.filter((e) => e)
					.join(',');

		const authors = filter.creatorUids.length
			? filter.creatorUids.join(',')
			: null;

		const response = await getCourseList(
			user,
			currentPage,
			coursesPerPage,
			sortOrder,
			status,
			alerts,
			authors,
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
		const { response, data } = await fetchCopyCourse(
			user,
			courseUid,
			shareQuestions,
		);
		if (response.status === 200) {
			return { ok: true, uid: data.uid };
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

export interface CourseContent {
	uid: string;
	name: string;
	descriptionHtml: string;
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

export interface CourseContentList {
	courseContents: CourseContent[] | [];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	totalCount: number;
	coursesPerPage: number;
	pagesTotalCount: number;
}

export interface CourseContentListFilterState {
	count: number;
	isPublished: boolean;
	isDraft: boolean;
	hasRecommendations: boolean;
	hasIssues: boolean;
	hasUnpublishedEdits: boolean;
	creatorUids: string[];
}

export interface Creator {
	uid: string;
	firstName: string;
	lastName: string;
}

export interface CreatorsState {
	creators: Creator[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export interface CoursesViewState {
	creators: CreatorsState;
	courseList: CourseContentList;
	courseListFilter: CourseContentListFilterState;
	copyCourseStatus: {
		status: 'idle' | 'loading' | 'succeeded' | 'failed';
		error: string | null;
	};
	deleteCourseStatus: {
		status: 'idle' | 'loading' | 'succeeded' | 'failed';
		error: string | null;
	};
}

const initialState: CoursesViewState = {
	creators: {
		creators: [],
		status: 'idle',
		error: null,
	},
	courseList: {
		courseContents: [],
		status: 'idle',
		totalCount: 0,
		error: null,
		coursesPerPage: ITEMS_PER_PAGE,
		pagesTotalCount: 1,
	},
	courseListFilter: {
		count: 0,
		isPublished: false,
		isDraft: false,
		hasIssues: false,
		hasRecommendations: false,
		hasUnpublishedEdits: false,
		creatorUids: [],
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

export const coursesViewSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		updateCourseListFilter: (state, action) => {
			state.courseListFilter = {
				...state.courseListFilter,
				...action.payload,
			};
			state.courseListFilter.count =
				+state.courseListFilter.isPublished +
				+state.courseListFilter.isDraft +
				+state.courseListFilter.hasRecommendations +
				+state.courseListFilter.hasIssues +
				+state.courseListFilter.hasUnpublishedEdits +
				state.courseListFilter.creatorUids.length;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, (state) => {
				state.courseList.status = 'loading';
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				const { items, totalCount } = action.payload;
				const { coursesPerPage } = state.courseList;
				state.courseList.status = 'succeeded';
				state.courseList.courseContents = items;
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
			})
			.addCase(fetchCreators.pending, (state) => {
				state.creators.status = 'loading';
			})
			.addCase(fetchCreators.fulfilled, (state, action) => {
				const items = action.payload;
				state.creators.creators = items;
				state.creators.status = 'succeeded';
			})
			.addCase(fetchCreators.rejected, (state) => {
				state.creators.creators = [];
				state.creators.status = 'failed';
				state.creators.error = 'Error loading creators';
			});
	},
});

export const { updateCourseListFilter } = coursesViewSlice.actions;

export default coursesViewSlice.reducer;

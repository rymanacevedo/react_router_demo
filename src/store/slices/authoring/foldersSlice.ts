import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { requireUser } from '../../../utils/user';
import {
	getFolderContent,
	addCoursesToFolder,
	getFolder,
	createFolder as fetchCreateFolder,
} from '../../../services/authoring';

export const selectFoldersState = (store: RootState) => store.authoring.folders;

export const selectFolderDetails = createSelector(
	selectFoldersState,
	({ folderDetails }) => folderDetails,
);

export const fetchFolderDetails = createAsyncThunk(
	'courses/fetchFolderDetails',
	async (
		{
			currentPage,
			folderUid,
			sortOrder,
		}: { currentPage: number; sortOrder: string; folderUid: string },
		{ getState }: { getState: () => any },
	) => {
		const user = requireUser();
		const {
			folderDetails: { coursesPerPage },
		} = selectFoldersState(getState()) as FoldersState;

		const folderInfo = await getFolder(user, folderUid);
		const response = await getFolderContent(
			user,
			folderUid,
			currentPage,
			coursesPerPage,
			sortOrder,
		);

		return {
			name: folderInfo.data.name,
			uid: folderInfo.data.uid,
			...response.data,
		};
	},
);

export const createFolder = createAsyncThunk(
	'courses/createFolder',
	async ({ name, description }: { name: string; description: string }) => {
		const user = requireUser();

		const { response, data } = await fetchCreateFolder(user, {
			name,
			description,
		});

		return {
			statusCode: response.status,
			folderUid: data.uid,
		};
	},
);

export const addCourseToFolder = createAsyncThunk(
	'courses/addCourseToFolder',
	async ({
		folderUid,
		courseUid,
	}: {
		folderUid: string;
		courseUid: string;
	}) => {
		const user = requireUser();
		const body = {
			items: [
				{
					uid: courseUid,
				},
			],
		};
		const response = await addCoursesToFolder(user, folderUid, body);
		return response;
	},
);

export interface FoldersState {
	selectedCourses: { uid: string }[];
	selectedFolders: { uid: string }[];
	showFolderSelectionModal: boolean;
	submittingCourses: boolean;
	folderDetails: {
		name: string;
		uid: string;
		courseContents: any[];
		coursesPerPage: number;
		status: 'idle' | 'loading' | 'succeeded' | 'failed';
		totalCount: number;
		pagesTotalCount: number;
		addCourseToFolderStatus: {
			status: 'idle' | 'loading' | 'succeeded' | 'failed';
			error: string | null;
		};
	};
	createFolderStatus: {
		status: 'idle' | 'loading' | 'succeeded' | 'failed';
		error: string | null;
		statusCode: null | number;
		folderUid: null | string;
	};
}

const initialState: FoldersState = {
	selectedCourses: [],
	selectedFolders: [],
	showFolderSelectionModal: false,
	submittingCourses: false,
	folderDetails: {
		name: '',
		uid: '',
		courseContents: [],
		coursesPerPage: 24,
		status: 'idle',
		totalCount: 0,
		pagesTotalCount: 0,
		addCourseToFolderStatus: {
			status: 'idle',
			error: null,
		},
	},
	createFolderStatus: {
		status: 'idle',
		error: null,
		folderUid: null,
		statusCode: null,
	},
};

export const foldersSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		setSelectedCourses: (state, action) => {
			state.selectedCourses = action.payload;
		},
		setSelectedFolders: (state, action) => {
			state.selectedFolders = action.payload;
		},
		setShowFolderSelectionModal: (state, action) => {
			state.showFolderSelectionModal = action.payload;
		},
		setSubmittingCourses: (state, action) => {
			state.submittingCourses = action.payload;
		},
		resetFoldersState: (state) => {
			return {
				selectedCourses: initialState.selectedCourses,
				selectedFolders: initialState.selectedFolders,
				showFolderSelectionModal: initialState.showFolderSelectionModal,
				submittingCourses: initialState.submittingCourses,
				folderDetails: state.folderDetails,
				createFolderStatus: initialState.createFolderStatus,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFolderDetails.pending, (state) => {
				state.folderDetails.status = 'loading';
			})
			.addCase(fetchFolderDetails.fulfilled, (state, action) => {
				const { items, totalCount, name, uid } = action.payload;
				const { coursesPerPage } = state.folderDetails;
				state.folderDetails = {
					...state.folderDetails,
					status: 'succeeded',
					courseContents: items,
					totalCount,
					name,
					uid,
					pagesTotalCount: Math.floor(
						(totalCount + coursesPerPage - 1) / coursesPerPage,
					),
				};
			})
			.addCase(addCourseToFolder.pending, (state) => {
				state.folderDetails.addCourseToFolderStatus.status = 'loading';
			})
			.addCase(addCourseToFolder.fulfilled, (state) => {
				state.folderDetails.addCourseToFolderStatus.status = 'succeeded';
			})
			.addCase(addCourseToFolder.rejected, (state) => {
				state.folderDetails.addCourseToFolderStatus = {
					status: 'failed',
					error: 'Error has occured',
				};
			})
			.addCase(createFolder.pending, (state) => {
				state.createFolderStatus.status = 'loading';
			})
			.addCase(createFolder.fulfilled, (state, action) => {
				state.createFolderStatus = {
					...state.createFolderStatus,
					folderUid: action.payload.folderUid ?? null,
					statusCode: action.payload.statusCode,
					status: 'succeeded',
				};
			})
			.addCase(createFolder.rejected, (state) => {
				state.createFolderStatus = {
					...state.createFolderStatus,
					status: 'failed',
					error: 'Error has occured',
				};
			});
	},
});

export const {
	setSelectedCourses,
	setSelectedFolders,
	setShowFolderSelectionModal,
	setSubmittingCourses,
	resetFoldersState,
} = foldersSlice.actions;

export default foldersSlice.reducer;

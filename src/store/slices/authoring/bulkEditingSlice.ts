import {
	createSlice,
	createSelector,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { requireUser } from '../../../utils/user';
import { addCoursesToFolder as fetchAddCoursesToFolder } from '../../../services/authoring';

const selectBulkEditingState = (store: RootState) =>
	store.authoring.bulkEditing;

export const selectCoursesBulkEditingEnabled = createSelector(
	selectBulkEditingState,
	({ coursesBulkEditingEnabled }) => coursesBulkEditingEnabled,
);

export const selectBulkEditingFolderModalEnabled = createSelector(
	selectBulkEditingState,
	({ bulkEditingFolderModalVisible }) => bulkEditingFolderModalVisible,
);

export const selectFolders = createSelector(
	selectBulkEditingState,
	({ selectedFolders }) => selectedFolders,
);

export const addCoursesToFolder = createAsyncThunk(
	'courses/addCourseToFolder',
	async (folderUid: string, { getState }: { getState: () => any }) => {
		const user = requireUser();
		const { selectedCourses } = selectBulkEditingState(
			getState(),
		) as BulkEditingSliceState;

		const body = {
			items: [
				...selectedCourses.map((courseUid) => ({
					uid: courseUid,
				})),
			],
		};

		const { response } = await fetchAddCoursesToFolder(user, folderUid, body);

		return response;
	},
);

interface SelectedFolder {
	[key: string]: {
		loading: boolean;
		error: boolean;
		success: boolean;
		status?: number;
	};
}

interface BulkEditingSliceState {
	coursesBulkEditingEnabled: boolean;
	selectedCourses: string[];
	selectedFolders: SelectedFolder;
	bulkEditingFolderModalVisible: boolean;
}

const initialState: BulkEditingSliceState = {
	coursesBulkEditingEnabled: false,
	selectedCourses: [],
	selectedFolders: {},
	bulkEditingFolderModalVisible: false,
};

export const bulkEditingSlice = createSlice({
	name: 'bulkEditing',
	initialState,
	reducers: {
		setSelectedCourses: (
			state,
			action: {
				payload: string[];
			},
		) => {
			state.selectedCourses = action.payload;
		},
		setSelectedFolders: (
			state,
			action: {
				payload: string[];
			},
		) => {
			state.selectedFolders = action.payload.reduce((acc, curr) => {
				return {
					...acc,
					[curr]: {
						loading: false,
						error: false,
						success: false,
					},
				};
			}, {});
		},
		enableCoursesBulkEditing: (
			state,
			action: {
				payload: boolean;
			},
		) => {
			state.coursesBulkEditingEnabled = action.payload;
		},
		enableBulkEditingFolderModal: (state, action) => {
			state.bulkEditingFolderModalVisible = action.payload;
		},
		resetBulkEditingState: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addCoursesToFolder.pending, (state, action) => {
				console.log(action.meta);
				state.selectedFolders = {
					...state.selectedFolders,
					[action.meta.arg]: {
						loading: true,
						error: false,
						success: false,
					},
				};
			})
			.addCase(addCoursesToFolder.fulfilled, (state, action) => {
				state.selectedFolders = {
					...state.selectedFolders,
					[action.meta.arg]: {
						loading: false,
						error: false,
						success: true,
						status: action.payload.status,
					},
				};
			})
			.addCase(addCoursesToFolder.rejected, (state, action) => {
				state.selectedFolders = {
					...state.selectedFolders,
					[action.meta.arg]: {
						loading: false,
						error: true,
						success: false,
					},
				};
			});
	},
});

export const {
	setSelectedCourses,
	setSelectedFolders,
	enableCoursesBulkEditing,
	enableBulkEditingFolderModal,
	resetBulkEditingState,
} = bulkEditingSlice.actions;

export default bulkEditingSlice.reducer;

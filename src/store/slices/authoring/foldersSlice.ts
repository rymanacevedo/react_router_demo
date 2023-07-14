import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectFoldersState = (store: RootState) => store.authoring.folders;

export interface FoldersState {
	selectedCourses: { uid: string }[];
	selectedFolders: { uid: string }[];
	showFolderSelectionModal: boolean;
	submittingCourses: boolean;
}

const initialState: FoldersState = {
	selectedCourses: [],
	selectedFolders: [],
	showFolderSelectionModal: false,
	submittingCourses: false,
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
		resetFoldersState: () => initialState,
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

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface FolderState {
	selectedCourses: { uid: string }[];
	selectedFolders: { uid: string }[];
	showFolderSelectionModal: boolean;
	submittingCourses: boolean;
}

const initialState: FolderState = {
	selectedCourses: [],
	selectedFolders: [],
	showFolderSelectionModal: false,
	submittingCourses: false,
};

type Action =
	| { type: 'ADD_SELECTED_COURSES'; payload: { uid: string }[] }
	| { type: 'ADD_SELECTED_FOLDERS'; payload: { uid: string }[] }
	| { type: 'SHOW_FOLDER_SELECTION_MODAL'; payload: boolean }
	| { type: 'SET_SUBMITTING_COURSES'; payload: boolean }
	| { type: 'RESET' };

const folderReducer = (state: FolderState, action: Action): FolderState => {
	switch (action.type) {
		case 'ADD_SELECTED_COURSES': {
			return {
				...state,
				selectedCourses: action.payload,
			};
		}
		case 'ADD_SELECTED_FOLDERS': {
			return {
				...state,
				selectedFolders: action.payload,
			};
		}
		case 'SHOW_FOLDER_SELECTION_MODAL': {
			return {
				...state,
				showFolderSelectionModal: action.payload,
			};
		}
		case 'SET_SUBMITTING_COURSES': {
			return {
				...state,
				submittingCourses: action.payload,
			};
		}
		case 'RESET': {
			return initialState;
		}
		default: {
			throw Error('Unknown action');
		}
	}
};

const AuthoringFolderContext = createContext<FolderState | null>(null);
const AuthoringFolderDispatchContext = createContext<any>(null);

export const AuthoringFolderProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [folderState, dispatch] = useReducer(folderReducer, initialState);

	return (
		<AuthoringFolderContext.Provider value={folderState}>
			<AuthoringFolderDispatchContext.Provider value={dispatch}>
				{children}
			</AuthoringFolderDispatchContext.Provider>
		</AuthoringFolderContext.Provider>
	);
};

export const useFolderState = () => {
	return useContext(AuthoringFolderContext);
};

export const useFolderDispatch = () => {
	return useContext(AuthoringFolderDispatchContext);
};

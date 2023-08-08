import { AuthoringContentBlock } from './contentBlockSlice';
import { RootState } from '../../store';
import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';
import { requireUser } from '../../../utils/user';
import { getModule, updateModule } from '../../../services/authoring';

export interface Module {
	uid: string;
	name: string;
	type: string;
	descriptionHtml: string;
	introductionContentBlocks: AuthoringContentBlock[];
	conclusionContentBlocks: AuthoringContentBlock[];
	conclusionButtonText: string;
	conclusionButtonUrl: string;
	parentUid: string; // section or course content
	status: string;
}

export interface ModuleState {
	moduleUid: string | null;
	module: Module | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: ModuleState = {
	moduleUid: null,
	module: null,
	status: 'idle',
	error: null,
};

const selectModuleState = (store: RootState) => store.authoring.module;

export const selectModule = createSelector(
	selectModuleState,
	({ module }) => module,
);

export const fetchModule = createAsyncThunk(
	'module/fetchModule',
	async ({ moduleUid }: { moduleUid: string }, { rejectWithValue }) => {
		const user = requireUser();
		const response = await getModule(user, moduleUid);
		if (response.response.status !== 200) {
			return rejectWithValue('Module not available');
		}
		return response.data;
	},
);

export const putModuleContent = createAsyncThunk(
	'module/putModuleContent',
	async (
		_,
		{
			rejectWithValue,
			getState,
		}: { rejectWithValue: any; getState: () => any },
	) => {
		const user = requireUser();
		const module = selectModule(getState()) as Module;
		const response = await updateModule(user, module.uid, module);
		if (response.response.status !== 200) {
			return rejectWithValue('Unable to update module');
		}
		return response.data;
	},
);

export const moduleSlice = createSlice({
	name: 'module',
	initialState,
	reducers: {
		updateAuthoringModule: (state, action) => {
			state.module = {
				...state.module,
				...action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchModule.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchModule.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.moduleUid = action.payload.uid;
				state.module = action.payload as Module;
			})
			.addCase(fetchModule.rejected, (state) => {
				state.status = 'failed';
				state.error = 'Error has occurred';
				state.moduleUid = null;
				state.module = null;
			})
			.addCase(putModuleContent.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(putModuleContent.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(putModuleContent.rejected, (state, action) => {
				state.status = 'failed';
				state.module = action.payload as Module;
			});
	},
});

export const { updateAuthoringModule } = moduleSlice.actions;

export default moduleSlice.reducer;

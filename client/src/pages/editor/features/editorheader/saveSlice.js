import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	error: null,
	lastSave: null,
	isChanged: false,
	isPublishingDone: false,
	savedProject: {},
};

const saveSlice = createSlice({
	name: "save",
	initialState,
	reducers: {
		saveRequest: (state) => {
			state.isPublishingDone = false;
			state.isLoading = true;
			state.error = "";
		},
		saveSuccess: (state, action) => {
			state.lastSave = Date.now();
			state.savedProject = action.payload;
			state.isPublishingDone = true;
			state.isLoading = false;
		},
		saveFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		saveReset: (state) => {
			state.isLoading = false;
			state.error = null;
			state.isPublishingDone = false;
			state.lastSave = "";
		},
		setSavedProject: (state, action) => {
			state.lastSave = Date.now();
			state.savedProject = action.payload;
		},
	},
});

export const {
	saveRequest,
	saveSuccess,
	saveFailure,
	saveReset,
	setSavedProject,
} = saveSlice.actions;

export default saveSlice.reducer;

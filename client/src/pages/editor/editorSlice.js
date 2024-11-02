import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCreating: true,
	showTerminal: true,
	showSideMenu: true,
	isPublishing: false,
	splitDxr: "horizontal",
	searchPanel: false,
	isOutput: true,
	logs: [],
};

export const editorSlice = createSlice({
	name: "editor",
	initialState: initialState,
	reducers: {
		handleCreatingModal: (state, action) => {
			state.isCreating = action.payload;
		},
		handleTerminal: (state, action) => {
			state.showTerminal = action.payload;
		},
		handleSideMenu: (state, action) => {
			state.showSideMenu = action.payload;
		},
		handlePublishModal: (state, action) => {
			state.isPublishing = action.payload;
		},
		updateSplit: (state, action) => {
			state.splitDxr = action.payload;
		},
		resetEditor: (state) => {
			state.isCreating = initialState.isCreating;
			state.showTerminal = true;
			state.showSideMenu = true;
			state.isPublishing = initialState.isPublishing;
			state.splitDxr = initialState.splitDxr;
			state.searchPanel = initialState.searchPanel;
			state.logs = initialState.logs;
			state.isOutput = initialState.isOutput;
		},
		updateSearchQuery: (state) => {
			state.searchPanel = !state.searchPanel;
		},
		updateLogs: (state, action) => {
			state.logs = [...state.logs, action.payload];
		},
		resetLogs: (state) => {
			state.logs = [];
		},
		setOutputTerminal: (state, action) => {
			state.isOutput = action.payload;
		},
	},
});

export const {
	handleCreatingModal,
	handleTerminal,
	handleSideMenu,
	handlePublishModal,
	resetEditor,
	updateSplit,
	updateSearchQuery,
	updateLogs,
	resetLogs,
	setOutputTerminal,
} = editorSlice.actions;

export default editorSlice.reducer;

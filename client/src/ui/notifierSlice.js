import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: null,
	error: null,
	success: null,
	warning: null,
	notification: null,
};

const notifierSlice = createSlice({
	name: "notifier",
	initialState,
	reducers: {
		setNotifier: (state, action) => {
			state.loading = action.payload.loading;
			state.error = action.payload.error;
			state.success = action.payload.success;
			state.warning = action.payload.warning;
			state.notification = action.payload.notification;
		},
		resetNotifier: (state) => {
			state.loading = initialState.loading;
			state.error = initialState.error;
			state.success = initialState.success;
			state.warning = initialState.warning;
			state.notification = initialState.notification;
		},
	},
});

export const { setNotifier, resetNotifier } = notifierSlice.actions;

export default notifierSlice.reducer;

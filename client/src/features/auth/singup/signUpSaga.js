// function to handle api call

import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { signUpFailure, signUpRequest, signUpSuccess } from "./signUpSlice";

// worker saga: handle requests
function* workSignUpSaga(action) {
	try {
		const response = yield call(
			axios.post,
			"http://localhost:9000/api/v1/users/signup",
			action.payload,
			{ withCredentials: true }
		);
		yield put(signUpSuccess(response.data.data.user));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(signUpFailure(message));
	}
}

// watcher saga: watches for the action and calls worker saga
export function* watchSignUpSagas() {
	yield takeLatest(signUpRequest.type, workSignUpSaga);
}

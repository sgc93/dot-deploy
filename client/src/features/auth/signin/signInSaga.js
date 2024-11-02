// function to handle api call

import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { signInFailure, signInRequest, signInSuccess } from "./signInSlice";

// worker saga: handle requests
function* workSignInSaga(action) {
	try {
		const response = yield call(
			axios.post,
			"http://localhost:9000/api/v1/users/login",
			action.payload,
			{
				withCredentials: true,
			}
		);
		yield put(signInSuccess(response.data.data.user));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(signInFailure(message));
	}
}

// watcher saga: watches for the action and calls worker saga
export function* watchSignInSagas() {
	yield takeLatest(signInRequest.type, workSignInSaga);
}

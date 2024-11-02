import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { resetNotifier, setNotifier } from "../../ui/notifierSlice";
import {
	logOutFailure,
	logOutRequest,
	logOutSuccess,
	userDataFailure,
	userDataRequest,
	userDataSuccess,
} from "./authSlice";

function* workUserDataSagas(action) {
	try {
		const response = yield call(
			axios.get,
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/users/me`,
			{
				withCredentials: true,
			}
		);
		console.log(response);

		yield put(userDataSuccess(response.data.data.doc));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(userDataFailure(message));
		yield put(resetNotifier());
		yield put(setNotifier({ error: "Un able to fetch user data" }));
	}
}

export function* watchUserDataSagas() {
	yield takeLatest(userDataRequest.type, workUserDataSagas);
}

function* workLogoutSaga() {
	try {
		yield put(resetNotifier());
		yield put(setNotifier({ loading: "logging out ..." }));
		yield call(
			axios.post,
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/users/logout`,
			{},
			{
				withCredentials: true,
			}
		);
		yield put(resetNotifier());
		yield put(setNotifier({ success: "Log out successfully!" }));
		yield put(logOutSuccess());
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(logOutFailure(message));
		yield put(resetNotifier());
		yield put(setNotifier({ error: message }));
	}
}

export function* watchLogoutSagas() {
	yield takeLatest(logOutRequest.type, workLogoutSaga);
}

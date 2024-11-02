import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { resetNotifier, setNotifier } from "../../ui/notifierSlice";
import {
	deleteItemRequest,
	deleteItemSuccess,
	userProfileRequest,
	userProfileSuccess,
} from "./profileSlice";

function* workItemDeleteSaga(action) {
	const itemName = action.payload.itemName;
	const id = action.payload.id;
	let url = `${import.meta.env.VITE_REACT_APP_API_URL}/${itemName}s/${id}`;

	try {
		yield put(resetNotifier());
		yield put(setNotifier({ loading: `Deleting ${itemName} ...` }));
		const response = yield call(axios.delete, url, {
			withCredentials: true,
		});

		console.log(response);
		const message = response.data.message;
		yield put(deleteItemSuccess());
		yield put(resetNotifier());
		yield put(setNotifier({ success: message }));
	} catch (error) {
		console.log(error);
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(setNotifier({ error: message }));
	}
}

// 29625200
export function* watchItemDeleteSaga() {
	yield takeLatest(deleteItemRequest.type, workItemDeleteSaga);
}

function* userProfileSagas(action) {
	try {
		const response = yield call(
			axios.get,
			`${import.meta.env.VITE_REACT_APP_API_URL}/users/${action.payload}`,
			{
				withCredentials: true,
			}
		);
		yield put(userProfileSuccess(response.data.data.doc));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(userProfileSagas(message));
		yield put(resetNotifier());
		yield put(setNotifier({ error: "Un able to fetch user data" }));
	}
}

function* watchProfileSaga() {
	yield takeLatest(userProfileRequest.type, userProfileSagas);
}

export default watchProfileSaga;

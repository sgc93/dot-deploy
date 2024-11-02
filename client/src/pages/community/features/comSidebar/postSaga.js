import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { setNotifier } from "../../../../ui/notifierSlice";
import { setChangeStatus } from "../../../profile/profileSlice";
import { changeMade } from "../../communitySlice";
import {
	createPostRequest,
	deletePostRequest,
	postFailure,
	postSuccess,
	updatePostRequest,
} from "./postSlice";

function* workPostDeleteSaga(action) {
	try {
		yield call(
			axios.delete,
			`http://localhost:9000/api/v1/posts/${action.payload.id}`,
			action.payload,
			{
				withCredentials: true,
			}
		);

		yield put(postSuccess());
		yield put(setNotifier({ warning: "Post deleted successfully!" }));
		yield put(changeMade());
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(postFailure(message));
		yield put(setNotifier({ error: message }));
	}
}

export function* watchPostDeleteSagas() {
	yield takeLatest(deletePostRequest.type, workPostDeleteSaga);
}

function* workPostUpdateSaga(action) {
	try {
		yield call(
			axios.patch,
			`http://localhost:9000/api/v1/posts/${action.payload.id}`,
			action.payload.data,
			{
				withCredentials: true,
			}
		);

		yield put(postSuccess());
		yield put(setNotifier({ success: "Post Updated successfully!" }));
		yield put(changeMade());
		yield put(setChangeStatus(true));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(postFailure(message));
		yield put(setNotifier({ error: message }));
	}
}

export function* watchPostUpdateSagas() {
	yield takeLatest(updatePostRequest.type, workPostUpdateSaga);
}
function* workPostCreateSaga(action) {
	try {
		yield call(
			axios.post,
			"http://localhost:9000/api/v1/posts",
			action.payload,
			{
				withCredentials: true,
			}
		);

		yield put(postSuccess());
		yield put(changeMade());
		yield put(setChangeStatus(true));
		yield put(setNotifier({ success: "Post Created successfully!" }));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(postFailure(message));
		yield put(setNotifier({ error: message }));
	}
}

function* watchPostCreateSagas() {
	yield takeLatest(createPostRequest.type, workPostCreateSaga);
}

export default watchPostCreateSagas;

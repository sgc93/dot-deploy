import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { setNotifier } from "../../../../ui/notifierSlice";
import { changeMade } from "../../../community/communitySlice";
import { setCurrProject } from "../../projectSlice";
import { saveFailure, saveRequest, saveSuccess } from "./saveSlice";

function* workSaveSaga(action) {
	try {
		const response = yield call(
			axios.post,
			`${import.meta.env.VITE_REACT_APP_API_URL}/projects`,
			action.payload,
			{
				withCredentials: true,
			}
		);
		yield put(changeMade());
		yield put(setCurrProject({ isNew: false, project: response.data.doc }));
		yield put(saveSuccess(response.data.doc));
		yield put(setNotifier({ success: "Project published successfully!" }));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(saveFailure(message));
	}
}

function* watchSaveSagas() {
	yield takeLatest(saveRequest.type, workSaveSaga);
}

export default watchSaveSagas;

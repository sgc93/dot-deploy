import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	handleCreatingModal,
	handleTerminal,
	resetCreatingModal,
	resetEditor,
	resetPublishingModal,
} from "../pages/editor/editorSlice";
import { setLastSave } from "../pages/editor/features/editorheader/saveSlice";
import { selectMenu } from "../pages/editor/features/sidebar/sidebarSlice";
import {
	resetCurrProject,
	setCurrProject,
	updateSelectedLng,
} from "../pages/editor/projectSlice";

export const useEditorOpen = () => {
	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const openEditor = (type, lng, project) => {
		dispatch(resetEditor());
		dispatch(resetCurrProject());
		dispatch(resetCreatingModal());
		dispatch(resetPublishingModal());

		if (type === "open") {
			dispatch(setCurrProject({ isNew: false, project: project }));
			if (project.type === "snippet") {
				dispatch(
					updateSelectedLng({ code: project.code.code, lng: project.lngName })
				);
				dispatch(handleTerminal(false));
			} else {
				dispatch(updateSelectedLng({ code: project.code.html, lng: "html" }));
				dispatch(handleTerminal(true));
			}
		} else {
			dispatch(
				setCurrProject({
					isNew: true,
					project: project,
				})
			);
			if (type === "ui") {
				dispatch(handleTerminal(true));
			} else {
				dispatch(handleTerminal(false));
			}
		}

		dispatch(handleCreatingModal(false));
		dispatch(selectMenu({ name: "explore", title: "Explore" }));
		navigateTo("/editor/code");
		dispatch(setLastSave({ at: Date.now(), project }));
	};

	return openEditor;
};

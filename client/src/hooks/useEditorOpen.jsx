import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	handleCreatingModal,
	handleTerminal,
	resetEditor,
} from "../pages/editor/editorSlice";
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
		if (type === "open") {
			// reset current status
			dispatch(resetEditor());
			dispatch(resetCurrProject());
			dispatch(setCurrProject({ isNew: !project.owner, project: project }));
			if (project.type === "snippet") {
				dispatch(
					updateSelectedLng({ code: project.code.code, lng: project.lngName })
				);
				dispatch(handleTerminal(false));
			} else {
				dispatch(updateSelectedLng({ code: project.code.html, lng: "html" }));
				dispatch(handleTerminal(true));
			}
			// open editor with setups
			dispatch(handleCreatingModal(false));
		} else {
			dispatch(resetEditor());
			if (type === "ui") {
				dispatch(resetCurrProject());
				dispatch(
					setCurrProject({
						isNew: true,
						project: project,
					})
				);
				dispatch(handleTerminal(true));
			} else {
				dispatch(resetCurrProject());
				dispatch(
					setCurrProject({
						isNew: true,
						project: project,
					})
				);
				dispatch(handleTerminal(false));
			}

			dispatch(handleCreatingModal(true));
		}
		dispatch(selectMenu({ name: "explore", title: "Explore" }));
		navigateTo("/editor/code");
	};

	return openEditor;
};

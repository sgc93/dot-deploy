import { isEqual } from "lodash";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";
import { TbCloudCode, TbCloudPlus, TbCloudUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handlePublishModal } from "../../editorSlice";
import { updateProjectRequest } from "../../projectSlice";
import { setAutoSave } from "../sidebar/settingSlice";

const Publish = ({ selectAction }) => {
	const { isUserSignedIn } = useSelector((state) => state.auth);
	const { isNew } = useSelector((state) => state.project);
	const autoSave = useSelector((state) => state.setting.autoSave);
	const { savedProject } = useSelector((state) => state.save);
	const { user } = useSelector((state) => state.auth);
	const { project } = useSelector((state) => state.project);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	let isOwnerIsThisUser = false;
	if (isUserSignedIn && project.owner && user.owner._id) {
		isOwnerIsThisUser = project.owner._id.toString() === user.userId.toString();
	}

	const handleSave = () => {
		if (isUserSignedIn) {
			const hasChanged = !isEqual(savedProject, project);
			if (hasChanged) {
				selectAction();
				dispatch(updateProjectRequest(project));
			} else {
				selectAction();
			}
		} else {
			navigateTo("/login");
		}
	};

	const handlePublish = () => {
		if (isUserSignedIn) {
			selectAction();
			dispatch(handlePublishModal(true));
		} else {
			navigateTo("/login");
		}
	};

	const updateAutoSave = () => dispatch(setAutoSave());

	return (
		<>
			<div
				className={`flex items-center gap-2 p-2 border-b-[1px] border-slate-500 ${
					isNew
						? "text-slate-300 transition-all duration-300 hover:bg-slate-500 hover:text-slate-50 hover:bg-opacity-50"
						: isOwnerIsThisUser
						? "text-slate-300 transition-all duration-300 hover:bg-slate-500 hover:text-slate-50 hover:bg-opacity-50"
						: "text-slate-500"
				} cursor-pointer`}
				onClick={() =>
					isNew ? handlePublish() : isOwnerIsThisUser ? handleSave() : {}
				}
			>
				<div>
					<TbCloudUpload size={23} />
				</div>
				<span className="font-bold">{isNew ? "Publish" : "Save"}</span>
			</div>
			<div
				className={`flex items-center gap-2 p-2 border-b-[1px] border-slate-500 transition-all duration-300 ${
					isNew && !project.owner
						? "text-slate-500"
						: "text-slate-300 hover:bg-slate-500 hover:text-slate-50 hover:bg-opacity-50"
				} cursor-pointer`}
				onClick={() => (isNew ? {} : handlePublish())}
			>
				<div>
					<TbCloudPlus size={23} />
				</div>
				<span className="font-bold">Save As</span>
			</div>
			<div
				className={`flex items-center gap-2 p-2 border-b-[1px] border-slate-500 transition-all duration-300 ${
					isNew
						? "text-slate-500"
						: "hover:bg-slate-500 text-slate-300 hover:text-slate-50 hover:bg-opacity-50"
				} cursor-pointer`}
				onClick={() => (isNew ? {} : updateAutoSave())}
			>
				<div>
					<TbCloudCode size={22} />
				</div>
				<div className="flex-grow flex items-center justify-between gap-3">
					<span className="font-bold">Enable auto save </span>
					{autoSave ? <FaToggleOn size={23} /> : <FaToggleOff size={23} />}
				</div>
			</div>
		</>
	);
};

export default Publish;

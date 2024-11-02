import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../../../ui/BackBtn";
import CodeBox from "../../../../ui/CodeBox";
import Error from "../../../../ui/Error";
import Loading from "../../../../ui/Loading";
import UserName from "../../../../ui/UserName";
import { detailDataRequest, openSidebar } from "../../communitySlice";
import CommUserName from "../../CommUserName";
import AboutProject from "./AboutProject";
import CommentList from "./CommentList";
import DetailProjectList from "./DetailProjectList";

const ProjectDetail = () => {
	const { id } = useParams();
	const { detailedProject, isDetailing, detailingError, hasChange } =
		useSelector((state) => state.community);
	const project = detailedProject;
	const comments = project ? project.comments : [];
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	useEffect(() => {
		if (hasChange) {
			dispatch(detailDataRequest({ isProject: true, id: id }));
		}
	}, [id, dispatch, hasChange]);

	useEffect(() => {
		dispatch(detailDataRequest({ isProject: true, id: id }));
	}, [id, dispatch]);

	const handleOpening = () => dispatch(openSidebar(true));
	const goToOwner = () => navigateTo(`/profile/${project.owner._id}`);

	const tryAgain = () =>
		dispatch(detailDataRequest({ isProject: true, id: id }));

	return (
		<div className="flex flex-col flex-grow h-[calc(100dvh - 4rem)] overflow-x-hidden overflow-y-scroll small-scroll sd:overflow-hidden ">
			<div className="flex sm:hidden items-center justify-between px-5 pt-8 pb-3">
				<CommUserName
					handleClick={handleOpening}
					classes={"px-2 py-1 flex sm:hidden"}
				/>
				<BackBtn />
			</div>
			{project && !isDetailing && !detailingError && (
				<>
					<div className="flex flex-col sd:flex-row gap-7 sd:h-3/4 w-full p-5 sm:p-7">
						<AboutProject goToOwner={goToOwner} project={project} />
						<CodeBox project={project} height={"h-full"} width={"sd:w-1/2"} />
						<div className="flex sd:hidden">
							<CommentList
								comments={comments}
								toId={id}
								commentedOn={"project"}
								classes={"small-scroll h-[12rem]"}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-3 m-7 mt-0 mb-3 rounded-md flex-grow">
						<div className=" flex items-center gap-2 p-3">
							<span>Other projects by</span>
							<UserName
								name={project.owner.name}
								avatarUrl={project.owner.avatarUrl}
								onOwner={goToOwner}
							/>
						</div>
						<DetailProjectList
							projects={project.owner.projects}
							ownerId={project.owner._id}
						/>
					</div>
				</>
			)}
			{detailingError && (
				<div className="w-full h-full flex flex-col gap-5 items-center justify-center">
					<BackBtn />
					<Error message={detailingError} tryAgain={tryAgain} />
				</div>
			)}
			{isDetailing && (
				<div className="w-full h-full flex items-center justify-center">
					<Loading message={"Fetching project data..."} />
				</div>
			)}
		</div>
	);
};

export default ProjectDetail;

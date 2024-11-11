import { useSelector } from "react-redux";
import { overridingScript } from "../../../../utils/constants";
import UserReactComponent from "../../../editor/UserReactComponent";

const ResultFrame = ({ code }) => {
	const srcDoc = code.replace("/override/", overridingScript);
	const { project } = useSelector((state) => state.project);
	const isReact = project.type === "snippet" && project.lngName === "react";

	return (
		<div className="flex items-center justify-center rounded-md overflow-hidden flex-grow h-44 bg-n-14 border-[1px] border-[#555] ">
			{isReact ? (
				<div className={`flex relative p-5`}>
					<UserReactComponent userJsx={code} />
				</div>
			) : (
				<iframe
					srcDoc={srcDoc}
					title="output"
					height={"100%"}
					width={"100%"}
					sandbox="allow-scripts"
				/>
			)}
		</div>
	);
};

export default ResultFrame;

import { useSelector } from "react-redux";
import { overridingScript } from "../../../../utils/constants";
import UserReactComponent from "../../../editor/UserReactComponent";

const ResultFrame = ({ srcDoc }) => {
	srcDoc = srcDoc.replace("/override/", overridingScript);
	const { currLng, currCode } = useSelector((state) => state.project);

	return (
		<div className="flex items-center justify-center rounded-md overflow-hidden flex-grow h-44 bg-n-14 border-[1px] border-[#555] ">
			{currLng === "react" ? (
				<div className={`flex relative p-5`}>
					<UserReactComponent userJsx={currCode} />
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

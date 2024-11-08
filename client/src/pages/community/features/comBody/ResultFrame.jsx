import { overridingScript } from "../../../../utils/constants";

const ResultFrame = ({ srcDoc }) => {
	srcDoc = srcDoc.replace("/override/", overridingScript);

	return (
		<div className="bg-n-14 border-[1px] border-[#555]">
			<iframe
				srcDoc={srcDoc}
				title="output"
				height={"100%"}
				width={"100%"}
				sandbox="allow-scripts"
			/>
		</div>
	);
};

export default ResultFrame;

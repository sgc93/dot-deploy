import * as Babel from "@babel/standalone";
import JsxParser from "react-jsx-parser";

function isValidJSX(jsxString) {
	try {
		Babel.transform(jsxString, {
			presets: ["react"],
		});
		return true; // No errors found
	} catch (error) {
		console.error("Invalid JSX:", error.message);
		return false; // Errors found
	}
}

function UserReactComponent({ userJsx }) {
	if (isValidJSX(userJsx)) {
		return (
			<div className="relative p-5">
				<JsxParser
					jsx={userJsx}
					autoCloseVoidElements
					onError={(error) => console.log("Rendering error:", error.message)}
				/>
			</div>
		);
	} else {
		return <div className="">invalid jsx</div>;
	}
}

export default UserReactComponent;

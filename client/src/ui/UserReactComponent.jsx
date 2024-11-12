import * as Babel from "@babel/standalone";
import { useEffect, useState } from "react";
import JsxParser from "react-jsx-parser";

const parseJsxError = (error) => {
	const errorString = error.toString();
	const match = errorString.match(/SyntaxError: (.+) \((\d+):(\d+)\)/);
	if (match) {
		const [, message, line, column] = match;

		return { message, line, column, source: "component.jsx" };
	}
	return "Unknown error in JSX";
};

function isValidJSX(jsxString) {
	try {
		Babel.transform(jsxString, {
			presets: ["react"],
		});
		return null; // No errors found
	} catch (error) {
		return parseJsxError(error); // Errors found
	}
}

const UserReactComponent = ({ userJsx }) => {
	const [err, setErr] = useState(isValidJSX(userJsx));

	useEffect(() => {
		setErr();
	}, [userJsx]);

	if (!err) {
		return (
			<div className="relative p-5">
				<JsxParser
					jsx={userJsx}
					autoCloseVoidElements
					onError={(error) =>
						setErr({ message: `Rendering error: ${error.message}` })
					}
				/>
			</div>
		);
	} else {
		return (
			<div className="w-full relative p-5">
				<div className="w-full flex items-center justify-center gap-2 bg-red-500 bg-opacity-20 border-2 border-red-500 p-5 rounded-md font-bold text-lg tracking-wider">
					<span className="capitalize text-red-50">{err.message}</span>
					<div className="flex items-center text-red-500">
						{err.line && <span>line: {err.line}</span>}
						{err.column && <span>, col: {err.column}</span>}
					</div>
				</div>
			</div>
		);
	}
};

export default UserReactComponent;

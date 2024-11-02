import { javascript } from "@codemirror/lang-javascript";
import { indentUnit } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "codemirror";

const sampleCode = `
import AIHeader from './AIHeader.js';
import InputBox from './InputBox.js';
import QuickQ from './QuickQ.js';

const AI = () => {
	return (
		<div className="w-[40vw] h-fit bg-slate-800 p-5 rounded-lg flex flex-col gap-2 items-center">
			<AIHeader/>
			<QuickQ/>
			<InputBox/>
		</div>
	);
};
`;

const StaticCodeBox = ({
	code,
	language,
	customStyle,
	numberStyle,
	className,
	height,
	width,
	style,
}) => {
	const customTheme = EditorView.theme({
		"&": {
			backgroundColor: "#02112436",
		},
		".cm-content": {
			caretColor: "#032047e9",
			backgroundColor: "#032047e9",
		},
		"cm-theme-light": {
			backgroundColor: "black",
			color: "black",
		},
		".cm-line": {
			padding: "",
			backgroundColor: "black",
		},
	});

	return (
		<div
			className={`small-scroll bg-n-14 overflow-x-hidden overflow-y-scroll ${className}`}
		>
			<CodeMirror
				readOnly
				value={code}
				height={height ? height : "100%"}
				theme={oneDark}
				width={width ? width : "100%"}
				extensions={[javascript(), EditorView.lineWrapping, indentUnit.of(4)]}
				basicSetup={{
					tabSize: 4,
					mode: javascript(),
					syntaxHighlighting: true,
					customTheme,
				}}
				style={{
					fontSize: "20px",
					padding: "1.25rem",
				}}
			/>
		</div>
	);
};

export default StaticCodeBox;

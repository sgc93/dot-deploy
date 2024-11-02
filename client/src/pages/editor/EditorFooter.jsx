import { BiFontSize } from "react-icons/bi";
import { BsCode } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdOutlineKeyboardTab } from "react-icons/md";
import { PiPlaceholder } from "react-icons/pi";
import { VscBellDot } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { resetNotifier, setNotifier } from "../../ui/notifierSlice";

const FooterTooltip = ({ content, classes }) => {
	return (
		<div
			className={`absolute z-[1001] w-max bg-n-14 border-[1px] border-[#555] px-2 py-1 font-sans text-base text-slate-200 flex ${
				classes ? classes : "-top-[2.1rem]"
			}`}
		>
			{content}{" "}
		</div>
	);
};

const EditorFooter = () => {
	const { lineNo, foldGut, closeBrackets, holder, codeFontSize, codeTabSize } =
		useSelector((state) => state.setting);
	const { project, currLng } = useSelector((state) => state.project);
	const { logs } = useSelector((state) => state.editor);

	const dispatch = useDispatch();

	const showAbout = (content) => {
		dispatch(resetNotifier());
		dispatch(setNotifier({ notification: content }));
	};

	return (
		<div
			className={`max-h-[1.3rem] flex-grow flex items-center justify-between px-4 text-[11px] text-zinc-400 bg-[#23272f] py-[-5px] border-t-[1px] border-[#4d4949] font-code w-full overflow-x-scroll overflow-y-hidden code-area`}
		>
			<div className="flex items-center gap-3 w-max">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout(`Current Project Type : ${project.type}`)
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<span className="font-semibold">{project.type.toUpperCase()}</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout(`Language Mode : ${currLng.toUpperCase()}`)
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<BsCode />
					<span>{currLng}</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() => showAbout(`Errors: ${logs.length}`)}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<span className={`${logs.length > 0 ? "text-color-3" : ""}`}>
						errors: {logs.length}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-3 w-max">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() => showAbout(`Editor Tab Size : ${codeTabSize}`)}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<MdOutlineKeyboardTab />
					<span>Tab Size: {codeTabSize}</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() => showAbout(`Code Font Size : ${codeFontSize}`)}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<BiFontSize />
					<span>Code Font Size: {codeFontSize}</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() => showAbout(`Code Area Placeholder : ${holder}`)}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<PiPlaceholder />
					<span>placeholder: {holder ? holder : "''"}</span>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout(
							`Enabled editor settings {${lineNo ? "line-nos" : ""}${
								closeBrackets ? ", auto-bracket" : ""
							}${foldGut ? ", fold-gutter" : ""}}`
						)
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<IoCheckmarkDone />
					<span>
						enabled:
						{`{${lineNo ? "line-nos" : ""}${
							closeBrackets ? ", auto-bracket" : ""
						}${foldGut ? ", fold-gutter" : ""}}`}
					</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer w-content"
					onMouseEnter={() => showAbout(`Notifications`)}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<div className="min-h-full">
						<VscBellDot size={14} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorFooter;

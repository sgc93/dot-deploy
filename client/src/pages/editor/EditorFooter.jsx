import { useState } from "react";
import { BiFontSize } from "react-icons/bi";
import { BsCode } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdOutlineKeyboardTab } from "react-icons/md";
import { PiPlaceholder } from "react-icons/pi";
import { VscBellDot } from "react-icons/vsc";
import { useSelector } from "react-redux";

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

	const [isHovered1, setIsHovered1] = useState(false);
	const [isHovered2, setIsHovered2] = useState(false);
	const [isHovered3, setIsHovered3] = useState(false);
	const [isHovered4, setIsHovered4] = useState(false);
	const [isHovered5, setIsHovered5] = useState(false);
	const [isHovered6, setIsHovered6] = useState(false);
	const [isHovered7, setIsHovered7] = useState(false);
	const [isHovered8, setIsHovered8] = useState(false);

	return (
		<div
			className={`max-h-[1.3rem] flex-grow flex items-center justify-between px-4 text-[11px] text-zinc-400 bg-[#23272f] py-[-5px] border-t-[1px] border-[#4d4949] font-code w-max sd:w-full`}
		>
			<div className="flex items-center gap-3">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer"
					onMouseEnter={() => setIsHovered1(true)}
					onMouseLeave={() => setIsHovered1(false)}
				>
					<span className="font-semibold">{project.type.toUpperCase()}</span>
					{isHovered1 && (
						<FooterTooltip content={`Current Project Type : ${project.type}`} />
					)}
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer"
					onMouseEnter={() => setIsHovered2(true)}
					onMouseLeave={() => setIsHovered2(false)}
				>
					<BsCode />
					<span>{currLng}</span>
					{isHovered2 && (
						<FooterTooltip
							content={`Language Mode : ${currLng.toUpperCase()}`}
						/>
					)}
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer"
					onMouseEnter={() => setIsHovered3(true)}
					onMouseLeave={() => setIsHovered3(false)}
				>
					<span className={`${logs.length > 0 ? "text-color-3" : ""}`}>
						errors: {logs.length}
					</span>
					{isHovered3 && <FooterTooltip content={`Errors: ${logs.length}`} />}
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer"
					onMouseEnter={() => setIsHovered4(true)}
					onMouseLeave={() => setIsHovered4(false)}
				>
					<MdOutlineKeyboardTab />
					<span>Tab Size: {codeTabSize}</span>
					{isHovered4 && (
						<FooterTooltip content={`Editor Tab Size : ${codeTabSize}`} />
					)}
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer"
					onMouseEnter={() => setIsHovered5(true)}
					onMouseLeave={() => setIsHovered5(false)}
				>
					<BiFontSize />
					<span>Code Font Size: {codeFontSize}</span>
					{isHovered5 && (
						<FooterTooltip content={`Code Font Size : ${codeFontSize}`} />
					)}
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer"
					onMouseEnter={() => setIsHovered6(true)}
					onMouseLeave={() => setIsHovered6(false)}
				>
					<PiPlaceholder />
					<span>placeholder: {holder ? holder : "''"}</span>
					{isHovered6 && (
						<FooterTooltip content={`Code Area Placeholder : ${holder}`} />
					)}
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer"
					onMouseEnter={() => setIsHovered7(true)}
					onMouseLeave={() => setIsHovered7(false)}
				>
					<IoCheckmarkDone />
					<span>
						enabled:
						{`{${lineNo ? "line-nos" : ""}${
							closeBrackets ? ", auto-bracket" : ""
						}${foldGut ? ", fold-gutter" : ""}}`}
					</span>
					{isHovered7 && (
						<FooterTooltip
							content={`Enabled Code Editor Settings`}
							classes={"right-0 -top-[2.1rem]"}
						/>
					)}
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-700 hover:bg-opacity-70 px-2 rounded-full cursor-pointer"
					onMouseEnter={() => setIsHovered8(true)}
					onMouseLeave={() => setIsHovered8(false)}
				>
					<div className="min-h-full">
						<VscBellDot size={14} />
					</div>
					{isHovered8 && (
						<FooterTooltip
							content={`Notifications`}
							classes={"right-0 -top-[2.5rem]"}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default EditorFooter;

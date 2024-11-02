import { useEffect, useRef, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { TbMinus, TbSquare, TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEditorOpen } from "../../hooks/useEditorOpen";

const EditorModal = () => {
	const { project } = useSelector((state) => state.project);
	const [name, setName] = useState("");
	const textareaRef = useRef();
	const dispatch = useDispatch();
	const openEditor = useEditorOpen();
	const isSnippet = project.type === "snippet";

	useEffect(() => {
		const handleSubmission = (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				toNext();
			}
		};

		textareaRef.current.addEventListener("keydown", handleSubmission);

		return textareaRef.current.addEventListener("keydown", handleSubmission);
	}, [name, dispatch]);

	const toNext = () =>
		openEditor("open", project.lngName, {
			...project,
			name: name ? name : "Untitled",
		});

	return (
		<div className="absolute left-0 z-[100] w-full h-full flex justify-center backdrop-blur-sm">
			<div className="flex flex-col w-[35rem] h-max min-h-[20rem] rounded-lg border-[1px] border-slate-700 overflow-hidden shadow-lg shadow-slate-900 mt-24">
				<div className="flex items-center justify-between bg-gray-800 border-b-[1px] border-slate-700 px-2 py-[5px]">
					<div className="flex items-center gap-2 text-slate-500 text-sm">
						<img src="/dot.svg" alt="" width={15} className=" invert" />
						<span className="capitalize">
							DOTCODE/{isSnippet ? "code-snippet" : "ui-componet"}
						</span>
					</div>
					<div className="flex items-center gap-4">
						{[
							<TbMinus key={1} size={17} />,
							<TbSquare key={2} size={15} />,
							<TbX key={3} size={17} />,
						].map((icon, index) => (
							<span
								className="text-xl text-slate-500 cursor-not-allowed"
								key={index}
							>
								{icon}
							</span>
						))}
					</div>
				</div>
				<div className="flex flex-grow justify-between flex-col bg-n-13 py-2 px-4">
					<div className="flex items-start gap-1">
						<span className="flex items-center text-slate-400">
							Dot:\{isSnippet ? "Code-Snippet" : "Ui-Component"}\
							{isSnippet ? project.lngName : "Html-Css-Js"}
							<IoIosArrowForward opacity={0.7} />
						</span>
						<textarea
							ref={textareaRef}
							type="text"
							placeholder={
								isSnippet ? "name-your-snippet" : "name-your-ui-component"
							}
							className="h-52 resize-none bg-transparent border-none outline-none flex-grow text-slate-400 placeholder:text-slate-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
						/>
					</div>

					<div
						className={`flex justify-end md:justify-between md:text-sm text-slate-400 border-t-[1px] border-slate-600 pt-2`}
					>
						<span className="hidden md:flex items-center gap-1 ">
							press{" "}
							<span className="flex items-center text-slate-300 bg-slate-600 px-2 py-[1px] rounded-md">
								ENTER <AiOutlineEnter />
							</span>{" "}
							to go to next step
						</span>
						<button
							className="flex text-slate-300 bg-slate-600 px-2 py-[1px] rounded-md hover:bg-slate-500 active:bg-slate-500"
							onClick={() => toNext()}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorModal;

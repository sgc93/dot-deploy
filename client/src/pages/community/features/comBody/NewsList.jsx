import { MdOutlineCopyright } from "react-icons/md";
import { useSelector } from "react-redux";
import PostNewsTab from "./PostNewsTab";
import ProjectNewsTab from "./ProjectNewsTab";

const NewsFooter = () => {
	const date = new Date();

	return (
		<div className="flex items-center justify-center gap-3 text-sm font-sans text-center py-3 mt-6 text-slate-500">
			<img src="/dot.svg" alt="" width={18} height={18} />
			<div className="flex items-center gap-2">
				<MdOutlineCopyright />
				<span>{date.getFullYear()} DotCode</span>
			</div>
			<div className="flex items-center gap-2">
				{["Terms", "Privacy", "Security", "Status", "Docs"].map(
					(tab, index) => (
						<span key={index}>{tab}</span>
					)
				)}
			</div>
		</div>
	);
};

const NewsList = () => {
	const { latests } = useSelector((state) => state.community);
	const hasNews = latests.length > 0;

	return (
		<div className="h-full flex flex-col justify-between mt-3 pr-3 overflow-x-hidden overflow-y-scroll small-scroll">
			{hasNews ? (
				<div className="flex flex-col gap-3 font-sans">
					{latests.map((news, index) =>
						news.lngName !== undefined ? (
							<ProjectNewsTab key={index} project={news} />
						) : (
							<PostNewsTab key={index} post={news} />
						)
					)}
					<button className="bg-slate-900 bg-opacity-70 border-[1px] border-slate-800 rounded-md p-2 mt-3 transition-all duration-300 hover:bg-opacity-100 text-slate-400 hover:text-slate-200">
						more
					</button>
				</div>
			) : (
				<div className="flex-grow w-full flex flex-col items-center justify-center text-slate-300 border-y-2 border-color-5">
					<span>Interestingly their is no new thing! new community🥴</span>
					<span>be the first to contribute!</span>
				</div>
			)}
			<NewsFooter />
		</div>
	);
};

export default NewsList;

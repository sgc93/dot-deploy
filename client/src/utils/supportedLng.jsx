import { FaCss3, FaJava, FaJs, FaPython } from "react-icons/fa";
import {
	SiCsharp,
	SiGo,
	SiHtml5,
	SiKotlin,
	SiPhp,
	SiRuby,
	SiRust,
	SiSwift,
	SiTypescript,
} from "react-icons/si";

export const supportedLng = [
	{
		title: "index",
		icon: <SiHtml5 className=" text-red-500" size={12} />,
		extension: "html",
		lngName: "html",
	},
	{
		title: "script",
		icon: <FaJs className=" text-yellow-500" size={12} />,
		extension: "js",
		lngName: "js",
	},
	{
		title: "style",
		icon: <FaCss3 className=" text-cyan-400" size={12} />,
		extension: "css",
		lngName: "css",
	},
	{
		title: "main",
		icon: <FaJava className=" text-red-700" size={15} />,
		extension: "java",
		lngName: "java",
	},
	{
		title: "app",
		icon: <FaPython className=" text-blue-500" size={14} />,
		extension: "py",
		lngName: "python",
	},
	{
		title: "main",
		icon: <SiGo className=" text-blue-600" size={16} />,
		extension: "go",
		lngName: "go",
	},
	{
		title: "index",
		icon: <SiCsharp className=" text-purple-600" size={14} />,
		extension: "cs",
		lngName: "csharp",
	},
	{
		title: "index",
		icon: <SiPhp className=" text-indigo-600" size={16} />,
		extension: "php",
		lngName: "php",
	},
	{
		title: "app",
		icon: <SiSwift className=" text-orange-500" size={12} />,
		extension: "swift",
		lngName: "swift",
	},
	{
		title: "app",
		icon: <SiKotlin className=" text-purple-400" size={12} />,
		extension: "kt",
		lngName: "kotlin",
	},
	{
		title: "index",
		icon: <SiRuby className=" text-red-600" size={13} />,
		extension: "rb",
		lngName: "ruby",
	},
	{
		title: "index",
		icon: <SiRust className=" text-orange-700" size={15} />,
		extension: "rs",
		lngName: "rust",
	},
	{
		title: "index",
		icon: <SiTypescript className=" text-blue-500" size={12} />,
		extension: "ts",
		lngName: "typescript",
	},
];

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useEffect } from "react";
import { GoDot } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { resetNotifier } from "./notifierSlice";

const Notifier = () => {
	const { loading, error, success, warning, notification } = useSelector(
		(state) => state.notifier
	);
	const isOpened = loading || error || success || warning || notification;
	const dispatch = useDispatch();

	useGSAP(() => {
		gsap.to("#notifier", {
			y: 20,
			duration: 0.5,
			ease: "bounce.out",
		});

		gsap.to(".loadingNotifier", {
			x: -10,
			repeat: -1,
			yoyo: true,
			stagger: 0.2,
			duration: 0.3,
			ease: "power1.inOut",
		});
	}, []);

	useEffect(() => {
		let timeout;
		if (isOpened && !loading) {
			timeout = setTimeout(() => {
				dispatch(resetNotifier());
			}, 5000);
		}

		return () => clearTimeout(timeout);
	}, [isOpened, dispatch, loading]);

	const closeNotifier = () => dispatch(resetNotifier());

	if (loading) {
		return (
			<div
				id="notifier"
				className={`absolute z-[1100] top-3 left-1/2 w-max text-wrap text-center -translate-x-1/2 flex items-center gap-5 bg-n-13 px-4 py-[6px] rounded-full border-[1px] border-color-1 text-color-1 font-semibold tracking-wider font-sans`}
			>
				<div className="flex items-center gap-1">
					<GoDot className="loadingNotifier" />
					<GoDot className="loadingNotifier" />
					<GoDot className="loadingNotifier" />
				</div>
				<span className=" text-lg">{loading}</span>
				<button
					className="text-xl  hover:bg-color-1 hover:bg-opacity-30 rounded-full p-[1px] -mr-1 transition-all duration-500 hover:text-red-500 bg-slate-800"
					onClick={() => closeNotifier()}
				>
					<MdClose />
				</button>
			</div>
		);
	} else if (error) {
		return (
			<div
				id="notifier"
				className={`absolute z-[1100] top-3 left-1/2 w-max text-wrap text-center -translate-x-1/2 flex items-center gap-3 bg-n-13 px-4 py-[6px] rounded-full border-[1px] border-red-500 text-red-500 font-semibold tracking-wider font-sans`}
			>
				<span className=" text-lg">{error}</span>
				<button
					className="text-xl  hover:bg-red-500 hover:bg-opacity-30 rounded-full p-[1px] -mr-1 transition-all duration-500 hover:text-red-500 bg-slate-800"
					onClick={() => closeNotifier()}
				>
					<MdClose />
				</button>
			</div>
		);
	} else if (success) {
		return (
			<div
				id="notifier"
				className={`absolute z-[1100] top-3 left-1/2 w-max text-wrap text-center -translate-x-1/2 flex items-center gap-3 bg-n-13 px-4 py-[6px] rounded-full border-[1px] border-green-500 text-green-500 font-semibold tracking-wider font-sans`}
			>
				<span className=" text-lg">{success}</span>
				<button
					className="text-xl  hover:bg-green-500 hover:bg-opacity-30 rounded-full p-[1px] -mr-1 transition-all duration-500 hover:text-red-500 bg-slate-800"
					onClick={() => closeNotifier()}
				>
					<MdClose />
				</button>
			</div>
		);
	} else if (warning) {
		return (
			<div
				id="notifier"
				className={`absolute z-[1100] top-3 left-1/2 w-max text-wrap text-center -translate-x-1/2 flex items-center gap-3 bg-n-13 px-4 py-[6px] rounded-full border-[1px] border-yellow-500 text-yellow-500 font-semibold tracking-wider font-sans`}
			>
				<span className=" text-lg">{warning}</span>
				<button
					className="text-xl  hover:bg-yellow-500 hover:bg-opacity-30 rounded-full p-[1px] -mr-1 transition-all duration-500 hover:text-red-500 bg-slate-800"
					onClick={() => closeNotifier()}
				>
					<MdClose />
				</button>
			</div>
		);
	} else if (notification) {
		return (
			<div
				id="notifier"
				className={`absolute z-[1100] top-3 left-1/2 w-max text-wrap text-center -translate-x-1/2 flex items-center gap-3 bg-n-13 px-4 py-[6px] rounded-full border-[1px] border-color-5 text-color-5 font-semibold tracking-wider font-sans`}
			>
				<span className=" text-lg">{notification}</span>
				<button
					className="text-xl  hover:bg-color-5 hover:bg-opacity-30 rounded-full p-[1px] -mr-1 transition-all duration-500 hover:text-red-500 bg-slate-800"
					onClick={() => closeNotifier()}
				>
					<MdClose />
				</button>
			</div>
		);
	}
};

export default Notifier;

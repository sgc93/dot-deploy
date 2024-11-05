import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useEffect } from "react";
import { BiCheckDouble, BiSolidError } from "react-icons/bi";
import { GoDot } from "react-icons/go";
import { IoWarningOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { VscBellDot } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { resetNotifier } from "./notifierSlice";

const NotifierContent = ({ content, boxClasses, btnClasses, children }) => {
	const dispatch = useDispatch();
	const closeNotifier = () => dispatch(resetNotifier());

	return (
		<div
			id="notifier"
			className={`${boxClasses} absolute z-[1100] top-3 left-1/2 max-w-[99dvw] text-wrap text-center -translate-x-1/2 flex items-start gap-5 bg-n-14 px-4 py-[6px] rounded-md border-2 shadow-md shadow-slate-950 font-semibold tracking-wider font-sans overflow-clip`}
		>
			<div className="mt-2">{children}</div>
			<span className=" sm:text-lg text-left">{content}</span>
			<button
				className={`${btnClasses} text-xl bg-opacity-30 rounded-full p-[1px] mt-1 -mr-1 transition-all duration-500 bg-slate-700 cursor-pointer hover:bg-opacity-100`}
				onClick={() => closeNotifier()}
			>
				<MdClose />
			</button>
		</div>
	);
};

const Notifier = () => {
	const { loading, error, success, warning, notification, normal } =
		useSelector((state) => state.notifier);
	const isOpened =
		loading || error || success || warning || notification || normal;
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

	if (loading) {
		return (
			<NotifierContent
				content={loading}
				boxClasses={"border-blue-300 text-blue-300"}
				btnClasses={"text-blue-300 hover:text-blue-500"}
			>
				<div className="flex items-center gap-1">
					<GoDot className="loadingNotifier" />
					<GoDot className="loadingNotifier" />
					<GoDot className="loadingNotifier" />
				</div>
			</NotifierContent>
		);
	} else if (error) {
		return (
			<NotifierContent
				content={error}
				boxClasses={"border-red-400 text-red-400"}
				btnClasses={"text-red-400 hover:text-red-300"}
			>
				<BiSolidError />
			</NotifierContent>
		);
	} else if (success) {
		return (
			<NotifierContent
				content={success}
				boxClasses={"border-green-300 text-green-300"}
				btnClasses={"text-green-300 hover:text-green-500"}
			>
				<BiCheckDouble size={23} className="-mt-1" />
			</NotifierContent>
		);
	} else if (warning) {
		return (
			<NotifierContent
				content={warning}
				boxClasses={"border-orange-300 text-orange-300"}
				btnClasses={"text-orange-300 hover:text-orange-500"}
			>
				<IoWarningOutline />
			</NotifierContent>
		);
	} else if (notification) {
		return (
			<NotifierContent
				content={notification}
				boxClasses={"border-color-5 text-color-5"}
				btnClasses={"text-color-5 hover:text-color-5"}
			>
				<VscBellDot />
			</NotifierContent>
		);
	} else if (normal) {
		return (
			<NotifierContent
				content={normal}
				boxClasses={"border-[#555] text-slate-300"}
				btnClasses={"text-slate-300 hover:text-slate-50"}
			>
				<img src="/dot.svg" width={15} className=" grayscale" />
			</NotifierContent>
		);
	}
};

export default Notifier;

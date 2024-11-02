import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../../../ui/Error";
import Loading from "../../../../ui/Loading";
import { getDataRequest, openSidebar } from "../../communitySlice";
import CommUserName from "../../CommUserName";
import CreateNewBox from "../../CreateNewBox";
import Filter from "./Filter";
import NewsList from "./NewsList";

const CommunityBody = ({ setIsDetailing }) => {
	const { isUserSignedIn } = useSelector((state) => state.auth);
	const { isLoading, error, latests, hasChange } = useSelector(
		(state) => state.community
	);
	const isDone = !isLoading && !error;

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (latests.length === 0 || hasChange) {
			dispatch(getDataRequest());
		}
	}, [dispatch, latests, hasChange]);

	const handleProfile = () => {
		if (isUserSignedIn) {
			dispatch(openSidebar(true));
		} else {
			navigateTo("/login");
		}
	};

	const tryReadingDataAgain = () => {
		dispatch(getDataRequest());
	};

	return (
		<div className="relative w-full sm:w-4/5 sd:w-3/5 p-5 sm:px-10 pt-8 flex flex-col h-full">
			{isLoading && <Loading message={"Loading new things"} />}
			{error && <Error message={error} tryAgain={tryReadingDataAgain} />}
			{isDone && (
				<>
					<div className="flex items-start justify-between mb-3">
						<div className="flex flex-col gap-3 sm:hidden">
							<div className="flex items-center gap-3 -mt-[6px]">
								<CommUserName
									handleClick={handleProfile}
									classes={"flex sm:hidden py-1 px-2"}
								/>
								<div className="pt-2">
									<CreateNewBox />
								</div>
							</div>
							<span className=" text-slate-300 font-semibold font-sans">
								{"What's new?"}
							</span>
						</div>
						<span className="sm:flex hidden text-slate-300 font-semibold font-sans">
							{"What's new?"}
						</span>
						<Filter />
					</div>
					<NewsList setIsDetailing={setIsDetailing} />
				</>
			)}
		</div>
	);
};

export default CommunityBody;

import NewSupport from "./NewSupport";
import Popular from "./Popular";

const CommunityNotification = () => {
	return (
		<div className="hidden w-1/4 pr-10 pt-8 sd:flex flex-col gap-10 h-full overflow-x-hidden overflow-y-scroll small-scroll">
			<NewSupport />
			<Popular />
		</div>
	);
};

export default CommunityNotification;

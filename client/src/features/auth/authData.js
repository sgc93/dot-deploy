export const storeUserData = (userData) => {
	const expiration = Date.now() + 24 * 60 * 60 * 1000;
	const data = {
		loginAt: Date.now(),
		expiry: expiration,
		name: userData.name,
		userId: userData._id,
		email: userData.email,
		bio: userData.bio,
		avatarUrl: userData.avatarUrl,
	};

	localStorage.setItem("userData", JSON.stringify(data));
};

export const getUserData = () => {
	const storedData = JSON.parse(localStorage.getItem("userData"));

	if (storedData && storedData.expiry > Date.now()) {
		return storedData;
	}

	localStorage.removeItem("userData");
	return null;
};

export const removeUserData = () => {
	localStorage.removeItem("userData");
	document.location.reload();
};

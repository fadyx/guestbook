const usernameRegEx = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const isUsername = (username) => {
	return usernameRegEx.test(username);
};

export default { isUsername };

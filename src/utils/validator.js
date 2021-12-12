import regex from "./regex.js";

const isUsername = (username) => {
	return regex.username.test(username);
};

export default { isUsername };

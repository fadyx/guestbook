import User from "../models/user.js";
import apiResponse from "../utils/apiResponse.js";
import extractRequestBody from "../utils/extractRequestBody.js";
import token from "../utils/token.js";

const signup = async (req, res) => {
	try {
		const body = await extractRequestBody(req);
		const rawUser = (({ username, password, displayname }) => ({ username, password, displayname }))(body);

		if (!rawUser.username || !rawUser.password)
			return apiResponse.error(res, "username and password are required.", 400);

		const newUser = await User.create(rawUser);
		const accessToken = token.signAccessToken({
			userId: newUser._id,
			username: newUser.username,
			displayname: newUser.displayname,
		});

		return apiResponse.success(res, { user: newUser, token: accessToken }, 200);
	} catch (error) {
		if (error.name === "ValidationError") return apiResponse.error(res, "invalid input", 400);

		if (error.name === "MongoServerError" && error.code === 11000)
			return apiResponse.error(res, "username is already taken", 400);

		return apiResponse.error(res, "internal server error.", 500);
	}
};

const login = async (req, res) => {
	try {
		const body = await extractRequestBody(req);
		const { username, password } = body;

		if (!username || !password) return apiResponse.error(res, "username and password are required.", 400);

		const user = await User.findOne({ username });
		if (!user) return apiResponse.error(res, "invalid username or password", 401);

		const isValidPassword = await user.checkPassword(password);
		if (!isValidPassword) return apiResponse.error(res, "invalid username or password", 401);

		const accessToken = token.signAccessToken({
			userId: user._id,
			username: user.username,
			displayname: user.displayname,
		});

		return apiResponse.success(res, { user, token: accessToken }, 200);
	} catch (error) {
		return apiResponse.error(res, "internal server error.", 500);
	}
};

export default { signup, login };

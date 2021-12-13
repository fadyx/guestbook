import jwt from "jsonwebtoken";

const signAccessToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: process.env.JWT_ACCESS_DURATION });
	return token;
};

const verifyAccessToken = (token) => {
	const decodedRefreshToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
	return decodedRefreshToken;
};

export default { signAccessToken, verifyAccessToken };

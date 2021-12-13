import token from "./token.js";

const authGuard = (req) => {
	const rawToken = req.headers.authorization;
	if (!rawToken) throw new Error("unauthorized");
	const verifiedToken = token.verifyAccessToken(rawToken.replace("Bearer ", ""));
	req.user = verifiedToken;
};

export default authGuard;

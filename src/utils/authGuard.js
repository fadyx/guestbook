import token from "./token.js";

const authGuard = (req) => {
	if (!req.headers.authorization || req.headers.authorization.split(" ").shift().toLowerCase() !== "bearer")
		throw new Error("unauthenticated");

	const rawToken = req.headers.authorization.split(" ").pop();
	req.user = token.verifyAccessToken(rawToken);
};

export default authGuard;

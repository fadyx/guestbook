import controller from "../controllers/auth.js";
import apiResponse from "../utils/apiResponse.js";

const authRouter = async (req, res) => {
	if (req.url === "/api/auth/signup" && req.method === "POST") return controller.signup(req, res);

	if (req.url === "/api/auth/login" && req.method === "POST") return controller.login(req, res);

	// url is not found
	return apiResponse.error(res, "route not found", 404);
};

export default authRouter;

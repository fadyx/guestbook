import controller from "../controllers/message.js";
import apiResponse from "../utils/apiResponse.js";
import authGuard from "../utils/authGuard.js";

const messageRouter = async (req, res) => {
	try {
		authGuard(req);
	} catch (error) {
		return apiResponse.error(res, "unauthorized", 401);
	}

	if (req.url === "/api/messages") {
		if (req.method === "GET") return controller.getAllMessages(req, res);
		if (req.method === "POST") return controller.postMessage(req, res);
	}

	// url equals /api/messages/:objectId
	if (req.url.match(/^\/api\/messages\/[a-f\d]{24}$/)) {
		if (req.method === "PATCH") return controller.editMessage(req, res);
		if (req.method === "DELETE") return controller.deleteMessage(req, res);
		if (req.method === "GET") return controller.getMessage(req, res);
	}

	// url equals /api/messages/:objectId/replies
	if (req.url.match(/^\/api\/messages\/[a-f\d]{24}\/replies$/)) {
		if (req.method === "POST") return controller.postReply(req, res);
		if (req.method === "GET") return controller.getReplies(req, res);
	}

	// url is not found
	return apiResponse.error(res, "route not found", 404);
};

export default messageRouter;

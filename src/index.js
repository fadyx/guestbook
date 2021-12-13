import http from "http";

import db from "./database/db.js";

import authRouter from "./routes/auth.js";
import messagesRouter from "./routes/message.js";

import apiResponse from "./utils/apiResponse.js";

const server = http.createServer(async (req, res) => {
	if (req.url.startsWith("/api/")) {
		if (req.url.startsWith("/api/auth")) return authRouter(req, res);
		if (req.url.startsWith("/api/messages")) return messagesRouter(req, res);
	}

	// not found
	return apiResponse.error(res, "route not found", 404);
});

const bootstrap = async () => {
	await db.connect();
	server.listen(process.env.PORT || 3013, () => console.log(`Server is running on port ${process.env.PORT}...`));
};

bootstrap();

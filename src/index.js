import http from "http";

import db from "./database/db.js";

import messagesRouter from "./routes/message.js";

const server = http.createServer(async (req, res) => {
	if (req.url.startsWith("/api/")) {
		if (req.url.startsWith("/api/messages")) return messagesRouter(req, res);
	}

	// not found
	res.writeHead(404, { "Content-Type": "application/json" });
	return res.end(JSON.stringify({ error: "route not found." }));
});

const bootstrap = async () => {
	await db.connect();
	server.listen(process.env.PORT || 3013, () => console.log(`Server is running on port ${process.env.PORT}...`));
};

bootstrap();

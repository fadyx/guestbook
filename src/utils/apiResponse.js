const error = (res, errorMessage, statusCode) => {
	res.writeHead(statusCode || 500, { "Content-Type": "application/json" });
	return res.end(JSON.stringify({ error: true, message: errorMessage }));
};

const success = (res, payload, statusCode) => {
	res.writeHead(statusCode || 200, { "Content-Type": "application/json" });
	return res.end(JSON.stringify({ success: true, payload }));
};

export default { error, success };

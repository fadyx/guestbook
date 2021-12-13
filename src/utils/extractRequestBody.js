const extractRequestBody = (req) => {
	return new Promise((resolve, reject) => {
		try {
			let rawData = "";
			req.on("data", (chunk) => {
				rawData += chunk;
			});

			req.on("end", () => {
				resolve(JSON.parse(rawData));
			});
		} catch (error) {
			reject(error);
		}
	});
};

export default extractRequestBody;

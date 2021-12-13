const extractRequestBody = (req) => {
	return new Promise((resolve, reject) => {
		try {
			let rawData = "";
			req.on("data", (chunk) => {
				rawData += chunk;
			});

			req.on("end", () => {
				resolve(rawData);
			});
		} catch (error) {
			reject(error);
		}
	});
};

export default extractRequestBody;

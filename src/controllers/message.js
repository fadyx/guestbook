import Message from "../models/message.js";
import Reply from "../models/reply.js";
import apiResponse from "../utils/apiResponse.js";
import regex from "../utils/regex.js";
import extractRequestBody from "../utils/extractRequestBody.js";

const getAllMessages = async (req, res) => {
	try {
		const messages = await Message.find({}).populate("user");
		return apiResponse.success(res, messages, 200);
	} catch (error) {
		return apiResponse.error(res, "internal server error.", 500);
	}
};

const getMessage = async (req, res) => {
	try {
		const messageId = regex.objectId.exec(req.url).shift();
		if (!messageId) return apiResponse.error(res, "message not found", 404);
		const message = await Message.findById(messageId).populate("user");
		if (!message) return apiResponse.error(res, "message not found", 404);
		return apiResponse.success(res, message, 200);
	} catch (error) {
		return apiResponse.error(res, "internal server error.", 500);
	}
};

const postMessage = async (req, res) => {
	try {
		const { user } = req;
		const { text } = await extractRequestBody(req);
		if (!text) return apiResponse.error(res, "message text is required.", 400);
		const newMessage = await Message.create({ text, user: user.userId });
		await newMessage.populate("user");
		return apiResponse.success(res, newMessage, 201);
	} catch (error) {
		if (error.name === "ValidationError") return apiResponse.error(res, "invalid input", 400);
		return apiResponse.error(res, "internal server error.", 500);
	}
};

const editMessage = async (req, res) => {
	try {
		const { user } = req;

		const { text } = await extractRequestBody(req);
		if (!text) return apiResponse.error(res, "message text is required.", 400);

		const messageId = regex.objectId.exec(req.url).shift();
		if (!messageId) return apiResponse.error(res, "message is not found.", 404);

		const message = await Message.findById(messageId).populate("user");
		if (!message) return apiResponse.error(res, "message is not found.", 404);
		if (user.userId !== message.user.id) return apiResponse.error(res, "unauthorized", 403);

		message.text = text;
		await message.save();

		return apiResponse.success(res, message, 200);
	} catch (error) {
		if (error.name === "ValidationError") return apiResponse.error(res, "invalid input", 400);
		return apiResponse.error(res, "internal server error.", 500);
	}
};

const deleteMessage = async (req, res) => {
	try {
		const { user } = req;

		const messageId = regex.objectId.exec(req.url).shift();
		if (!messageId) return apiResponse.error(res, "message is not found.", 404);

		const message = await Message.findById(messageId).populate("user");
		if (!message) return apiResponse.error(res, "message is not found.", 404);
		if (user.userId !== message.user.id) return apiResponse.error(res, "unauthorized", 403);

		await message.remove();

		return apiResponse.success(res, null, 204);
	} catch (error) {
		if (error.name === "ValidationError") return apiResponse.error(res, "invalid input", 400);
		return apiResponse.error(res, "internal server error.", 500);
	}
};

const getReplies = async (req, res) => {
	try {
		const messageId = regex.objectId.exec(req.url).shift();
		if (!messageId) return apiResponse.error(res, "message is not found.", 404);
		const replies = await Reply.find({ message: messageId }).populate("user");
		return apiResponse.success(res, replies, 200);
	} catch (error) {
		return apiResponse.error(res, "internal server error.", 500);
	}
};

const postReply = async (req, res) => {
	try {
		const { user } = req;

		const { text } = await extractRequestBody(req);
		if (!text) return apiResponse.error(res, "message text is required.", 400);

		const messageId = regex.objectId.exec(req.url).shift();
		if (!messageId) return apiResponse.error(res, "message is not found.", 404);

		const message = await Message.findById(messageId);
		if (!message) return apiResponse.error(res, "message is not found.", 404);

		const newReply = await Reply.create({ text, user: user.userId, message: message._id });
		await newReply.populate("user");
		return apiResponse.success(res, newReply, 201);
	} catch (error) {
		if (error.name === "ValidationError") return apiResponse.error(res, "invalid input", 400);
		return apiResponse.error(res, "internal server error.", 500);
	}
};

export default { getAllMessages, getMessage, postMessage, editMessage, deleteMessage, getReplies, postReply };

import Message from "../models/message.js";
import apiResponse from "../utils/apiResponse.js";
import regex from "../utils/regex.js";
import extractRequestBody from "../utils/extractRequestBody.js";

const getAllMessages = async (req, res) => {
	try {
		const messages = await Message.find({});
		return apiResponse.success(res, messages, 200);
	} catch (error) {
		return apiResponse.error(res, "internal server error.", 500);
	}
};

const getMessage = async (req, res) => {
	try {
		const messageId = regex.objectId.exec(req.url).shift();
		const message = await Message.findById(messageId);
		if (!message) return apiResponse.error(res, "message not found", 404);
		return apiResponse.success(res, message, 200);
	} catch (error) {
		return apiResponse.error(res, "internal server error.", 500);
	}
};

const postMessage = async (req, res) => {};

const editMessage = async (req, res) => {};

const deleteMessage = async (req, res) => {};

const getReplies = async (req, res) => {};

const postReply = async (req, res) => {};

export default { getAllMessages, getMessage, postMessage, editMessage, deleteMessage, getReplies, postReply };

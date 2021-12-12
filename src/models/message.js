import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "user is required."],
		},

		text: {
			type: String,
			maxlength: 500,
			required: [true, "text is required."],
		},
	},
	{
		timestamps: true,
	},
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

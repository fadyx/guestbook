import mongoose from "mongoose";

const replySchema = mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, "text is required."],
			maxLength: 500,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		message: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
	},
	{
		timestamps: true,
	},
);

const Reply = mongoose.model("Reply", replySchema);

export default Reply;

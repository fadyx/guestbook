import mongoose from "mongoose";

import encrypt from "../utils/encrypt.js";
import validator from "../utils/validator.js";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "username is required."],
		unique: [true, "username is unavailable."],
		index: true,
		validate: {
			validator(value) {
				return validator.isUsername(value);
			},
			message: "invalid username format.",
		},
	},

	token: {
		type: String,
	},

	password: {
		type: String,
		required: [true, "password is required."],
	},

	profile: {
		displayname: {
			type: String,
			trim: true,
			required: true,
		},
	},

	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
	],
	replies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Reply",
		},
	],
});

userSchema.pre("validate", async function pre(next) {
	const user = this;
	if (user.isNew && !user.displayname) {
		user.displayname = user.username;
	}
	next();
});

userSchema.pre("save", async function pre(next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await encrypt.hash(user.password);
	}
	next();
});

userSchema.methods.toJSON = function toJSON() {
	const user = this;
	const publicUser = (({ username, profile }) => ({ username, profile }))(user);
	return publicUser;
};

userSchema.methods.setToken = function setToken(token) {
	this.token = token;
};

userSchema.methods.setPassword = function setPassword(password) {
	this.password = password;
};

userSchema.methods.checkPassword = async function checkPassword(password) {
	const user = this;
	const match = await encrypt.compare(user.password, password);
	return match;
};

userSchema.methods.logout = function logout() {
	this.token = null;
};

const User = mongoose.model("User", userSchema);

export default User;

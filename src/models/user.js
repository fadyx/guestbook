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

	password: {
		type: String,
		required: [true, "password is required."],
	},

	displayname: {
		type: String,
		trim: true,
		maxlength: 20,
		required: true,
	},
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
	const publicUser = (({ username, displayname }) => ({ username, displayname }))(user);
	return publicUser;
};

userSchema.methods.setPassword = function setPassword(password) {
	this.password = password;
};

userSchema.methods.checkPassword = async function checkPassword(password) {
	const user = this;
	const match = await encrypt.compare(user.password, password);
	return match;
};

const User = mongoose.model("User", userSchema);

export default User;

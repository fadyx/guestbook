import mongoose from "mongoose";

import "../models/index.js";

if (process.env.MONGO_DB_DEBUG === "true") {
	mongoose.set("debug", true);
}

const connect = async () => {
	await mongoose.connect(process.env.MONGO_DB_URI);
};

const disconnect = async () => {
	await mongoose.connection.close(false);
};

const state = () => mongoose.connection.readyState;

export default { connect, disconnect, state };

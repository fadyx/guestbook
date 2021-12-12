import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

const hash = async (password) => {
	const salt = randomBytes(8).toString("hex");
	const buffer = await scryptAsync(password, salt, 64);
	return `${buffer.toString("hex")}.${salt}`;
};

const compare = async (storedPassword, toComparePassword) => {
	const [hashedPassword, salt] = storedPassword.split(".");
	const buffer = await scryptAsync(toComparePassword, salt, 64);
	return buffer.toString("hex") === hashedPassword;
};

export default { hash, compare };

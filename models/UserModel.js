const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	// googleId: {
	// 	type: String,
	// 	required: true,
	// },
	// facebookId: {
	// 	type: String,
	// 	required: true,
	// },
	avatar: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "user",
	},
	resetPassword: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: {
		type: Date,
		default: Date.now,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema);
module.exports = User;

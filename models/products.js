const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	imageURL: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	qty: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	update: {
		type: Date,
		default: Date.now,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;

require("dotenv").config();
const express = require("express");
const connectDB = require("./db/DB");
const Products = require("./models/products");
const User = require("./models/UserModel");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// user routes

app.post("/signup", async (req, res) => {
	const { name, email, password, phoneNumber, avatar } = req.body;

	try {
		const existUser = await User.findOne({ email });
		if (existUser) {
			res.status(400).json({ message: "user already exists!" });
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new User({
				name,
				email,
				password: hashedPassword,
				phoneNumber,
				avatar,
			});
			await user.save();
			res.status(201).json(user);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});

app.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "user not found!" });
		}
		const correctPassword = await bcrypt.compare(password, user.password);
		if (!correctPassword) {
			return res.status(400).json({ message: "Wrong Credentials!" });
		}
		return res.status(200).json({ message: "Login Successfully:" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

app.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		if (!users) {
			return res.status(404).json("user not found!");
		}
		return res.status(200).json({ users });
	} catch (error) {
		return console.log(error);
	}
});
// product routes

app.get("/products", async (req, res) => {
	try {
		const products = await Products.find();
		if (!products) {
			return res.status(404).json("products not found!");
		}
		return res.status(200).json({ products });
	} catch (error) {
		return console.log(error);
	}
});

app.get("/product/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Products.findById(id);
		if (!product) {
			return res.status(404).json("product not found!");
		}
		return res.status(200).json({ product });
	} catch (error) {
		return console.log(error);
	}
});

app.delete("/product/delete/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await Products.findByIdAndDelete(id);
		return res.status(200).json({ message: "product has ben deleted" });
	} catch (error) {
		return console.log(error);
	}
});

app.put("/product/update/:id", async (req, res) => {
	const { id } = req.params;
	const product = await Products.findById(id);
	if (!product) {
		return res.status(404).json("product not found!");
	}
	const updatedProduct = await Products.findByIdAndUpdate(id);
	try {
		await updatedProduct.save();
		return res.status(200).json({ message: "product has ben updated" });
	} catch (error) {
		return console.log(error);
	}
});

app.post("/product/new", async (req, res) => {
	const newProduct = req.body;
	try {
		const product = new Products(newProduct);
		product.save();
		res.status(201).json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

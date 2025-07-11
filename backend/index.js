//File Path: backend/index.js

const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://mutyauvyudavid:nVmMoWwDi70bHB0H@cluster0.0ifjzvc.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload Endpoint for Images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
}));

app.post('/addproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
    try {
        const result = await Product.findOneAndDelete({ id: req.body.id });
        if (!result) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        console.log("Removed");
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Schema for creating User Model
const Users = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Map,
        of: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}));

// Creating Endpoint for Registering the User
app.post('/signup', async (req, res) => {
    try {
        const check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });
        await user.save();
        const data = {
            user: {
                id: user._id,
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Creating Endpoint for user login
app.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user && req.body.password === user.password) {
            const data = {
                user: {
                    id: user._id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.status(400).json({ success: false, errors: user ? "Wrong Password" : "Wrong email Id" });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Creating Endpoint for New Collection data
app.get('/newCollections', async (req, res) => {
    try {
        const products = await Product.find({});
        const newCollection = products.slice(-8);
        console.log("NewCollection Fetched");
        res.send(newCollection);
    } catch (error) {
        console.error('Error fetching new collections:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Creating Endpoint for popular in women category
app.get('/popularinwomen', async (req, res) => {
    try {
        const products = await Product.find({ category: "women" });
        const popularInWomen = products.slice(0, 4);
        console.log("Popular in women fetched");
        res.send(popularInWomen);
    } catch (error) {
        console.error('Error fetching popular products in women category:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
}

// Creating Endpoint for adding products to cart data
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData.set(req.body.itemId, (userData.cartData.get(req.body.itemId) || 0) + 1);
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send("Server error");
    }
});

// Creating endpoint to remove product from cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData.get(req.body.itemId) > 0) {
            userData.cartData.set(req.body.itemId, userData.cartData.get(req.body.itemId) - 1);
            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send("Removed");
        } else {
            res.status(400).send("Item not in cart");
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).send("Server error");
    }
});

// Creating Endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).send("Server error");
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server Running on Port ${port}`);
    } else {
        console.error("Error:", error);
    }
});

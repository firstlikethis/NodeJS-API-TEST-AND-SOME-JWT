require('dotenv').config();
require('./config/database').connect();


const express = require('express');
const User = require('./modal/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const inventory = require('./modal/inventory');
const app = express();


app.use(express.json());

//get all product
app.get("/allProduct", async(req,res) => {
    try {
        const allProduct = await inventory.find({});
        res.status(200).json(allProduct);
    } catch (err) {
        console.log(err);
    }
})

//delete product
app.delete("/deleteProduct/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await inventory.findByIdAndDelete(id);
        res.status(200).json(deleteProduct);
    } catch (err) {
        console.log(err);
    }
})

//Add product
app.post("/addProduct", async(req,res) => {
    try{

        const { name_product, price, description } = req.body;
        if (!(name_product && price && description)){
            res.status(400).send("Please fill all the fields");
        }
        
        const checkProduct = await inventory.findOne({ name_product });
        
        if (checkProduct) {
            return res.status(409).send("Product Already Exist");
        }

        const product = await inventory.create({
            name_product,
            price,
            description: description.toLowerCase(),
        });

    } catch (err){
        console.log(err);
    }
})

//search product
app.post("/search", (req,res) => {
    try {
        const { name_product } = req.body;
        if (!(name_product)) {
            res.status(400).send("Please fill the Name of product keywords");
        }

    } catch (err) {
        console.log(err);
    }
})

//register
app.post("/register", async(req,res) => {
    //our register register goes here
    try {
        
        //get input
        const { f_name, l_name, email, password } = req.body;
        if (!(email && password && f_name && l_name)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        encyptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            f_name,
            l_name,
            email: email.toLowerCase(),
            password: encyptedPassword,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        )

        user.token = token;
        res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }

})


//login
app.post("/login", async(req,res) => {
    //our register logic goes here
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        //validate if user exist in our database
        const user = await User.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            )
            user.token = token;
            res.status(200).json(user);
        }

        user.token = null;
        res.status(200).send("Invalid Credentials");

    } catch (err) {
        console.log(err);
    }
})

app.post("/welcome", auth, (req,res) => {
    res.status(200).send("Welcome 🙌 ");
})

//get all user
app.get("/allUser", async(req,res) => {
    try {
        const allUser = await User.find({});
        res.status(200).json(allUser);
    } catch (err) {
        console.log(err);
    }
})

//delete product
app.delete("/deleteUser/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deleteUser = await user.findByIdAndDelete(id);
        res.status(200).json(deleteUser);
    } catch (err) {
        console.log(err);
    }
})


module.exports = app;
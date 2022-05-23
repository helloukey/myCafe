const express = require("express");
const app = express();
const mongoose = require("mongoose");
const myRoutes = require("./routes/myRoutes");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");
require('dotenv').config();

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}.`);
        })
    })
    .catch(err => {
        console.log(err)
    })

// Pass User Object to all Views
app.get("*", checkUser);
// Routes Middleware
app.use(myRoutes);
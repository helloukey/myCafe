const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Check if the user is authorized. If not, then redirect to the login page.
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).redirect("/login");
  }
};

// Pass the user data to the views templates if the user is authorized.
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// Redirect to the Recipes Page if the user is authorized.
const pageAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        next();
      } else {
        res.status(302).redirect("/recipes");
      }
    });
  } else {
    next();
  }
};

module.exports = { requireAuth, checkUser, pageAuth };

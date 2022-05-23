const Recipe = require("../models/Recipe");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3 days",
  });
};

// Handle Form Errors
const handleFormErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  // incorrect login email
  if (err.message === "incorrect email") {
    errors.email = "Sorry, this email is not registered.";
  }

  // incorrect login password
  if (err.message === "incorrect password") {
    errors.password = "Sorry, incorrect password.";
  }

  // duplicate errors
  if (err.code === 11000) {
    errors.email = "This email is already taken.";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Handle Recipe Errors
const handleRecipeErrors = (err) => {
  let errors = { title: "", ingredients: "", time: "", procedure: "", url: "" };

  // validation errors
  if (err.message.includes("recipe validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Landing Page
const landing = (req, res) => {
  res.status(201).render("landing", { title: "Home" });
};

// Register Page
const registerGET = (req, res) => {
  res.status(201).render("register", { title: "Register" });
};

// Register POST request
const registerPOST = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleFormErrors(err);
    res.status(400).json({ errors });
    console.log({ errors });
  }
};

// Login Page
const loginGET = (req, res) => {
  res.status(201).render("login", { title: "Login" });
};

// Login POST request
const loginPOST = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleFormErrors(err);
    res.status(400).json({ errors });
    console.log({ errors });
  }
};

// Logout Action
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(302).redirect("/");
};

// Create Recipe Page
const createRecipe = (req, res) => {
  res.status(201).render("create", { title: "Create Recipe" });
};

// Get All Recipes
const getRecipes = (req, res) => {
  Recipe.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(201).render("recipes", { title: "All Recipes", data: result });
    })
    .catch((err) => console.log(err));
};

// Get Single Recipe
const getDetails = (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((result) => {
      console.log(result);
      res.status(201).render("details", { title: result.title, data: result });
    })
    .catch((err) => console.log(err));
};

// Recipe POST request
const postRecipe = async (req, res) => {
  const { title, ingredients, time, procedure, url, name } = req.body;
  try {
    const recipe = await Recipe.create({
      title,
      ingredients,
      time,
      procedure,
      url,
      name,
    });
    res.status(201).json({ recipe: recipe._id });
  } catch (err) {
    const errors = handleRecipeErrors(err);
    res.status(400).json({ errors });
    console.log({ errors });
  }
};

// Error Page
const ErrorPage = (req, res) => {
  res.status(404).render("404", { title: "404" });
};

module.exports = {
  landing,
  registerGET,
  registerPOST,
  loginGET,
  loginPOST,
  logout,
  createRecipe,
  postRecipe,
  getRecipes,
  getDetails,
  ErrorPage,
};

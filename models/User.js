const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    minlength: [3, "Name should of minimum 3 characters."],
    maxlength: [12, "Name can be of maximum 12 characters only."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    lowercase: [true, "Email should be in lowercase."],
    unique: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [8, "Password should of minimum 8 characters."],
    maxlength: [20, "Password can be of maximum 20 characters only."],
  },
});

// Hash password before saving the document to the database.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to verify login user from the MongoDB database.
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;

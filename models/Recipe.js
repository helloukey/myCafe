const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const isImageURL = require('image-url-validator').default;

const recipeSchema = new Schema (
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      minlength: [3, "Title length should of minimum 3 characters."],
      maxlength: [50, "Title length can be of maximum 50 characters only."],
    },
    ingredients: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, "Add atleast one ingredient."],
    },
    time: {
      type: Number,
      required: [true, "Cooking Time is required."],
    },
    procedure: {
      type: String,
      required: [true, "Procedure is required."],
      minlength: [50, "Procedure length should of minimum 50 characters."],
    },
    url: {
      type: String,
      required: [true, "Image URL is required."],
      validate: [isImageURL, "Please enter a valid Image URL."],
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;

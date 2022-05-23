const newSet = new Set();
let ingredients = [];
const recipeForm = document.querySelector("form");
const adder = document.querySelector(".adder");
const listContainer = document.querySelector(".list-container");

// Buttons
const addRecipeButton = document.querySelector(".add-recipe-button");
const loadingButton = document.querySelector(".loading-button");

// Errors
const titleError = document.querySelector(".errors.title");
const ingredientsError = document.querySelector(".errors.ingredients");
const timeError = document.querySelector(".errors.time");
const procedureError = document.querySelector(".errors.procedure");
const urlError = document.querySelector(".errors.url");
const allErrors = document.querySelectorAll(".errors");

// Add ingredients to the array and List Container.
adder.addEventListener("click", (e) => {
  e.preventDefault();
  const item = document.querySelector("#ingredients");

  // Check if item has value.
  if (item.value.length > 0) {
    newSet.add(item.value);
    ingredients = [...newSet];

    // Adding item to listContainer.
    listContainer.innerHTML += `<li class="list">${item.value}</li>`;
    item.value = "";
  }

  // Remove duplicate li tags.
  const list = [...document.querySelectorAll(".list")];
  const uniqueValues = new Set(list.map((val) => val.textContent));
  list.forEach((item) => {
    if (uniqueValues.has(item.textContent)) {
      uniqueValues.delete(item.textContent);
    } else {
      item.remove();
    }
  });
});

// Remove ingredient on click from HTML & array.
listContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("list")) {
    const itemIndex = ingredients.indexOf(e.target.textContent);
    ingredients.splice(itemIndex, 1);
    e.target.remove();
  }
});

// Create Recipe Form
recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Show loading button.
  loadingButton.classList.remove("hidden");
  addRecipeButton.classList.add("hidden");

  // Reset errors on submit.
  titleError.textContent = "";
  ingredientsError.textContent = "";
  timeError.textContent = "";
  procedureError.textContent = "";
  urlError.textContent = "";

  const title = recipeForm.title.value;
  const time = recipeForm.time.value;
  const procedure = recipeForm.procedure.value;
  const url = recipeForm.url.value;
  const name = recipeForm.name.value;

  try {
    const endpoint = "/create";
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ title, ingredients, time, procedure, url, name }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    // Assign error text content if available.
    if (data.errors) {
      titleError.textContent = data.errors.title;
      ingredientsError.textContent = data.errors.ingredients;
      timeError.textContent = data.errors.time;
      procedureError.textContent = data.errors.procedure;
      urlError.textContent = data.errors.url;
    }

    // Apply class of error style if error has length.
    allErrors.forEach((err) => {
      if (err.textContent.length > 0) {
        err.classList.add("error-style");
      } else {
        err.classList.remove("error-style");
      }
    });

    // Hide the loading button when data is received.
    if (data) {
      loadingButton.classList.add("hidden");
      addRecipeButton.classList.remove("hidden");
    }

    // Redirect to Recipes Page if returns user object.
    if (data.recipe) {
      window.location.href = "/recipes";
    }
  } catch (err) {
    console.log(err);
  }
});

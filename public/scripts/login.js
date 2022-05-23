// Form References
const recipeForm = document.querySelector("form");
const emailError = document.querySelector(".errors.email");
const passwordError = document.querySelector(".errors.password");
const allErrors = document.querySelectorAll(".errors");

// Login Form
recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset errors on submit.
  emailError.textContent = "";
  passwordError.textContent = "";

  const email = recipeForm.email.value;
  const password = recipeForm.password.value;

  try {
    const endpoint = "/login";
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    // Assign error text content if available.
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }

    // Apply class of error style if error has length.
    allErrors.forEach((err) => {
      if (err.textContent.length > 0) {
        err.classList.add("error-style");
      } else {
        err.classList.remove("error-style");
      }
    });

    // Redirect to Recipes Page if returns user object.
    if (data.user) {
      location.href = "/recipes";
    }
  } catch (err) {
    console.log(err);
  }
});

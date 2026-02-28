const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const formTitle = document.getElementById("formTitle");

function showSignup() {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  formTitle.textContent = "Sign Up";
}

function showLogin() {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  formTitle.textContent = "Login";
}

/* Demo submit handling */
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Login successful (demo)");
});

signupForm.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Signup successful (demo)");
});

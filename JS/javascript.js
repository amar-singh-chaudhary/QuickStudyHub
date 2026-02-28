function toggleMenu(e) {
    e.preventDefault();
    e.target.nextElementSibling.classList.toggle("show");
}








const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function toggleMenu() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}
/* side bar down/up arrow */


/* Close menu on ESC key */
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeMenu();
    }
});
/* DARK MODE TOGGLE */
function toggleDark() {
    document.body.classList.toggle("dark");

    const darkBtn = document.querySelector(".nav-icon[onclick='toggleDark()']");
    darkBtn.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
}


// ....search bar...

const navbar = document.getElementById("navbar");
const navSearch = document.getElementById("navSearch");

/* TOGGLE SEARCH */
function toggleSearch() {
    navbar.classList.toggle("search-active");

    if (navbar.classList.contains("search-active")) {
        navSearch.focus();
    } else {
        navSearch.value = "";
    }
}

/* CLOSE SEARCH ON OUTSIDE CLICK */
document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target)) {
        navbar.classList.remove("search-active");
        navSearch.value = "";
    }
});

/* SUBMIT SEARCH */
function submitSearch() {
    const query = navSearch.value.trim();
    if (query) {
        console.log("Search:", query);
        // redirect / filter MCQs later
    }
}

/* ENTER KEY SUBMIT */
navSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        submitSearch();
    }
});

/* ================= SUBMENU (UP / DOWN ARROW) ================= */
function toggleSubmenu(element) {
    const submenu = element.nextElementSibling;
    const arrow = element.querySelector(".arrow");

    if (!submenu) {
        console.error("Submenu not found");
        return;
    }

    if (submenu.style.display === "block") {
        submenu.style.display = "none";
        arrow.textContent = "▼";
    } else {
        submenu.style.display = "block";
        arrow.textContent = "▲";
    }
}

// loginForm
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

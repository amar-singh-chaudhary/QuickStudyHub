require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/mockTestDB")
.then(() => console.log("MongoDB Connected"));


// 🔐 Local Signup
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({ name, email, password: hashedPassword });
        res.json({ message: "Signup Successful" });
    } catch {
        res.status(400).json({ message: "User already exists" });
    }
});

// 🔐 Local Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    res.json({ message: "Login Successful" });
});


// 🌐 Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {

    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
        user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
        });
    }

    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login.html"
    }),
    (req, res) => {
        res.redirect("/"); // redirect after login
    }
);

app.listen(5000, () => console.log("Server running on port 5000"));

const passport = require("passport");
const database = require("../modules/database");
const bcrypt = require("bcrypt");
const emailService = require("../modules/email-service");
const router = require("express").Router();
const isAuthenticated = require("../utils/helper").isAuthenticated;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send(req.user);
});

router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !passport)
        return res
            .status(400)
            .json({ message: "Please provide all the details from the form" });
    if (!emailRegex.test(email))
        return res
            .status(400)
            .send({ message: "Please provide a valid email" });
    const hashPassword = bcrypt.hashSync(password, 10);
    const verification_token = bcrypt.hashSync(email, 10);
    const values = { name, email, password: hashPassword, verification_token };
    emailService.sendEmail({
        subject: "Email Verification",
        html: verification_token,
        to: email,
    });
    database.insertData({ source: "users", values }).then((value) => {
        res.status(201).send(value);
    });
});

router.get("/verify", (req, res) => {
    const token = req.query["token"];
    database
        .listData({
            source: "users",
            where: [
                { field: "verification_token", compare: "equal", value: token },
            ],
        })
        .then((value) => {
            if (value.rows.length === 0)
                res.status(401).send("Incorrect Token");
        });
});

router.get("/logout", isAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err); // Handle any errors during logout
            return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logout successful" }); // Indicate success
    });
});

module.exports = router;

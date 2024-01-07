const express = require("express");
const database = require("./modules/database");
const router = require("./modules/routes");
const session = require("express-session");
const passport = require("passport");
const MySQLStore = require("express-mysql-session")(session);
const authRoute = require("./routes/auth");
const app = express();
require("./utils/localStrategy");

/* This code is creating an object called `sqlCredentials` that contains the database connection
details. The values for `host`, `user`, `database`, and `password` are being retrieved from
environment variables using `process.env`. */
const sqlCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
};
database.connect(sqlCredentials);

app.use(express.json());

/* This code is configuring and using the Express middleware for session management and authentication. */
app.use(
    session({
        secret: process.env.SECRET,
        cookie: {
            maxAge: 60000 * 60 * 24,
            signed: true,
        },
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore(sqlCredentials),
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/", router);

app.listen(4005, console.log("Started on Port 4005"));

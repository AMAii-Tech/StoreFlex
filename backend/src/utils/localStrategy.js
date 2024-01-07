const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const database = require("../modules/database");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    const whereObj = [{ field: "email", compare: "equal", value: email }];
    database.listData({ source: "users", where: whereObj }).then((value) => {
        if (!value) {
            return done(null, null);
        }
        return done(null, value.rows[0]);
    });
});

passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        function (email, password, done) {
            const whereObj = [
                { field: "email", compare: "equal", value: email },
            ];
            database
                .listData({ source: "users", where: whereObj })
                .then((value) => {
                    if (!value) {
                        return done(null, false);
                    }
                    if (bcrypt.compareSync(password, value.rows[0].password))
                        return done(null, value.rows[0]);
                    return done(null, false);
                });
        }
    )
);

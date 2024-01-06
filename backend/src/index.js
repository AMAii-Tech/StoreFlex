const express = require("express");
const database = require("./modules/database");
const app = express();
const sqlCredentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
};

database.connect(sqlCredentials);

app.use(express.json());

app.get("/", async (req, res) => {
    const data = await database.listData({ source: "users" });
    res.send(data);
});

app.listen(4005, console.log("Started on Port 4005"));

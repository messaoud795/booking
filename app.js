const express = require("express");
const bodyparser = require("body-parser");
const bookingsRouter = require("./routes/bookingsRouter");

const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Routes
app.use("/api", bookingsRouter);

module.exports = { app };

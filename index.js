const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

//error middleware
const { error } = require("./middleware/error");

//dotenv file
require("dotenv").config({ path: "./config/keys.env" });
//DB
const { connectionDB } = require("./db/connection");

//env config;
//connection db
connectionDB();

//routes;
const notesRoute = require("./routes/notesRoute");
const usersRoute = require("./routes/usersRoute");
const indexRoute = require("./routes");

//middleware;
app.use(express.json());
app.use(cookieParser(process.env.COOKIES_SECRET));
//azizul is a secret key for cookie parsers;

//port
const port = process.env.PORT || 2020;

//notesRoute
app.use("/notes", notesRoute);
app.use("/users", usersRoute);
app.use("/", indexRoute);
app.use(error);

app.listen(port, () => {
  console.log(`Server in created and listening on port ${port}`);
});

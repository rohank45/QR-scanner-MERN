require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const databse = require("./config/database");
databse.call();

const register = require("./routers/register");
app.use("/", register);

const login = require("./routers/login");
app.use("/", login);

const logout = require("./routers/logout");
app.use("/", logout);

const profile = require("./routers/profile");
app.use("/", profile);

const twilioSetup = require("./routers/twilioSetup");
app.use("/", twilioSetup);

const entry = require("./routers/entryRoute/entry");
app.use("/", entry);

const exit = require("./routers/entryRoute/exit");
app.use("/", exit);

// ----------------- production --------------------------
const path = require("path");

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/qrtask/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "qrtask", "build", "index.html"));
  });
}
// ----------------- production --------------------------

app.listen(process.env.PORT, () => {
  console.log("server started...");
});

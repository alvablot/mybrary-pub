if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

const log = require("./middlewares/log");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/author");
const itemRouter = require("./routes/item");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");
const categoryRouter = require("./routes/category");
const subRouter = require("./routes/subs");

app.use(cors());

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/items", itemRouter);
app.use("/users", userRouter);
app.use("/users/password", userRouter);
app.use("/images", imageRouter);
app.use("/categories", categoryRouter);
app.use("/subs", subRouter);

app.use((err, req, res, next) => {
  console.log("Bad request");
  res.status(404).send({ error: err.message });
});

// app.use(log);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

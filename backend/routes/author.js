const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const author = await Author.find({ _id: id });
    res.json(author);

    console.log("GET/author");
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const authors = await Author.find({});
    res.json(authors);
    console.log("GET/all authors");
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/new", express.json(), async (req, res, next) => {
  try {
    const { name, rating, categories } = req.body;
    const newAuthor = await Author.create({
      name: name,
      rating: rating,
      categories: categories,
    });

    const authors = await Author.find({});
    res.json(authors);

    console.log("POST/new author");
    next();
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, rating, categories } = req.body;

    const existingAuthor = await Author.findOne({ _id: id });
    if (existingAuthor === null) return res.status(401).json({ Message: "Author not found" });

    const freshAuthor = await Author.findByIdAndUpdate(id, {
      name: name,
      rating: rating,
      categories: categories,
    });

    const author = await Author.find({});
    res.json(author);

    console.log("PUT/update author");
    next();
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Author.deleteOne({ _id: id });

    const authors = await Author.find({});
    res.json(authors);
    console.log(`DELETE/author ${id}`);
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.find({ _id: id });
    res.json(category);

    console.log("GET/Category");
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ category: 'asc', test: -1 });;
    res.json(categories);
    console.log("GET/all authors");
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/new", express.json(), async (req, res, next) => {
  try {
    const { category, name,  index } = req.body;
    const newCategory = await Category.create({
      category: category,
      name: name,
      index: index,
    });

    const categories = await Category.find({});
    res.json(categories);

    console.log("POST/new category");
    next();
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { category, name,  index  } = req.body;
    const freshCategory = await Category.findByIdAndUpdate(id, {
      category: category,
      name: name,
      index: index,
    });
    const categories = await Category.find({});
    res.json(categories);

    console.log("PUT/update category");
    next();
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Category.deleteOne({ _id: id });

    const categories = await Category.find({});
    res.json(categories);
    console.log(`DELETE/Category ${id}`);
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

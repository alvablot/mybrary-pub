const express = require("express");
const router = express.Router();

const Item = require("../models/item");

router.post("/:id", express.json(), async (req, res, next) => {
  let item;
  try {
    const sort = req.body;

    const id = req.params.id;
    if (id.length > 23) {
      item = await Item.findById(id).sort(sort);
      res.json(item);
    } else {
      if (id === "All" || !id) {
        item = await Item.find({}).sort(sort);
        res.json(item);
        console.log("Get all");
      } else if (id === "new") {
        const {
          title,
          subtitle,
          author,
          number,
          image,
          description,
          category,
          sub,
          rating,
          home,
          lender,
          dateCreated,
          website,
        } = req.body;

        const newItem = await Item.create({
          title: title,
          subtitle: subtitle,
          author: author,
          number: number,
          image: image,
          description: description,
          category: category,
          sub: sub,
          rating: rating,
          home: home,
          lender: lender,
          website: website,
          dateCreated: new Date(),
        });

        // const items = await Item.find({});
        item = await Item.findOne({ title: title });
        res.json(item);
      } else {
        item = await Item.find({ category: id }).sort(sort).exec();

        if (item.length > 1) {
          console.log(id);
          return res.json(item);
        } else {
          console.log(404);
          return res.status(404).json({ Message: "Not found" });
        }
      }
    }

    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/search/:query", async (req, res, next) => {
  try {
    const query = req.params.query;
    const items = await Item.find({ title: query }).sort({
      title: "asc",
    });
    if (items.length < 1) return res.status(401).json({ Message: "Item not found" });

    res.json({ items });
    console.log(items);
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const sort = req.body;
    console.log(sort);
    const items = await Item.find({}).sort(sort);
    res.json(items);
    //console.log("GET/all items");
    next();
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      title,
      subtitle,
      author,
      number,
      image,
      description,
      categories,
      category,
      sub,
      rating,
      home,
      lender,
      notes,
      publisher,
      website,
    } = req.body;
    const freshItem = await Item.findByIdAndUpdate(id, {
      title: title,
      subtitle: subtitle,
      author: author,
      number: number,
      image: image,
      description: description,
      category: category,
      sub: sub,
      rating: rating,
      home: home,
      lender: lender,
      lastModified: new Date(),
      notes: notes,
      publisher: publisher,
      website: website,
    });

    const items = await Item.find({});
    res.json(items);

    console.log("PUT/update item");
    next();
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { home, lender } = req.body;
    const freshItem = await Item.findByIdAndUpdate(id, {
      home: home,
      lender: lender,
    });

    const item = await Item.find({});
    res.json(item);

    console.log("PATCH/update item");
    next();
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const item = await Item.findById(id);
    await Item.findByIdAndRemove(id);
    const items = await Item.find({});
    res.json(item);
    console.log(`DELETE/item ${id}`);

    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

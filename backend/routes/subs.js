const express = require("express");
const router = express.Router();

const Subs = require("../models/subs");

// router.get("/:id", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     if (id.length > 23) {
//       const item = await Item.findById(id);
//       console.log(id);
//       res.json(item);
//     } else {
//       if (id === "All") {
//         const item = await Item.find({}).sort({ title: "asc" });
//         res.json(item);
//         console.log("Get all");
//       } else {
//         const item = await Item.find({ category: id }).sort({ title: "asc" }).exec();
//         console.log(id);
//         res.json(item);
//       }
//     }

//     console.log(`GET/item ${id}`);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// router.get("/search/:query", async (req, res, next) => {
//   try {
//     const query = req.params.query;
//     const items = await Item.find({ title: query }).sort({
//       title: "asc",
//     });
//     if (items.length < 1) return res.status(401).json({ Message: "Item not found" });

//     res.json({ items });
//     console.log(items);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

router.get("/", async (req, res, next) => {
  try {
    const responseSubs = await Subs.find({}).sort({ title: "asc" });
    res.json(responseSubs);
    console.log("GET/all items");
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/new", express.json(), async (req, res, next) => {
  try {
    const { category, subs, index } = req.body;

    const newSub = await Subs.create({
      category: category,
      subs: subs,
      index: index,
    });

    const responseSubs = await Subs.find({});
    //const Sub = await Subs.findOne({ mediaType: mediaType });
    res.json(responseSubs);

    console.log("POST/new subs");
    next();
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", express.json(), async (req, res, next) => {
  const id = req.params.id;
  const { category, subs, index } = req.body;
  try {
    const newSub = await Subs.findByIdAndUpdate(id, {
      category: category,
      subs: subs,
      index: index,
    });

    const responseSubs = await Subs.find({});
    //const Sub = await Subs.findOne({ mediaType: mediaType });
    res.json(responseSubs);

    console.log("UPDATE/ subs");
    next();
  } catch (error) {
    return next(error);
  }
});

// router.patch("/:id", express.json(), async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const { home, lender } = req.body;
//     const freshItem = await Item.findByIdAndUpdate(id, {
//       home: home,
//       lender: lender,
//     });

//     const item = await Item.find({});
//     res.json(item);

//     console.log("PATCH/update item");
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const item = await Item.findById(id);
//     await Item.findByIdAndRemove(id);
//     const items = await Item.find({});
//     res.json(item);
//     console.log(`DELETE/item ${id}`);

//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;

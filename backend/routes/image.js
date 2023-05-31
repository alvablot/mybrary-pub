const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;
// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});
// Log the configuration
// console.log(cloudinary.config());

router.get("/", async (req, res, next) => {
  cloudinary.search
    .expression("resource_type:image AND folder=img")
    .sort_by("public_id", "desc") //.max_results(5)
    .execute()
    .then((result) => res.json(result));
  //next();
  // try {
  //   Image.find({}, (err, items) => {
  //     res.json({ images: items });
  //   });
  //   console.log("Get images");
  // } catch (error) {
  //   return next(error);
  // }
});

module.exports = router;

const express = require("express");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
let token = false;
let activeUser = {};

const router = express.Router();
const User = require("../models/user");

router.get("/me", auth, (req, res, next) => {
  try {
    res.json({ loggedInUser: req.user });
    console.log("GET/me");
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
    console.log("GET/me");
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
    console.log("GET/all users");
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/new", express.json(), async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, notes } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({ Message: "User already exists" });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      password: md5(password),
      email: email,
      notes: notes,
      dateCreated: new Date(),
    });

    const users = await User.find({});
    res.json(users);

    console.log("POST/new user");
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/login", express.json(), async (req, res, next) => {
  try {
    const { email, password, lastLoigin } = req.body;
    if (!email || !password)
      return res.status(400).json({ Message: "Password or email missing" });
    const existingUser = await User.findOne({ email: email });
    if (existingUser === null) return res.status(401).json({ Message: "User not found" });

    const hashedPassword = md5(password);
    const checkPassword = hashedPassword === existingUser.password;
    if (!checkPassword) return res.status(403).json({ Message: "Wrong password" });

    //////// INLOGGAD
    console.log("Right password");
    token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.SECRET_KEY
    );
    activeUser = {
      id: existingUser._id,
      password: hashedPassword,
    };
    const updateUser = await User.findByIdAndUpdate(existingUser._id, {
      lastLogIn: new Date(),
    });
    console.log(updateUser);
    res.json({ token: token });
    next();
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, notes } = req.body;

    const freshUser = await User.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      notes: notes,
      lastModified: new Date(),
    });

    const user = await User.findById(id);
    res.json(user);

    console.log("PUT/update User");
    next();
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { likes, newPassword, oldPassword } = req.body;
    const user = await User.findById(id);
    if (newPassword && oldPassword) {
      const harshedOldPassword = md5(oldPassword);

      const existingPassword = user.password;

      const rightPassword = harshedOldPassword === existingPassword;
      if (!rightPassword) return res.status(403).json({ Message: "Wrong old password" });
      if (newPassword) {
        const freshUser = await User.findByIdAndUpdate(id, {
          password: md5(newPassword),
        });
        res.json({ Message: "Password updated" });
        console.log("PATCH/update password");
        next();
      }
    } else if (likes) {
      const likesArray = user.likes;
      const likeExist = likesArray.indexOf(likes);
      if (likeExist > -1) {
        likesArray.splice(likeExist, 1);
      } else {
        likesArray.push(likes);
      }
      const freshUser = await User.findByIdAndUpdate(id, {
        likes: likesArray,
      });
      res.json(user);
      console.log("PATCH/update LIKES");
      next();
    } else {
      res.status(500).json({ Mesage: "Sorry, something went wrong" });
    }
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user === null) return res.status(401).json({ Message: "User doesn't exist" });

    await User.findByIdAndRemove(id);
    const users = await User.find({});
    res.json(users);
    console.log(`DELETE/User ${id}`);
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

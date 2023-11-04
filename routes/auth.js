const router = require("express").Router();
const User = require("../models/user");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: Crypto.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SACRED
    ).toString(),
    isAdmin: req.body.isAdmin,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // Check if the user is not authenticated

    // User not found, send a 401 Unauthorized response
    !user && res.status(401).json("Wrong Credentials");

    const hashedPassword = Crypto.AES.decrypt(
      user.password,
      process.env.PASSWORD_SACRED
    );

    const originalPW = hashedPassword.toString(Crypto.enc.Utf8);
    const inputPW = req.body.password;

    originalPW !== inputPW && res.status(401).json("Wrong Password");
    // Incorrect password, send a 401 Unauthorized response

    // Password is correct, generate an access token and send a 200 OK response
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

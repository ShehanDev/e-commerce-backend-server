const router = require("express").Router();
const Crypto = require("crypto-js");
const User = require("../models/user");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//get user
router.get("/userTest", (req, res) => {
  res.send("user test is successful");
});

//create user
router.post("/userCreate", (req, res) => {
  const userName = req.body().userName;
  res.send("user name is :" + userName);
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = Crypto.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

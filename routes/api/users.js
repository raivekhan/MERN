const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route POST /users
// @desc Register router
// @access public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Enter a password with minimum 5 length").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { name, email, password } = req.body;
    console.log(email);
    try {
      let user = await User.findOne({ email });
      // console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({ name, email, password, avatar });

      // console.log('before encrypt', user);
      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // console.log('after encrypt', user);
      // save to db
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecretKey"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ msg: "user registered successfully", token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("server error");
    }
  }
);

module.exports = router;

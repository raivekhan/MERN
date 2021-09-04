const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const User = require("../../models/User");

// @route GET /auth
// @desc test route
// @access public
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("msg: Server error");
  }
});

module.exports = router;

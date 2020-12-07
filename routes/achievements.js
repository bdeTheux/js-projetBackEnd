let express = require("express");
let router = express.Router();
let Achievement = require("../model/Achievement.js");
let { authorize } = require("../utils/auth");

const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const jwtSecret = "jkjJ1235Ohno!";


router.get("/", authorize, function (req, res, next) {
    return res.json(Achievement.achievements);
});

module.exports = router;


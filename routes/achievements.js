let express = require("express");
let router = express.Router();
let Achievement = require("../model/Achievement.js");
let { authorize } = require("../utils/auth");

const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const jwtSecret = "jkjJ1235Ohno!";


router.get("/victory", function (req, res, next) {
    return res.json(Achievement.achievementsVictory);
});

router.get("/defeat", function (req, res, next) {
    return res.json(Achievement.achievementsDefeat);
});

router.get("/game", function (req, res, next) {
    return res.json(Achievement.achievementsGame);
});

router.get("/time", function (req, res, next) {
    return res.json(Achievement.achievementsTime);
});

module.exports = router;


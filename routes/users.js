var express = require("express");
var router = express.Router();
var User = require("../model/User.js");
let { authorize, signAsynchronous } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const jwtSecret = "jkjJ1235Ohno!";
const LIFETIME_JWT = 24 * 60 * 60 * 1000 ; // 10;// in seconds // 24 * 60 * 60 * 1000 = 24h 

/* GET user list : secure the route with JWT authorization */
router.get("/", authorize, function (req, res, next) {
    return res.json(User.list);
});

/* POST user data for authentication */
router.post("/login", function (req, res, next) {
  let user = new User(req.body.username, req.body.email, req.body.password);
  console.log("POST users/login:", User.list);
  user.checkCredentials(req.body.email, req.body.password).then((match) => {
    if (match) {
      jwt.sign({ username: user.username, email: user.email }, jwtSecret,{ expiresIn: LIFETIME_JWT }, (err, token) => {
        if (err) {
          console.error("POST users/ :", err);
          return res.status(500).send(err.message);
        }
        console.log("POST users/ token:", token);
        //on recupère le username pour pouvoir l'afficher dans le profile
        return res.json({ username: user.username, token });
      });
    } else {
      console.log("POST users/loginRegister Error:", "Unauthentified");
      return res.status(401).send("bad email/password");
    }
  })  
});

/* POST a new user */
router.post("/", function (req, res, next) {
  console.log("POST users/", User.list);
  console.log("email:", req.body.email);
  if (User.isUser(req.body.email))
    return res.status(409).end();
    // Ici on va géré l'utilisateur qui va être add
  let newUser = new User(req.body.username, req.body.email, req.body.password);
  newUser.save().then(() => {
    console.log("afterRegisterOp:", User.list);
    //on garde le username et l'email quand l'utilisateur se connecte
    jwt.sign({ username: newUser.username, email:newUser.email}, jwtSecret,{ expiresIn: LIFETIME_JWT }, (err, token) => {
      if (err) {
        console.error("POST users/ :", err);
        return res.status(500).send(err.message);
      }
      console.log("POST users/ token:", token);
      return res.json({ username: newUser.username, token });
    });
  });
});

//création des routes utilisé dans gameScene
//appelle la méthode qui va chercher le nombre de victoires
router.get("/getVictories", authorize, function (req, res, next) {
  res.json({
    score : User.getVictories(req.user.username)});
});

//appelle la méthode qui incrémente le nombre de victoires
router.get("/setVictories", authorize, function (req, res, next) {
  res.json({
    score : User.setVictories(req.user.username)});
});

//appelle la méthode qui incrémente le nombre de défaites
router.get("/setDefeats", authorize, function (req, res, next) {
  res.json({
    score : User.setDefeats(req.user.username)});});

//appelle la méthode qui va chercher le nombre de victoires
router.get("/getDefeats", authorize, function (req, res, next) {
  console.log(req.user.username);
  res.json({
    score : User.getDefeats(req.user.username)});
});

/*router.get("/getGameScore", authorize, function (req, res, next) {
  console.log(req.user.username);
  res.json({
    score : User.getGameScore(req.user.username)});
});*/

//va chercher le username de l'utilisateur connecté
router.get("/:username", function (req, res, next) {
  const userFound = User.getUserFromList(req.params.username);
  if (userFound) {
    return res.json(userFound);
  } else {
    return res.status(404).send("ressource not found");
  }
});

module.exports = router;

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
      jwt.sign({ username: user.username }, jwtSecret,{ expiresIn: LIFETIME_JWT }, (err, token) => {
        if (err) {
          console.error("POST users/ :", err);
          return res.status(500).send(err.message);
        }
        console.log("POST users/ token:", token);
        console.error("noooooon")
        console.log(user)
        console.log({ username: user.username, token })
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
    jwt.sign({ username: newUser.username}, jwtSecret,{ expiresIn: LIFETIME_JWT }, (err, token) => {
      if (err) {
        console.error("POST users/ :", err);
        return res.status(500).send(err.message);
      }
      console.log("POST users/ token:", token);
      return res.json({ username: newUser.username, token });
    });
  });
});

/* GET user object from username */
router.get("/:username", function (req, res, next) {
  console.log("GET users/:username", req.params.username);
  const userFound = User.getUserFromList(req.params.username);
  if (userFound) {
    return res.json(userFound);
  } else {
    return res.status(404).send("ressource not found");
  }
});

router.post("/setVictories", function (req, res, next) {
  return res.json(User.incrementVictories);
});
router.get("/getVictories", function (req, res, next) {
  return res.json(User.victories);
});


/*
router.post("/", authorize, function (req, res, next) {
  //Vérifier qu'il y a un score et une difficulté dans le body
  if(req.body.score < 0){
      throw "Erreur lors de la sauvegarde du score."
  }
  let user;
  let token = req.get("authorization");
  jwt.verify(token, jwtSecret, (err, token) => {
      if(err){
          console.log(err);
      }
      user = User.getUserFromListByUsername(token.username);
  });
  console.log(user);
  //Vérifier si il y a déjà un score pour cette difficulté dans leaderboard.json
  let leaderboard = Leaderboard.getLeaderboardByUsername(user.username);
  console.log('leaderboard :: ', leaderboard);
  if(leaderboard){
      let temp = new Leaderboard(leaderboard.username);
      temp.setEasy(leaderboard.easy);
      temp.setMedium(leaderboard.medium);
      temp.setHard(leaderboard.hard);
      leaderboard = temp;
      console.log('leaderboard :: ', leaderboard);
      //Si oui, vérifier si le nouveau est meilleur
      switch (req.body.difficulty){
          case TypeGameEnum.EASY:
              if(leaderboard.getEasy() === null){
                  leaderboard.setEasy(req.body.score);
              }else if(leaderboard.getEasy() > req.body.score){
                  leaderboard.setEasy(req.body.score);
              }
              break;
          case TypeGameEnum.MEDIUM:
              if(leaderboard.getMedium() === null){
                  leaderboard.setMedium(req.body.score);
              }else if(leaderboard.getMedium() > req.body.score){
                  leaderboard.setMedium(req.body.score);
              }
              break;
          case TypeGameEnum.HARD:
              if(leaderboard.getHard() === null){
                  leaderboard.setHard(req.body.score);
              }else if(leaderboard.getHard() > req.body.score){
                  leaderboard.setHard(req.body.score);
              }
              break;
      }
      leaderboard.update();
  }else {
      switch (req.body.difficulty){
          case TypeGameEnum.EASY:
              leaderboard = new Leaderboard(user.username);
              leaderboard.setEasy(req.body.score);
              break;
          case TypeGameEnum.MEDIUM:
              leaderboard = new Leaderboard(user.username);
              leaderboard.setMedium(req.body.score);
              break;
          case TypeGameEnum.HARD:
              leaderboard = new Leaderboard(user.username);
              leaderboard.setHard(req.body.score);
              break;
      }
      leaderboard.save();
  }
});
*/



module.exports = router;

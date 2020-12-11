"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "145OkyayNo668Pass";
const FILE_PATH = __dirname + "/users.json";
const fs = require("fs-extra");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.victories = 0;
    this.defeats = 0;
  }

  //sauve l'utilisateur dans la liste des utilisateurs
  async save() {
    let userList = getUserListFromFile(FILE_PATH);
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    console.log("save:", this.email);
    userList.push({
      username: this.username,
      email: this.email,
      password: hashedPassword,
      victories: this.victories, 
      defeats : this.defeats
    });
    saveUserListToFile(FILE_PATH, userList);
    return true;
  }

  // retourne une promesse avec une syntaxe de promesse classique
  checkCredentials(email, password) {
    if (!email || !password) return false;
    let userFound = User.getUserFromList(email);
    if (!userFound) return Promise.resolve(false);
    //si il y a un match je renvoie l'utilisateur qui a été trouvé
    this.username = userFound.username;
    // retourne la promesse
    return bcrypt
      .compare(password, userFound.password)
      .then((match) => match)
      .catch((err) => err);
  }

  //incrémente le nombre de victoires du joueur connecté 
  static setVictories(username){
    // charger la liste d'utilisateurs
    let userList = getUserListFromFile(FILE_PATH);
    // trouver user associé à username et charger le user
    let userFound;
    for (let index = 0; index < userList.length; index++) {
      if (userList[index].username === username) {
        userFound = userList[index];
        break;
      }
    }
    // changer une props de user (chargé)
    userFound.victories += 1;
    // sauver tous les users à nouveau dans users.json
    let data = JSON.stringify(userList); 
    fs.writeFileSync(FILE_PATH,data);
  }

   //incrémente le nombre de défaites du joueur connecté 
  static setDefeats(username){
    // charger la liste d'utilisateurs
    let userList = getUserListFromFile(FILE_PATH);
    // trouver user associé à username et charger le user
    let userFound;
    for (let index = 0; index < userList.length; index++) {
      if (userList[index].username === username) {
        userFound = userList[index];
        console.log(userFound);
        break;
      }
    }
    // changer une props de user (chargé)
    userFound.defeats += 1;
    // sauver tous les users à nouveau dans users.json
    let data = JSON.stringify(userList); //listisanarrayofobjects
    fs.writeFileSync(FILE_PATH,data);
  }

  //va chercher le nombre de victoires du joueur connecté
  static getVictories(username){
    // charger la liste d'utilisateurs
    let userList = getUserListFromFile(FILE_PATH);
    // trouver user associé à username et charger le user
    let userFound;
    for (let index = 0; index < userList.length; index++) {
      if (userList[index].username === username) {
        userFound = userList[index];
        break;
      }
    }
    return userFound.victories;
  }

  //va chercher le nombre de défaites du joueur connecté
  static getDefeats(username){
    // charger la liste d'utilisateurs
    let userList = getUserListFromFile(FILE_PATH);
    // trouver user associé à username et charger le user
    let userFound;
    for (let index = 0; index < userList.length; index++) {
      if (userList[index].username === username) {
        userFound = userList[index];
        break;
      }
    }
    return userFound.defeats;
  }
  
  /*static getGameScore(username){
    // charger la liste d'utilisateurs
    let userList = getUserListFromFile(FILE_PATH);
    // trouver user associé à username et charger le user
    let userFound;
    for (let index = 0; index < userList.length; index++) {
      if (userList[index].username === username) {
        userFound = userList[index];
        break;
      }
    }
    return userFound.defeats + userFound.victories;
  }*/

  /*static get list() {
    let userList = getUserListFromFile(FILE_PATH);
    return userList;
  }*/

  //informe si l'user est présent dans la liste des utilisateurs
  static isUser(email) {
    const userFound = User.getUserFromList(email);
    console.log("User::isUser:", userFound);
    return userFound !== undefined;
  }

  //renvoie l'utilisateur connecté contenu dans la liste en fonction de son email
  static getUserFromList(email) {
    const userList = getUserListFromFile(FILE_PATH);
    for (let index = 0; index < userList.length; index++) {
      if (userList[index].email === email) return userList[index];
    }
    return;
  }
}

function getUserListFromFile(filePath) {
  const fs = require("fs");
  if (!fs.existsSync(filePath)) return [];
  let userListRawData = fs.readFileSync(filePath);
  let userList;
  if (userListRawData) userList = JSON.parse(userListRawData);
  else userList = [];
  return userList;
}

//sauve l'user dans la liste des utilisateurs
function saveUserListToFile(filePath, userList) {
  const fs = require("fs");
  let data = JSON.stringify(userList);
  fs.writeFileSync(filePath, data);
}

module.exports = User;

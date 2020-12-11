"use strict";
let achievementList = [];
const FILE_PATH = __dirname + "/achievements.json";

class Achievement {
    //condition represente le nombre de victoire/defaite/parties à atteindre avant de gagner l'achievement
    constructor(title, description, condition, type, state){
        this.title = title;
        this.description = description;
        this.condition = condition;
        this.type = type;
        this.state = state;
    }

    setAchievementState(state) {
        this.state = state;
    }
    static get achievements() {
        console.log('Get the achievements');
        return getAchievementListFromFile(FILE_PATH);
    }

    static get achievementsVictory() {
        console.log('Get the victory achievements items');
        const achievementsFull = getAchievementListFromFile(FILE_PATH);
        let achievements = [];
        for (let index = 0; index < achievementsFull.length; index++) {
            if(achievementsFull[index].type === 1){
                achievements.push({
                    title: achievementsFull[index].title,
                    description: achievementsFull[index].description,
                    condition: achievementsFull[index].condition,
                    type: achievementsFull[index].type,
                    state: achievementsFull[index].state,
                });
            }
            
        }
        console.log('Returned the victory achievements');
        return achievements;
    }

    static get achievementsDefeat() {
        console.log('Get the defeats achievements items');
        const achievementsFull = getAchievementListFromFile(FILE_PATH);
        let achievements = [];
        for (let index = 0; index < achievementsFull.length; index++) {
            if(achievementsFull[index].type === 2){
                achievements.push({
                    title: achievementsFull[index].title,
                    description: achievementsFull[index].description,
                    condition: achievementsFull[index].condition,
                    type: achievementsFull[index].type,
                    state: achievementsFull[index].state,
                });
            }
            
        }
        console.log('Returned the defeats achievements');
        return achievements;
    }

    static get achievementsGame() {
        console.log('Get the games achievements items');
        const achievementsFull = getAchievementListFromFile(FILE_PATH);
        let achievements = [];
        for (let index = 0; index < achievementsFull.length; index++) {
            if(achievementsFull[index].type === 3){
                achievements.push({
                    title: achievementsFull[index].title,
                    description: achievementsFull[index].description,
                    condition: achievementsFull[index].condition,
                    type: achievementsFull[index].type,
                    state: achievementsFull[index].state,
                });
            }
            
        }
        console.log('Returned the games achievements');
        return achievements;
    }
}

//Instanciation de tous les achievements
//pour les types: 1 = victory, 2 = defeat, 3= Amount of games played, 4 = Amount of hours played
function achievementsInstantiation(list) {
    
//                                 TITLE            DESCRIPTION                                          CONDITION      TYPE       STATE

    const vic1 = new Achievement("OMELETTE",        "Kill your opponent for the first time",             1,             1,         false);
    const vic2 = new Achievement("SIR CHICKY",      "Kill your opponent 10 times",                       10,            1,         false);
    const vic3 = new Achievement("PRO EGGBREAKER",  "Kill your opponent 20 times",                       20,            1,         false);
    const vic4 = new Achievement("JACK THE MEOWER", "Kill your opponent 30 times",                       30,            1,         false);
    const vic5 = new Achievement("SIR ROOSTER",     "Kill your opponent 40 times",                       40,            1,         false);
    const vic6 = new Achievement("TERMINACAT",      "Kill your opponent 50 times",                       50,            1,         false);

    const def1 = new Achievement("LITTLE RUNNER",   "Get killed by your opponent 10 times",              10,            2,         false);
    const def2 = new Achievement("NOT BAD, JK",     "Get killed by your opponent 25 times",              25,            2,         false);
    const def3 = new Achievement("CAT ASTROPHIC",   "Get killed by your opponent 50 times",              50,            2,         false);

    const gam1 = new Achievement("CHICK",           "Finish your first game",                            1,             3,         false);
    const gam2 = new Achievement("DUCK",            "Finish 5 games",                                    5,             3,         false);
    const gam3 = new Achievement("GOOSE",           "Finish 10 games",                                   10,            3,         false);
    const gam4 = new Achievement("TURKEY",          "Finish 20 games",                                   20,            3,         false);
    const gam5 = new Achievement("PHEASANT",        "Finish 25 games",                                   25,            3,         false);
    const gam6 = new Achievement("SWAN",            "Finish 50 games",                                   50,            3,         false);

    /*
    const tim1 = new Achievement("noname",          "Play a total of 30min of game",                 4,         false);
    const tim2 = new Achievement("noname",          "Play a total of 1 hour of game",                4,         false);
    const tim3 = new Achievement("noname",          "Play a total of 2 hour of game",                4,         false);
    const tim4 = new Achievement("noname",          "Play a total of 3 hour of game",                4,         false);
    */

    list.push(vic1, vic2, vic3, vic4, vic5, vic6, def1, def2, def3, gam1, gam2, gam3, gam4, gam5, gam6); 
}


const fs = require("fs-extra");

function getAchievementListFromFile(filePath) {
    console.log('Get the achievement list from ' + filePath);
    
    if (!fs.existsSync(filePath)) return [];
    let achListRawData = fs.readFileSync(filePath);
    let achList;
    if (achListRawData) achList = JSON.parse(achListRawData);
    else achList = [];
    return achList;
}

function saveAchievementListToFile(filePath,achievementList) {
    console.log('Save the achievemnt list {' + achievementList + '} to ' + filePath)
    
    let data = JSON.stringify(achievementList); //listisanarrayofobjects
    fs.writeFileSync(filePath,data);
}

achievementsInstantiation(achievementList);
saveAchievementListToFile(FILE_PATH, achievementList);

module.exports = Achievement;
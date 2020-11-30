"use strict";
let achievementList = [];
const FILE_PATH = __dirname + "/achievements.json";

class Achievement {
    
    constructor(title, description, type, state){
        this.title = title;
        this.description = description;
        this.type = type;
        this.state = state;
    }

    setAchievementState(state) {
        this.state = state;
        if(this.state == true) {
            //change css selector to achieved
        }
        else{
            //change css selector to not achieved
        }
    }
}

//Instanciation de tous les achievements
//pour les types: 1 = victory, 2 = defeat, 3= Amount of games played, 4 = Amount of hours played
function achievementsInstantiation(list) {

    const vic1 = new Achievement("OMELETTE",        "Kill your opponent for the first time",         1,         false);
    const vic2 = new Achievement("SIR CHICKY",      "Kill your opponent 10 times",                   1,         false);
    const vic3 = new Achievement("PRO EGGBREAKER",  "Kill your opponent 20 times",                   1,         false);
    const vic4 = new Achievement("JACK THE MEOWER", "Kill your opponent 30 times",                   1,         false);
    const vic5 = new Achievement("SIR ROOSTER",     "Kill your opponent 40 times",                   1,         false);
    const vic6 = new Achievement("TERMINACAT",      "Kill your opponent 50 times",                   1,         false);

    const def1 = new Achievement("noname",          "Get killed by your opponent 10 times",          2,         false);
    const def2 = new Achievement("noname",          "Get killed by your opponent 25 times",          2,         false);
    const def3 = new Achievement("noname",          "Get killed by your opponent 50 times",          2,         false);

    const gam1 = new Achievement("NEWCOMER",        "Finish your first game",                        3,         false);
    const gam2 = new Achievement("noname",          "Finish 5 games",                                3,         false);
    const gam3 = new Achievement("noname",          "Finish 10 games",                               3,         false);
    const gam4 = new Achievement("noname",          "Finish 20 games",                               3,         false);
    const gam5 = new Achievement("noname",          "Finish 25 games",                               3,         false);
    const gam6 = new Achievement("noname",          "Finish 50 games",                               3,         false);

    const tim1 = new Achievement("noname",          "Play a total of 30min of game",                 4,         false);
    const tim2 = new Achievement("noname",          "Play a total of 1 hour of game",                4,         false);
    const tim3 = new Achievement("noname",          "Play a total of 2 hour of game",                4,         false);
    const tim4 = new Achievement("noname",          "Play a total of 3 hour of game",                4,         false);


    list.push(vic1, vic2, vic3, vic4, vic5, vic6, def1, def2, def3, gam1, gam2, gam3, gam4, gam5, gam6, tim1, tim2, tim3, tim4);
    
}

function saveAchievementListToFile(filePath,achievementList) {
    const fs = require("fs");
    let data = JSON.stringify(achievementList); //listisanarrayofobjects
    fs.writeFileSync(filePath,data);
}



achievementsInstantiation(achievementList);
saveAchievementListToFile(FILE_PATH, achievementList);
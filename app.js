//importing the express third-party-package from NPM
//express is a "server-side web frame-work" & it is used to
//make API-calls(Application Process Interface-[users/server ===> server])
let express = require("express");
let app = express();

module.exports = app;

let path = require("path");

// sqlite3 => is a tool is used to excute queries towards Database
//sqlite => SQLite package provides multiple methods to execute SQL queries on a database
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");

//here "__dirname" is gives the path of DATABASE(cricketTeam.db)
let dbpath = path.join(__dirname, "cricketTeam.db");

//intializing(getting accessing from database or getting database object to manupulate upon database)
//and starting the server-thats listen to port no:3000

let db = null;
let intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });

    app.listend(3000, () => {
      console.log("Server started at: https:localhost:3000");
    });
  } catch (e) {
    console.log(`Db Error: ${e.message}`);
    process.exit(1);
  }
};

//API-call [GET]

app.get("/players/", async (request, response) => {
  let getPlayersQuery = `
        SELECT 
        *
        FROM
        cricket_team
        ORDER BY 
        player_id;
    `;
  let playerArray = await db.all(getPlayersQuery);
  response.send(playerArray);
});

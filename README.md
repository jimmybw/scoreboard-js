scoreboard
=============

A node app for running a scoreboard. Provides an API to modify game state and serves up a scoreboard HTML page

##### Running the app #####

 1. Clone repo
 2. Run `npm install`
 3. Run `node server.js` (with optional `--auth-token` parameter - defaults to `'Basic scoreboard'`)
 4. navigate to `localhost:3000`

##### API #####

 - All endpoints return latest game state
 - Requests to /game endpoints require authorization header to be set (see "Running the app")

###### /game/ ######

RETURNS CURRENT GAME

e.g. `curl -H "Authorization: Basic scoreboard" -H "Content-Type: application/json" localhost:3000/game/`

###### /game/join ######

JOINS A PLAYER TO THE GAME
@string - name: the name of the player that joined
@string - team: the name of the team joined

e.g. `curl -H "Authorization: Basic scoreboard" -H "Content-Type: application/json" localhost:3000/game/join -d '{"name":"Chris", "team":"Mighty Ducks"}'`

###### /game/score ######

LOGS A SCORE TO THE GAME
@string - team: the name of the team that scored
@number - count: the number to score (accepts negative values)

e.g. `curl -H "Authorization: Basic scoreboard" -H "Content-Type: application/json" localhost:3000/game/score -d '{"team":"Mighty Ducks", "count": 1}'`

###### /game/reset ######

RESETS GAME

e.g. `curl -H "Authorization: Basic scoreboard" -H "Content-Type: application/json" localhost:3000/game/reset`

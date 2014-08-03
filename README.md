what-the-foos
=============

A node app for tracking foosball games and visualising the game state. Provides an API to modify game state.

##### Running the app #####

 1. Clone repo
 2. Run `npm install`
 3. Run `node server.js` (with optional `--auth-token` parameter - defaults to `'Basic thefooser'`)
 4. navigate to `localhost:3000`

##### API #####

 - All endpoints return latest game state
 - Requests to /game endpoints require authorization header to be set (see "Running the app")

###### /game/ ######

RETURNS CURRENT GAME

e.g. `curl -H "Authorization: Basic thefooser" -H "Content-Type: application/json" localhost:3000/game/`

###### /game/join ######

JOINS A PLAYER TO THE GAME
@string - name: the name of the player that joined
@string - team: the name of the team joined

e.g. `curl -H "Authorization: Basic thefooser" -H "Content-Type: application/json" localhost:3000/game/join -d '{"name":"Chris", "team":"Mighty Ducks"}'`

###### /game/goal ######

LOGS A GOAL TO THE GAME
@string - team: the name of the team that scored
@number - count: the number of goals scored (accepts negative values)

e.g. `curl -H "Authorization: Basic thefooser" -H "Content-Type: application/json" localhost:3000/game/goal -d '{"team":"Mighty Ducks", "count": 1}'`

###### /game/reset ######

RESETS GAME

e.g. `curl -H "Authorization: Basic thefooser" -H "Content-Type: application/json" localhost:3000/game/reset`

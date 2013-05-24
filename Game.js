var _ = require('underscore'),
    sqlite = require('sqlite3'),
    db = new sqlite.Database('foos-db'),
    shortId = require('shortid');

module.exports = function Game(){

    var WAITING_STATE = "WAITING",
        PROGRESS_STATE = "PLAYING",
        COMPLETE_STATE = "COMPLETE",
        DEFAULT_GAME_STATE = {
            players: {
                whiteFront: null,
                whiteBack: null,
                brownFront: null,
                brownBack: null
            },
            winner: null,
            score: {
                white: null,
                brown: null
            },
            date: new Date().toString(),
            state: WAITING_STATE
        },
        currentGame = DEFAULT_GAME_STATE;

    function getDefaultGameState(){
        return DEFAULT_GAME_STATE;
    }

    function changeGameState(state){
        var game = getGame();

        game.state = state;

        return game;
    }

    function getGame(){
        return currentGame;
    }

    function saveGame(){
        var game = getGame(),
            id = shortid.generate();
//["gameId", "date", "score", "whiteBack", "whiteFront", "brownBack", "brownFront", "winner", "playerCount"]

        db.exec(
            'INSERT INTO games VALUES ("'+ id +'", "'+ game.date +'", "'+ JSON.stringify(game.score) +'", "'+ game.players.whiteBack +'", "'+ game.players.whiteFront +'", "'+ game.players.brownBack +'", "'+ game.players.brownFront +'", "'+ game.winner +'", "4")',
            function(error, data){

            });
    }

    function canCreateNewGame(){
        return getState() === WAITING_STATE;
    }

    function getState(){
        return currentGame.state;
    }

    function goalScored(){
        var game = getGame();

        if(game.score.white !== 10 && game.score.brown !==10){
            return;
        }

        if(game.score.white === 10){
            game.winner = "white";
        }

        if(game.score.brown === 10){
            game.winner = "brown";
        }

        changeGameState(COMPLETE_STATE);
        saveGame();
    }

    function incrementGoal(options){
        var game = getGame();

        game.score[options.team]++;

        goalScored();

        return game;
    }

    function decrementGoal(options){
        var game = getGame();

        game.score[options.team]--;

        goalScored();

        return game;
    }

    function setPlayers(playerData){
        var game = getGame();

        if(getState() === PROGRESS_STATE){
            return;
        }

        game.players = _(playerData).defaults(game.players);

        return game;
    }

    return {
        getGame: getGame,
        getState: getState,
        incrementGoal: incrementGoal,
        decrementGoal: decrementGoal,
        setPlayers: setPlayers,
        canCreateNewGame: canCreateNewGame
    };
};
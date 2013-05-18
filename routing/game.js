'use strict';

var express= require('express'),
    Router = express.Router,
    Game = require('../js/game');

function returnGameState(res, game){
    res.send(game.getGameState());
}

module.exports = function(){
    var router = new Router();

    /*
        LOGS A GOAL TO THE GAME
        @string - team: the name of the team that scored
        @number - count: the number of goals scored
    */
    router.post('/goal', function(req, res){
        var goalData = req.body,
            game = Game.getGame();

        game.goal(goalData);

        returnGameState(res, game);
    });

    /*
        JOINS A PLAYER TO THE GAME
        @string - name: the name of the player that joined
        @string - team: the name of the team joined
    */
    router.post('/join', function(req, res){
        var playerData = req.body,
            game = Game.getGame();

        game.joinGame(playerData);

        returnGameState(res, game);
    });

    /*
        RESETS GAME
    */
    router.get('/reset', function(req, res){
        Game.resetGame();

        returnGameState(res, Game.getGame());
    });

    /*
        RETURNS CURRENT GAME
    */
    router.get('/', function(req, res){
        returnGameState(res, Game.getGame());
    });

    return router.middleware;
};


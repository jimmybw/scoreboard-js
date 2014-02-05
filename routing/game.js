'use strict';

var express= require('express'),
    Router = express.Router,
    Game = require('../js/game'),
    socketio = require('socket.io');

function returnGameStateAndBroadcastState(io, res, game){
    var gameState = game.getGameState();

    res.send(gameState);
    io.sockets.emit('update', gameState);
}

module.exports = function(socket){
    var router = new Router(),
        io = socket;

    /*
        LOGS A GOAL TO THE GAME
        @string - team: the name of the team that scored
        @number - count: the number of goals scored
    */
    router.post('/goal', function(req, res){
        var goalData = req.body,
            game = Game.getGame();

        game.goal(goalData);

        returnGameStateAndBroadcastState(io, res, game);
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

        returnGameStateAndBroadcastState(io, res, game);
    });

    /*
        RESETS GAME
    */
    router.get('/reset', function(req, res){
        Game.resetGame();

        returnGameStateAndBroadcastState(io, res, Game.getGame());
    });

    /*
        RETURNS CURRENT GAME
    */
    router.get('/', function(req, res){
        returnGameStateAndBroadcastState(io, res, Game.getGame());
    });

    return router.middleware;
};

